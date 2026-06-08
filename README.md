# Portfolio — John Christopher Diaz

Live site: **https://ic3krem.github.io/portfolio-jc/**

---

## Project Structure

```
├── index.html                  # Redirect → portfolio/portfolio.html
├── projects.html               # Development archive grid (all 6 projects)
├── portfolio/
│   ├── portfolio.html          # Main portfolio (front page)
│   ├── glass-motion.css        # Shared animation/glass styles
│   ├── glass-motion.js         # Shared motion utilities
│   ├── gallery-manifest.json   # (legacy) Gallery image list
│   ├── Pictures/
│   │   ├── Photography/        # Gallery photos (scroll stack)
│   │   ├── hero.png            # Hero section image
│   │   └── *.jpg               # Other portfolio images
│   └── Design/                 # Design mockup screenshots
├── SaintAngelo.html            # Healthcare queue system walkthrough
├── AFHM.html                   # Flood monitoring dashboard walkthrough
├── Dotion.html                 # Productivity workspace walkthrough
├── Radia.html                  # HR management workspace walkthrough
├── SipatGov.html               # Civic transparency platform walkthrough
└── AlphaFitness.html           # Gym management system walkthrough
```

---

## Changing Gallery Photos

The scroll-stack gallery on the portfolio page loads photos from `portfolio/Pictures/Photography/`.

### Steps

1. **Add or replace image files** in `portfolio/Pictures/Photography/`
   - Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`
   - Recommended: square or portrait aspect ratio, 800px+ on the short side
   - File names should be URL-safe (no spaces — use hyphens or underscores)

2. **Update the image list** in `portfolio/portfolio.html`
   - Search for `const GALLERY_IMAGES = [` (around line 1321)
   - Edit the JSON array to match your file names:
     ```js
     const GALLERY_IMAGES = ["my-photo-1.jpg", "my-photo-2.jpg", "portrait.png"];
     ```
   - Order in the array = order in the gallery stack

3. **Commit and push** — the site rebuilds automatically via GitHub Pages

### Gallery Scroll Speed

The scroll speed per photo is controlled by `SCROLL_PER_CARD` in `portfolio/portfolio.html` (around line 1384):

```js
const SCROLL_PER_CARD = 736;  // pixels of scroll per card transition
```

Lower = faster transitions. Higher = slower, more deliberate scrolling.

---

## Changing Hero & Portfolio Images

| Image | Location | Used in |
|-------|----------|---------|
| Hero background | `portfolio/Pictures/hero.png` | Portfolio hero section |
| Topography texture | `portfolio/Pictures/Download Topography Textures Animated background.jpg` | projects.html background |
| Design mockups | `portfolio/Design/*.png` | Portfolio design section |

Replace any of these files (keep the same filename) and push.

---

## Adding or Editing Project Walkthroughs

Each project is a **self-contained single HTML file** in the repo root. They include all CSS, JS, and SVG inline — no external dependencies beyond Google Fonts.

### To edit a project
1. Open the `.html` file (e.g., `Radia.html`)
2. Edit the CSS (in `<style>`), HTML structure, or JS (in `<script>`) directly
3. Commit and push

### To add a new project
1. Create a new `.html` file in the repo root (e.g., `MyNewProject.html`)
2. Add a card linking to it in **two places**:
   - `projects.html` — inside `<div class="project-grid" id="projectGrid">`
   - `portfolio/portfolio.html` — inside the `<div class="work-grid">` section
3. Update the metric counters in `projects.html` if needed (the `data-count-to` attributes)

### Card template for projects.html
```html
<a class="project-card" href="MyNewProject.html" data-tags="web systems" style="--accent:#a786ff" data-spotlight data-reveal>
  <span class="thumb">
    <svg viewBox="0 0 220 140" fill="none" aria-hidden="true">
      <!-- Your thumbnail SVG illustration -->
      <rect x="20" y="20" width="180" height="100" rx="8" stroke="currentColor" stroke-width="3"/>
    </svg>
  </span>
  <span class="card-body">
    <span class="card-meta">Project category</span>
    <h3>Project Name</h3>
    <p>Short description of the project.</p>
    <span class="stack"><span class="chip">Tech1</span><span class="chip">Tech2</span></span>
    <span class="open-row">Open project <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M7 7h10v10"/></svg></span>
  </span>
</a>
```

The `data-tags` attribute controls filtering. Available tags: `systems`, `web`, `civic`, `hardware`, `health`.

---

## HeronsHub Embed

The portfolio features a live iframe embed of [heronshub.social](https://heronshub.social/). If the site is down, blocked by X-Frame-Options, or takes longer than 6 seconds to load, a placeholder graphic is shown automatically.

To update the embed URL, search for `heronshub.social` in `portfolio/portfolio.html` and replace.

---

## Deployment

The site is hosted on **GitHub Pages** from the `main` branch.

- Push to `main` → automatic rebuild (takes ~30 seconds)
- No build step required — all files are static HTML
- Custom domain: configure in repo Settings → Pages → Custom domain

---

## Local Development

Just open any `.html` file directly in a browser. No server needed for the project walkthroughs.

For the portfolio (which loads gallery images), use a local server:

```bash
cd compiled
python -m http.server 8000
# then open http://localhost:8000/portfolio/portfolio.html
```
