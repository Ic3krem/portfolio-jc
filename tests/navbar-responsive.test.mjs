import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const portfolioPath = new URL('../portfolio/portfolio.html', import.meta.url);
const html = await readFile(portfolioPath, 'utf8');

function getRule(selector, source = html) {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escapedSelector}\\s*\\{([^}]+)\\}`));

  assert.ok(match, `Expected to find the ${selector} CSS rule`);
  return match[1];
}

test('navbar keeps its horizontal alignment during the entrance animation', () => {
  const navRule = getRule('.site-nav');
  const enteredRule = getRule('body.is-entered .site-nav');

  assert.match(navRule, /--site-nav-x:\s*0/);
  assert.match(navRule, /transform:\s*translate\(var\(--site-nav-x\),\s*-1rem\)/);
  assert.match(enteredRule, /transform:\s*translate\(var\(--site-nav-x\),\s*0\)/);
});

test('navbar is centered at tablet and smaller widths', () => {
  const tabletStart = html.lastIndexOf('@media (max-width: 1024px)');
  const mobileStart = html.lastIndexOf('@media (max-width: 767px)');
  const tabletBlock = html.slice(tabletStart, mobileStart);
  const navRule = getRule('.site-nav', tabletBlock);

  assert.match(navRule, /left:\s*50%/);
  assert.match(navRule, /right:\s*auto/);
  assert.match(navRule, /--site-nav-x:\s*-50%/);
});
