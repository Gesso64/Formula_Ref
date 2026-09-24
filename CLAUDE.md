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

Other optional `Course` fields:
- `term` — grouping label for the sidebar / mobile drawer (e.g. `'Year 2 · Fall 2026'`); courses without one fall under "My Courses"
- `sheets` — `{ label, file }[]` of PDFs in `public/formula-sheets/`, rendered as buttons under the course header in `CardGrid`. Every Year 2 course uses exactly `Midterm Sheet` + `Final Sheet`
- `examples` — `WorkedExample[]` shown in the "Worked Examples" tab (PCS125, ECN801)

### Default course data (`src/data/`)

`defaultCourses.ts` exports `DEFAULT_COURSES` (9 courses: 4 Year 1, 5 Year 2). The larger Year 2 section lists live in their own files (`aer309Sections.ts`, `aer316Sections.ts`, `aer318Sections.ts`, `aer320Sections.ts`, `mth425Sections.ts`); examples in `pcs125Examples.ts` / `ecn801Examples.ts`.

### Formula sheet PDFs (`public/formula-sheets/`)

`<code>-midterm.pdf` / `<code>-final.pdf` per Year 2 course, linked via `Course.sheets` using `import.meta.env.BASE_URL` so the links work under the `/Formula_Ref/` base. Vite copies `public/` into `dist/` as-is. The PDFs are compiled LaTeX (`pdflatex`, `multicol`); the `.tex` sources are **not** in the repo. Style rules used: two columns, formula-first short lines with a terse dash-note, underlined bold section headers, pages filled except the last, each Final sheet is cumulative (reuses Midterm content and adds the rest). AER320 is one course with one Midterm/Final pair (Final covers statics + strength of materials). Exception: MTH425 uses a newer "label rail" layout — 10pt, dark section bands, method name + hint in a left column, display-size formulas with key results shaded, Laplace pairs as a fraction table.

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

On every load, `CoursesProvider` compares a djb2 hash of each course in `DEFAULT_COURSES` against the `_defaultHash` stored in IndexedDB and re-writes any default course whose content changed (or is missing). So editing `defaultCourses.ts` or its data files updates existing users automatically; custom courses (`isDefault: false`, UUID ids) are never touched. Note this overwrites local edits made to default courses.

### Path alias

`@/` resolves to `src/` (configured in `vite.config.ts` and `tsconfig.app.json`).

### Layout

- Desktop: `Sidebar` (left) + `CardGrid` (main area)
- Mobile (`< 768px`): `CardGrid` full-width + `BottomNav` fixed at bottom, with a "Courses" drawer

Both the `Sidebar` and the `BottomNav` drawer group courses by `term` with collapsible headers, sharing `src/lib/courseGroups.ts` (`groupCourses`, plus collapsed-state persistence in `localStorage` under `formula-ref:collapsed-groups`). Keep the two in sync when changing course navigation.

### KaTeX

`src/lib/katex.ts` exports `renderLatex(tex, display?)` — wraps `katex.renderToString` with `throwOnError: false`. All formula rendering goes through this helper.
