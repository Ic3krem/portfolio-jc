# Project Image Slots Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace abstract selected-work visuals with maintainable screenshot image slots and remove the nonfunctional HeronsHub iframe.

**Architecture:** Keep the static single-file portfolio structure. Use stable files under `portfolio/Pictures/Projects/`, standard `<img>` elements in each visual container, and CSS for crop, hover, and missing-file presentation. A static Node test protects the HTML contract.

**Tech Stack:** Static HTML, CSS, JavaScript, Node.js built-in test runner

---

### Task 1: Protect the image-slot contract

**Files:**
- Create: `tests/project-image-slots.test.mjs`
- Test: `tests/project-image-slots.test.mjs`

- [ ] **Step 1: Write the failing test**

Read `portfolio/portfolio.html` and assert that all seven
`Pictures/Projects/*.png` paths exist, that `.work-card-visual` contains no
inline project SVG placeholders, and that `heronsEmbed`,
`heronsPlaceholder`, and the HeronsHub iframe are absent.

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test tests/project-image-slots.test.mjs`

Expected: FAIL because the image paths are missing and the iframe/SVG markup is
still present.

### Task 2: Add screenshot assets and image-slot styles

**Files:**
- Create: `portfolio/Pictures/Projects/heronshub.png`
- Create: `portfolio/Pictures/Projects/saintangelo.png`
- Create: `portfolio/Pictures/Projects/afhm.png`
- Create: `portfolio/Pictures/Projects/dotion.png`
- Create: `portfolio/Pictures/Projects/radia.png`
- Create: `portfolio/Pictures/Projects/sipatgov.png`
- Create: `portfolio/Pictures/Projects/alphafitness.png`
- Modify: `portfolio/portfolio.html`

- [ ] **Step 1: Generate initial screenshots**

Capture the local project pages at a consistent desktop viewport. Use the live
HeronsHub page only for a static screenshot; do not attempt to embed it.

- [ ] **Step 2: Replace visual markup**

Replace each inline project SVG with an `<img>` using the matching stable path,
descriptive alt text, `loading="lazy"`, and `decoding="async"`.

- [ ] **Step 3: Replace HeronsHub embed**

Remove the iframe, fallback placeholder, timeout code, and cross-origin document
inspection. Use `Pictures/Projects/heronshub.png` as the featured preview and
keep the existing external project link.

- [ ] **Step 4: Update CSS**

Style `.work-card-visual img` to fill the visual area with `width: 100%`,
`height: 100%`, `object-fit: cover`, and the existing hover scale transition.
Delete iframe- and placeholder-specific rules.

- [ ] **Step 5: Run the focused test**

Run: `node --test tests/project-image-slots.test.mjs`

Expected: PASS.

### Task 3: Verify the complete portfolio

**Files:**
- Test: `tests/*.test.mjs`

- [ ] **Step 1: Run all tests**

Run: `node --test tests/*.test.mjs`

Expected: all tests pass.

- [ ] **Step 2: Inspect the rendered page**

Serve the repository locally, open `portfolio/portfolio.html`, and verify the
featured image, six project images, desktop grid, and mobile stack.

- [ ] **Step 3: Review the diff**

Confirm the diff contains only the new test, project image assets, documentation,
and narrowly scoped selected-work changes in `portfolio/portfolio.html`.
