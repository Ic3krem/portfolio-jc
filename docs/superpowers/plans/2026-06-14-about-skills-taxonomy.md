# About Skills Taxonomy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the About section into five categorized skill marquees containing the approved technologies without duplicates.

**Architecture:** Keep the existing static HTML marquee component and responsive CSS. Replace the four current skill groups with five approved category lists, duplicating each list exactly once for seamless animation and reduced-motion compatibility.

**Tech Stack:** HTML, CSS, Node.js built-in test runner

---

### Task 1: Lock the approved taxonomy with tests

**Files:**
- Create: `tests/about-skills-taxonomy.test.mjs`
- Modify: `tests/about-mobile.test.mjs`

- [ ] **Step 1: Write the failing taxonomy test**

Create a test that extracts the About skill grid, verifies these headings and
skills, and rejects duplicate skills within each visible list:

```js
const expectedCategories = {
  Frontend: ['HTML5', 'CSS', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js'],
  'Backend & Languages': ['Node.js', 'Python', 'FastAPI', 'Flask', 'PHP', 'Java', 'JavaFX', 'C#', 'C++', 'Google Apps Script'],
  Databases: ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Firebase', 'Supabase'],
  'Infrastructure & Tools': ['Vercel', 'DigitalOcean', 'Git', 'Zapier', 'Make', 'n8n'],
  'Creative & Productivity': ['Adobe Creative Cloud', 'Google Workspace', 'Figma', 'Canva', 'Photography', 'Graphic Design', 'Branding'],
};
```

Update the existing marquee test to expect five tracks and five hidden lists.

- [ ] **Step 2: Run the focused tests and verify they fail**

Run:

```powershell
& 'C:\Users\ASUS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\about-skills-taxonomy.test.mjs tests\about-mobile.test.mjs
```

Expected: failure because the current About section has four categories and
does not contain the complete approved taxonomy.

### Task 2: Replace the About skill groups

**Files:**
- Modify: `portfolio/portfolio.html`

- [ ] **Step 1: Replace the four skill groups**

Use the exact category names and skill ordering from Task 1. For each group,
render one visible `<ul>` and one matching `<ul aria-hidden="true">`.

- [ ] **Step 2: Preserve existing behavior**

Keep `.skill-marquee`, `.skill-marquee-track`, alternating animation direction,
mobile single-column layout, and the reduced-motion rule unchanged.

- [ ] **Step 3: Run focused tests**

Run:

```powershell
& 'C:\Users\ASUS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\about-skills-taxonomy.test.mjs tests\about-mobile.test.mjs
```

Expected: all focused tests pass.

### Task 3: Verify the portfolio

**Files:**
- Verify: `portfolio/portfolio.html`
- Verify: `tests/*.test.mjs`

- [ ] **Step 1: Run the full test suite**

Run:

```powershell
& 'C:\Users\ASUS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests\*.test.mjs
```

Expected: zero failed tests.

- [ ] **Step 2: Check the diff**

Run:

```powershell
git diff --check
git diff -- portfolio/portfolio.html tests/about-mobile.test.mjs tests/about-skills-taxonomy.test.mjs
```

Expected: no whitespace errors and only the approved taxonomy/test changes.
