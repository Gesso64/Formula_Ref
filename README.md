# TMU Formula Reference

A mobile-friendly, editable formula reference sheet for TMU courses.

**Live site:** https://gesso64.github.io/Formula_Ref/

## Features
- 9 pre-loaded courses, grouped by term in the sidebar / mobile course drawer (collapsible):
  - **Year 1 · Winter 2026:** PCS125, MTH240, MTL200, ECN801
  - **Year 2 · Fall 2026:** AER309 (Thermodynamics), AER316 (Fluid Mechanics), AER318 (Dynamics), AER320 (Statics & Strength of Materials), MTH425 (Differential Equations & Vector Calculus)
- Printable, condensed **Midterm** and **Final** formula-sheet PDFs for every Year 2 course, linked as buttons under each course's title (opens/downloads the PDF)
- Worked examples for PCS125 and ECN801
- Add/edit/delete courses, sections, and cards through the UI
- Live LaTeX preview when editing formulas
- IndexedDB persistence (survives page reloads)
- Export/import JSON backups
- Mobile-first with bottom navigation
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
