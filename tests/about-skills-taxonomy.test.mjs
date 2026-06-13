import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portfolioPath = new URL('../portfolio/portfolio.html', import.meta.url);
const html = await readFile(portfolioPath, 'utf8');

const expectedCategories = {
  Frontend: ['HTML5', 'CSS', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  'Backend & Languages': ['Node.js', 'Python', 'FastAPI', 'Flask', 'PHP', 'Java', 'JavaFX', 'C#', 'C++', 'Google Apps Script'],
  Databases: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Firebase', 'Supabase'],
  'Infrastructure & Tools': ['Vercel', 'DigitalOcean', 'Git', 'Zapier', 'Make', 'n8n'],
  'Creative & Productivity': ['Adobe Creative Cloud', 'Google Workspace', 'Figma', 'Canva', 'Photography', 'Graphic Design', 'Branding'],
};

function extractItems(listMarkup) {
  return [...listMarkup.matchAll(/<li>([^<]+)<\/li>/g)].map((match) => match[1]);
}

function decodeText(text) {
  return text.replaceAll('&amp;', '&');
}

test('about skills use the approved categories without duplicates', () => {
  const skillGrid = html.match(
    /<div class="skill-grid reveal reveal-d3">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/,
  )?.[1];

  assert.ok(skillGrid, 'About skill grid should be present');

  const groups = [...skillGrid.matchAll(
    /<div class="skill-group">\s*<h3>([^<]+)<\/h3>[\s\S]*?<ul>([\s\S]*?)<\/ul>\s*<ul aria-hidden="true">([\s\S]*?)<\/ul>/g,
  )];

  assert.equal(groups.length, Object.keys(expectedCategories).length);

  for (const [index, [category, expectedItems]] of Object.entries(expectedCategories).entries()) {
    const group = groups[index];

    assert.equal(decodeText(group[1]), category);

    const visibleItems = extractItems(group[2]);
    const duplicateItems = extractItems(group[3]);

    assert.deepEqual(visibleItems, expectedItems, `${category} should use the approved skill order`);
    assert.deepEqual(duplicateItems, visibleItems, `${category} marquee copy should match`);
    assert.equal(new Set(visibleItems).size, visibleItems.length, `${category} should not repeat skills`);
  }
});
