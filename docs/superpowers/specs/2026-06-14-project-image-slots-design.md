# Project Image Slots Design

## Goal

Replace the abstract SVG artwork in the selected-work section with replaceable
project screenshots, and remove the HeronsHub iframe that cannot load inside the
portfolio.

## Current Problem

- The six project cards use decorative inline SVG shapes instead of screenshots.
- HeronsHub sends `X-Frame-Options: SAMEORIGIN` and a Content Security Policy
  containing `frame-ancestors 'self'`, so another domain cannot embed it.
- The current iframe load handler also attempts to inspect a cross-origin
  document. Browsers block that access, causing the code to hide the iframe even
  when its load event fires.

## Design

Create `portfolio/Pictures/Projects/` and use these stable image paths:

- `heronshub.png`
- `saintangelo.png`
- `afhm.png`
- `dotion.png`
- `radia.png`
- `sipatgov.png`
- `alphafitness.png`

Each visual area will contain a normal `<img>` element. Images will fill the
existing card visual region with `object-fit: cover`, remain responsive, and
receive the existing hover zoom treatment.

The HeronsHub visual will be a static screenshot wrapped by the existing live
project link. The card will keep a badge, but its text will identify the image as
a project preview rather than claiming that the blocked iframe is live.

Initial placeholder image files will be generated from the corresponding local
project pages where possible. They are disposable: replacing a file while
keeping its filename will update the portfolio without requiring HTML changes.

## Missing Image Behavior

Each image will have a dark, branded background behind it. If a file is absent
or fails to load, the visual area remains styled and the image's accessible alt
text identifies the intended project. No inline SVG mockup will reappear.

## Responsive Behavior

The existing grid and featured-card breakpoints remain unchanged. Standard
cards retain their current visual height. The featured HeronsHub image fills the
left half on desktop and follows the existing stacked mobile layout.

## Testing

Add a static HTML regression test that verifies:

- Seven project screenshot paths are present.
- Project-card visuals no longer contain inline SVG placeholders.
- The HeronsHub iframe and its load/fallback JavaScript are absent.
- Every project screenshot has useful alt text and lazy-loading metadata.

Run all existing Node tests after the change.
