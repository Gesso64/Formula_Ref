# TMU Formula Reference

A mobile-friendly, editable formula reference sheet for TMU courses.

**Live site:** https://gesso64.github.io/Formula_Ref/

## Features
- 4 pre-loaded courses: PCS125, MTH240, MTL200, ECN801
- Add/edit/delete courses, sections, and cards through the UI
- Live LaTeX preview when editing formulas
- IndexedDB persistence (survives page reloads)
- Export/import JSON backups
- Mobile-first with bottom navigation
- Interactive interest factor table for ECN801

## Development
```bash
npm install
npm run dev
```

## Deploy
Push to `main` — GitHub Actions builds and deploys automatically.
