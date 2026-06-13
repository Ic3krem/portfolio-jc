# Dotion Two-Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split Dotion's marketing and editor experiences into `Dotion.html` and `DotionWorkspace.html` with explicit CTA-only workspace entry.

**Architecture:** Preserve the current standalone HTML convention. The landing file keeps marketing and template-gallery markup plus landing navigation logic; the workspace file keeps the existing editor markup and editor state logic. Existing localStorage keys continue to carry theme, accent, and font preferences between pages.

**Tech Stack:** Static HTML, CSS, JavaScript, Node.js built-in test runner

---

### Task 1: Protect the two-page navigation contract

**Files:**
- Create: `tests/dotion-two-page.test.mjs`
- Test: `tests/dotion-two-page.test.mjs`

- [ ] **Step 1: Write the failing structural test**

Read `Dotion.html` and `DotionWorkspace.html`. Assert that:

- `Dotion.html` has no `id="workspace-page"`.
- `DotionWorkspace.html` exists and has `id="workspace-page"`.
- Exactly three `href="DotionWorkspace.html"` links exist in `Dotion.html`.
- Those links are the two `Open App` controls and `Start writing free`.
- Template cards and `Use Template` buttons contain no workspace navigation.
- The workspace contains an `href="Dotion.html"` logo link.

- [ ] **Step 2: Run the test to verify it fails**

Run:

```powershell
& 'C:\Users\ASUS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests/dotion-two-page.test.mjs
```

Expected: FAIL because `DotionWorkspace.html` does not exist and the workspace
is still embedded in `Dotion.html`.

### Task 2: Create the standalone workspace

**Files:**
- Create: `DotionWorkspace.html`
- Modify: `Dotion.html`

- [ ] **Step 1: Create the workspace document**

Copy the current Dotion document as the extraction source, retain its head and
styles, then keep only the `#workspace-page` markup and workspace JavaScript.
Make the workspace page active on load.

- [ ] **Step 2: Replace workspace return navigation**

Replace the workspace logo's `navigate('landing')` action with a normal
`href="Dotion.html"` link.

- [ ] **Step 3: Remove workspace markup and state from the landing file**

Delete `#workspace-page`, sidebar/settings state variables, and workspace-only
functions from `Dotion.html`. Keep landing theme and scroll-reveal behavior.

### Task 3: Enforce approved workspace entry points

**Files:**
- Modify: `Dotion.html`
- Test: `tests/dotion-two-page.test.mjs`

- [ ] **Step 1: Convert approved CTAs to links**

Use normal anchors to `DotionWorkspace.html` for:

- Landing navigation `Open App`
- Hero `Start writing free`
- Template gallery top-bar `Open App`

- [ ] **Step 2: Remove template workspace navigation**

Make all landing template previews open the template gallery. Remove
`onclick="navigate('workspace')"` from template cards and remove workspace
navigation from every `Use Template` button.

- [ ] **Step 3: Run the focused test**

Run:

```powershell
& 'C:\Users\ASUS\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe' --test tests/dotion-two-page.test.mjs
```

Expected: PASS.

### Task 4: Verify both pages

**Files:**
- Test: `tests/*.test.mjs`

- [ ] **Step 1: Run all tests**

Run all `tests/*.test.mjs` files with the bundled Node executable.

Expected: all tests pass.

- [ ] **Step 2: Browser-check desktop**

Open `Dotion.html`, verify the landing page, click both landing CTAs, and confirm
they open `DotionWorkspace.html`. Return through the workspace logo. Open the
template gallery and confirm cards and `Use Template` controls do not enter the
workspace.

- [ ] **Step 3: Browser-check mobile**

Verify both pages at 390 by 844 pixels. Confirm no horizontal overflow, the
workspace sidebar behavior remains functional, and approved CTA navigation
still works.

- [ ] **Step 4: Run final source checks**

Run `git diff --check` and search both files for stale
`navigate('workspace')` calls or duplicate workspace markup.
