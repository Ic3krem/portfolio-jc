import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const landingPath = new URL('../Dotion.html', import.meta.url);
const workspacePath = new URL('../DotionWorkspace.html', import.meta.url);

const landing = await readFile(landingPath, 'utf8');
const workspace = await readFile(workspacePath, 'utf8').catch(() => '');

test('Dotion landing and workspace are separate documents', () => {
  assert.doesNotMatch(landing, /id="workspace-page"/);
  assert.match(workspace, /id="workspace-page"\s+class="page active"/);
  assert.doesNotMatch(workspace, /id="landing-page"/);
  assert.doesNotMatch(workspace, /id="templates-page"/);
});

test('only the three approved CTAs open the workspace', () => {
  const workspaceLinks = [
    ...landing.matchAll(
      /<a\b[^>]*href="DotionWorkspace\.html"[^>]*>([\s\S]*?)<\/a>/g,
    ),
  ];

  assert.equal(workspaceLinks.length, 3);

  const linkText = workspaceLinks
    .map((match) => match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
    .sort();

  assert.deepEqual(linkText, ['Open App', 'Open App', 'Start writing free']);
});

test('template cards do not bypass the approved workspace entry points', () => {
  const templateMarkup = landing.match(
    /<!-- Gallery -->[\s\S]*?<!-- Features -->|<!-- TEMPLATES PAGE -->[\s\S]*?<script>/g,
  )?.join('\n') ?? '';

  assert.ok(templateMarkup, 'template markup should be present');
  assert.doesNotMatch(templateMarkup, /navigate\('workspace'\)/);
  assert.doesNotMatch(templateMarkup, /href="DotionWorkspace\.html"/);
});

test('workspace logo returns to the landing page', () => {
  assert.match(
    workspace,
    /<a\b[^>]*class="ws-logo"[^>]*href="Dotion\.html"[^>]*>/,
  );
  assert.doesNotMatch(workspace, /navigate\('landing'\)/);
});
