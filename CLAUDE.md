# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start dev server (Vite, hot-reload)
npm run build     # tsc -b && vite build → dist/
npm run lint      # eslint .
npm run preview   # serve the built dist/ locally
```

There are no tests. Deploying is done by pushing to `main` — GitHub Actions builds and deploys to GitHub Pages automatically.

## Architecture

This is a React 19 + TypeScript + Vite SPA deployed to GitHub Pages at `/Formula_Ref/` (note the `base` in `vite.config.ts`). It is a mobile-first formula reference sheet for TMU engineering/math courses.

### Data model (`src/types/index.ts`)

The hierarchy is **Course → Section → Card**. A `Card` can be:
- `standard` — has a KaTeX `formula`, optional `subs` (sub-formulas), `notes` (HTML), and `tableRows`
- `widget` — currently used for the interactive ECN801 interest factor table (`InterestTable`)

Course accent colours are stored per-course as six CSS-variable-like fields (`accent`, `accentBg`, `accentFg`, and their dark-mode counterparts).

### State management (`src/hooks/useCourses.tsx`)

`CoursesProvider` is the single source of truth. It wraps the entire app and exposes:
- CRUD for courses, sections, and cards via `upsertCourse / deleteSection / upsertCard` etc.
- `exportAll` / `importAll` for JSON backup/restore
- Helper factory functions `newCourse`, `newSection`, `newCard` live in the same file

All mutations go through `upsertCourse` (which calls `storage.upsertCourse`), then re-fetch from IndexedDB to sync state.

### Persistence (`src/lib/storage.ts`)

IndexedDB via the `idb` library. Two object stores:
- `courses` — keyed by `course.id`
- `meta` — single record `{ key: 'app', value: AppMeta }` tracking `activeCourseId`

On first load, if IndexedDB is empty, the four default courses from `src/data/defaultCourses.ts` are seeded.

### Path alias

`@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

### Layout

- Desktop: `Sidebar` (left) + `CardGrid` (main area)
- Mobile (`< 768px`): `CardGrid` full-width + `BottomNav` fixed at bottom

### KaTeX

`src/lib/katex.ts` exports `renderLatex(tex, display?)` — wraps `katex.renderToString` with `throwOnError: false`. All formula rendering goes through this helper.
