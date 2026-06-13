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

test('hero intro is anchored absolutely to the hero', () => {
  const rule = getRule('.hero-intro');

  assert.match(rule, /position:\s*absolute/);
  assert.match(rule, /top:\s*var\(--hero-intro-top\)/);
  assert.match(rule, /left:\s*var\(--hero-intro-left\)/);
  assert.match(rule, /align-items:\s*flex-start/);
  assert.doesNotMatch(rule, /align-items:\s*top left/);
});

test('hero intro typography uses shared responsive sizing variables', () => {
  const titleRule = getRule('.hero-intro .intro-title');
  const bodyRule = getRule('.hero-intro .intro-body');

  assert.match(html, /family=Caveat:wght@400;500/);
  assert.match(titleRule, /font-family:\s*'Caveat', cursive/);
  assert.match(bodyRule, /font-family:\s*'Caveat', cursive/);
  assert.match(titleRule, /font-size:\s*var\(--hero-intro-title-size\)/);
  assert.match(bodyRule, /font-size:\s*var\(--hero-intro-body-size\)/);
  assert.match(bodyRule, /width:\s*var\(--hero-intro-body-width\)/);
});

test('hero intro matches the reference copy and desktop placement', () => {
  const rule = getRule('.hero-intro');

  assert.match(rule, /--hero-intro-left:\s*57%/);
  assert.match(rule, /--hero-intro-top:\s*31%/);
  assert.match(rule, /transform:\s*rotate\(-2deg\)/);
  assert.match(html, /<p class="intro-title">I'm JC<\/p>/);
  assert.match(html, /<p class="intro-body">I solve problems, and create effective solution\.<\/p>/);
});

test('hero intro has tablet and mobile breakpoint overrides', () => {
  const tabletStart = html.lastIndexOf('@media (max-width: 1024px)');
  const mobileStart = html.lastIndexOf('@media (max-width: 767px)');
  const reducedMotionStart = html.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  const tabletBlock = html.slice(tabletStart, mobileStart);
  const mobileBlock = html.slice(mobileStart, reducedMotionStart);

  assert.ok(tabletStart >= 0, 'Expected the tablet media query');
  assert.ok(mobileStart > tabletStart, 'Expected the mobile media query after the tablet query');
  assert.ok(reducedMotionStart > mobileStart, 'Expected reduced-motion styles after the mobile query');

  for (const [label, block] of [['tablet', tabletBlock], ['mobile', mobileBlock]]) {
    const rule = getRule('.hero-intro', block);

    assert.match(rule, /--hero-intro-title-size:/, `${label} title size should be overridden`);
    assert.match(rule, /--hero-intro-body-size:/, `${label} body size should be overridden`);
    assert.match(rule, /--hero-intro-body-width:/, `${label} body width should be overridden`);
  }

  const mobileRule = getRule('.hero-intro', mobileBlock);
  assert.match(mobileRule, /--hero-intro-left:\s*51%/);
  assert.match(mobileRule, /--hero-intro-top:\s*24%/);
  assert.match(mobileRule, /--hero-intro-title-size:\s*clamp\(4\.6rem,\s*14vw,\s*6rem\)/);
  assert.match(mobileRule, /--hero-intro-body-size:\s*clamp\(1rem,\s*3vw,\s*1\.3rem\)/);
  assert.match(mobileRule, /--hero-intro-body-width:\s*38vw/);
  assert.match(mobileRule, /max-width:\s*42vw/);
});
