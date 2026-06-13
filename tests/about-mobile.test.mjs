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

test('mobile about content overlaps a gradient-faded portrait', () => {
  const mobileStart = html.lastIndexOf('@media (max-width: 767px)');
  const reducedMotionStart = html.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  const mobileBlock = html.slice(mobileStart, reducedMotionStart);
  const photoOverlayRule = getRule('.about-photo-wrap::after', mobileBlock);
  const copyRule = getRule('.about-copy', mobileBlock);

  assert.match(photoOverlayRule, /linear-gradient/);
  assert.match(photoOverlayRule, /var\(--bg\)/);
  assert.match(copyRule, /margin-top:\s*-\d/);
  assert.match(copyRule, /position:\s*relative/);
  assert.match(copyRule, /z-index:\s*3/);
});

test('skill groups use duplicated infinite marquee tracks', () => {
  const tracks = html.match(/class="skill-marquee-track"/g) ?? [];
  const hiddenLists = html.match(/<ul aria-hidden="true">/g) ?? [];
  const trackRule = getRule('.skill-marquee-track');

  assert.equal(tracks.length, 5);
  assert.equal(hiddenLists.length, 5);
  assert.match(trackRule, /animation:\s*skill-marquee/);
  assert.match(html, /@keyframes skill-marquee/);
});

test('skill marquees share one desktop direction and alternate on mobile', () => {
  const responsiveStart = html.indexOf('/* ===== RESPONSIVE ===== */');
  const mobileStart = html.lastIndexOf('@media (max-width: 767px)');
  const reducedMotionStart = html.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  const desktopBlock = html.slice(0, responsiveStart);
  const mobileBlock = html.slice(mobileStart, reducedMotionStart);

  assert.doesNotMatch(
    desktopBlock,
    /\.skill-group:nth-child\(even\)\s+\.skill-marquee-track\s*\{/,
  );

  const evenTrackRule = getRule(
    '.skill-group:nth-child(even) .skill-marquee-track',
    mobileBlock,
  );
  assert.match(evenTrackRule, /animation-direction:\s*reverse/);
});

test('skill marquee has a reduced-motion fallback', () => {
  const reducedMotionStart = html.lastIndexOf('@media (prefers-reduced-motion: reduce)');
  const reducedMotionBlock = html.slice(reducedMotionStart);
  const trackRule = getRule('.skill-marquee-track', reducedMotionBlock);
  const duplicateRule = getRule('.skill-marquee ul[aria-hidden="true"]', reducedMotionBlock);

  assert.match(trackRule, /animation:\s*none/);
  assert.match(duplicateRule, /display:\s*none/);
});
