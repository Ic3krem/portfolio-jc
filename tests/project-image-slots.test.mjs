import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portfolioPath = new URL('../portfolio/portfolio.html', import.meta.url);
const html = await readFile(portfolioPath, 'utf8');

const projectImages = [
  ['heronshub.png', 'HeronsHub Social'],
  ['saintangelo.png', 'SaintAngelo'],
  ['afhm.png', 'AFHM'],
  ['dotion.png', 'Dotion'],
  ['radia.png', 'Radia'],
  ['sipatgov.png', 'SipatGov'],
  ['alphafitness.png', 'AlphaFitness'],
];

test('selected work uses replaceable project images', () => {
  for (const [filename, projectName] of projectImages) {
    const imagePattern = new RegExp(
      `<img[^>]+src="Pictures/Projects/${filename}"[^>]+alt="[^"]*${projectName}[^"]*"[^>]+loading="lazy"[^>]+decoding="async"`,
      'i',
    );

    assert.match(html, imagePattern, `${projectName} should use its project image slot`);
  }
});

test('project visual areas no longer use inline SVG placeholders', () => {
  const projectSection = html.match(
    /<!-- Featured: HeronsHub[\s\S]*?<!-- PHOTOGRAPHY -->/,
  )?.[0];

  assert.ok(projectSection, 'selected work project markup should be present');

  const visualAreas = projectSection.match(
    /<div class="work-card-visual">[\s\S]*?<\/div>\s*<div class="work-card-body">/g,
  );

  assert.equal(visualAreas?.length, 7, 'all seven project visual areas should be found');

  for (const visualArea of visualAreas) {
    assert.doesNotMatch(visualArea, /<svg\b/i);
  }
});

test('HeronsHub uses a static linked preview instead of a blocked iframe', () => {
  assert.doesNotMatch(html, /<iframe\b[^>]*heronshub\.social/i);
  assert.doesNotMatch(html, /\bheronsEmbed\b/);
  assert.doesNotMatch(html, /\bheronsPlaceholder\b/);
  assert.match(html, />Project Preview<\/span>/);
});
