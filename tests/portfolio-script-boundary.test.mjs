import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portfolioPath = new URL('../portfolio/portfolio.html', import.meta.url);
const html = await readFile(portfolioPath, 'utf8');

test('removed ripple effect does not leak JavaScript into the page body', () => {
  assert.doesNotMatch(html, /function createShader\s*\(/);
  assert.doesNotMatch(html, /#ripple-canvas\s*\{/);
  assert.equal(
    (html.match(/<script\b/gi) ?? []).length,
    (html.match(/<\/script>/gi) ?? []).length,
    'every script opening tag should have one closing tag',
  );
});
