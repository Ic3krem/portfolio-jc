# About Skills Taxonomy Design

## Goal

Expand the About section's skills marquee with the requested technologies while
preserving existing relevant skills, avoiding duplicates, and retaining the
current responsive marquee treatment.

## Categories

### Frontend

- HTML5
- CSS
- Tailwind CSS
- JavaScript
- TypeScript
- React
- Next.js

### Backend & Languages

- Node.js
- Python
- FastAPI
- Flask
- PHP
- Java
- JavaFX
- C#
- C++
- Google Apps Script

### Databases

- SQL
- PostgreSQL
- MySQL
- MongoDB
- SQLite
- Firebase
- Supabase

### Infrastructure & Tools

- Vercel
- DigitalOcean
- Git
- Zapier
- Make
- n8n

### Creative & Productivity

- Adobe Creative Cloud
- Google Workspace
- Figma
- Canva
- Photography
- Graphic Design
- Branding

## Presentation

- Keep the existing pill-based infinite marquee component.
- Render five skill groups instead of four.
- Duplicate each category list once for the seamless marquee animation.
- Keep alternating marquee directions and the existing reduced-motion fallback.
- Use official product naming, including Google Apps Script, DigitalOcean,
  SQLite, Adobe Creative Cloud, and Google Workspace.

## Verification

- Add a markup regression test that verifies all five categories.
- Verify each requested skill appears in its intended category.
- Verify every visible list has an identical hidden duplicate.
- Update the existing marquee count test from four groups to five.
- Run the complete Node test suite.
