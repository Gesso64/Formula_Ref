# TMU Formula Reference

A mobile-friendly, editable formula reference sheet for TMU courses.

**Live site:** https://gesso64.github.io/Formula_Ref/

## Features
- 9 pre-loaded courses, grouped by term in the course menu:
  - **Year 1 · Winter 2026:** PCS125, MTH240, MTL200, ECN801
  - **Year 2 · Fall 2026:** AER309 (Thermodynamics), AER316 (Fluid Mechanics), AER318 (Dynamics), AER320 (Statics & Strength of Materials), MTH425 (Differential Equations & Vector Calculus)
- Each course is a dense, multi-column formula sheet with a sticky numbered section strip and compact / comfortable density; prints as a two-column sheet
- Click an entry to open it in a detail panel (docked on wide screens, a drawer on tablets, full screen on phones); step with j/k or ↑/↓, close with Esc; every entry has its own link (`#aer309/<card-id>`)
- ⌘K / Ctrl+K or `/` searches every course
- Printable, condensed **Midterm** and **Final** formula-sheet PDFs for every Year 2 course, linked from the top bar
- Worked examples for PCS125 and ECN801
- Add/edit/delete courses, sections, and cards (Edit mode), with live LaTeX preview
- IndexedDB persistence (survives page reloads); export/import JSON backups
- Light / dark theme
- Interactive interest factor table for ECN801

## Formula sheets
The PDFs live in `public/formula-sheets/` as `<course>-midterm.pdf` and `<course>-final.pdf` and are wired up through each course's `sheets` array in `src/data/defaultCourses.ts`. They are typeset with LaTeX (`pdflatex`, two-column `multicol` layout) and sized to each course's formula-sheet allowance; MTH425 allows no aids, so its sheets are memorization aids only. The LaTeX sources are not stored in this repo, so changing a sheet means recompiling the PDF and replacing the file.

## Development
```bash
npm install
npm run dev
npm run build   # type-check + production build
npm run lint
```

## Deploy
Push to `main` — GitHub Actions builds and deploys automatically.
