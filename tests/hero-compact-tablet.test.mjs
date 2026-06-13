import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portfolioPath = new URL('../portfolio/portfolio.html', import.meta.url);
const html = await readFile(portfolioPath, 'utf8');

function getRule(selector, source) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escapedSelector}\\s*\\{([^}]+)\\}`));

  assert.ok(match, `Expected to find the ${selector} CSS rule`);
  return match[1];
}

test('compact landscape tablets use a shorter hero layout', () => {
  const compactStart = html.indexOf('@media (min-width: 768px) and (max-width: 1024px) and (max-height: 700px)');
  const mobileStart = html.lastIndexOf('@media (max-width: 767px)');
  const compactBlock = html.slice(compactStart, mobileStart);

  assert.ok(compactStart >= 0, 'Expected a compact landscape tablet media query');

  const contentRule = getRule('.hero-content', compactBlock);
  const titleRule = getRule('.hero-title', compactBlock);
  const subRule = getRule('.hero-sub', compactBlock);
  const introRule = getRule('.hero-intro', compactBlock);

  assert.match(contentRule, /bottom:\s*4rem/);
  assert.match(contentRule, /left:\s*4rem/);
  assert.match(contentRule, /max-width:\s*40rem/);
  assert.match(titleRule, /font-size:\s*clamp\(5rem,\s*9vw,\s*9rem\)/);
  assert.match(subRule, /font-size:\s*1\.25rem/);
  assert.match(introRule, /--hero-intro-title-size:\s*clamp\(4rem,\s*5vw,\s*5\.4rem\)/);
  assert.match(introRule, /--hero-intro-body-size:\s*1\.15rem/);
});
