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

This is a React 19 + TypeScript + Vite SPA deployed to GitHub Pages at `/Formula_Ref/` (note the `base` in `vite.config.ts`). It is Kneeboard, a mobile-first formula reference for aerospace engineering/math courses (deliberately not branded with any school name). Internal storage keys (`formula-ref` IndexedDB name, `formula-ref:` localStorage keys) keep the old name so existing saved data survives.

### Data model (`src/types/index.ts`)

The hierarchy is **Course → Section → Card**. A `Card` can be:
- `standard` — has a KaTeX `formula`, optional `subs` (sub-formulas), `notes` (HTML), and `tableRows`
- `widget` — currently used for the interactive ECN801 interest factor table (`InterestTable`)

Course accent colours are stored per-course as six CSS-variable-like fields (`accent`, `accentBg`, `accentFg`, and their dark-mode counterparts).

Other optional `Course` fields:
- `term` — grouping label in the course menu (e.g. `'Year 2 · Fall 2026'`); courses without one fall under "My Courses"
- `sheets` — `{ label, file }[]` of PDFs in `public/formula-sheets/`, linked from the top bar (a row under the course button on phones); a plain click opens them in the in-site viewer (`SheetViewer`). Every Year 2 course has `Midterm Sheet` + `Final Sheet`; AER320 also has a narrower `Test 1 Sheet`
- `examples` — `WorkedExample[]` shown in the "Worked Examples" view (PCS125, ECN801)
- `labs` — `PracticeLab[]` (practice sets) shown in the "Practice" view (AER309, AER320, MTH425). Each set has a `blurb`, an `intro` (key-methods recap, a dropdown) and `problems` (`label`, `statement`, `method`, `solution`, optional `figure` / `solutionFigure` SVG paths under `public/`); all text is Markdown with `$…$` / `$$…$$` math, rendered by `renderMarkdown` in `src/lib/markdown.ts` (math is swapped out for placeholders before any Markdown parsing). `heading` / `short` name the set (default "Set N" and the number; never call them labs in the UI), `number` orders them (7.5 slots the MTH425 practice midterm after Set 7), and `pdf` is the printable copy's path under `public/` (`practice/<course>/…`)

### Default course data (`src/data/`)

`defaultCourses.ts` exports `DEFAULT_COURSES` (9 courses: 4 Year 1, 5 Year 2). The larger Year 2 section lists live in their own files (`aer309Sections.ts`, `aer316Sections.ts`, `aer318Sections.ts`, `aer320Sections.ts`, `mth425Sections.ts`); examples in `pcs125Examples.ts` / `ecn801Examples.ts`. `mth425Labs.ts` (12 practice sets, 101 problems) was generated from `courses/MTH425-DiffEqVectorCalc/labs/labN-practice-set.md` in the Aerospace Semester 3 repo (split on `## Problem N` / `### Solution: <method>`, references to `labN_check.py` dropped). `aer309Practice.ts`, `aer320Practice.ts` and `mth425Practice.ts` were converted from that repo's LaTeX practice booklets, with TikZ figures exported to SVG in `public/practice/`. Printable PDFs in `public/practice/` are rebuilt copies with school details removed (no school name, dates, rooms, D2L, repo paths). Every math fragment must pass KaTeX with `throwOnError: true`.

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

### UI (`src/inspector/`)

`App.tsx` renders `InspectorLayout` once `CoursesProvider` has loaded. Everything the UI needs lives in `src/inspector/` (the editors `CardEditor` / `SectionEditor` / `CourseEditor` and the `InterestTable` widget stay in `src/components/`):
- `InspectorLayout.tsx` — the page: top bar (course menu, PDF sheet links, Formulas / Worked Examples switch, search trigger, density, Edit, theme, ⋯ menu), sticky numbered section strip with scroll-spy, and the sheet body. Each "page" of the body is a balanced CSS multi-column block about one screen tall (`paginate` in `model.ts`); columns: up to 4 compact / 3 comfortable, one on phones (`< 768px`)
- `Entry.tsx` — one label-rail entry (name + hint on the left, formulas + terse note on the right); `Examples.tsx` — worked examples; `Menu.tsx` — dropdown / phone bottom-sheet menus; `icons.tsx`
- Detail panel: clicking an entry opens `DetailPane.tsx`, docked on the right at ≥ 1100px, an overlay drawer from 768–1100px, full screen on phones. j/k or ↑/↓ step through entries, Esc / Back closes. The course and selected entry live in the URL hash (`#<code>`, `#<code>/<cardId>`, `#<code>/ex/<exampleId>`, via `parseHash` / `formatHash` in `paneModel.ts`); opening the panel pushes a history entry so Back closes it. `DetailPane` shrinks over-wide equations to fit (down to half size, then they scroll)
- `SheetViewer.tsx` — a course's Midterm / Final PDF full screen inside the site: Midterm/Final switch, zoom (−/Fit/+, keys `-` `=` `0`), page counter, open-in-new-tab and Download. Rendered with pdf.js (`pdfjs-dist` legacy build, for older mobile Safari) loaded on demand from `pdf.ts` (`loadSheet` caches documents); `prefetchPdf` warms it when a sheet link is hovered. URL hash `#<code>/sheet/<key>` (`sheetKey`: "Midterm Sheet" → `midterm`); it is an overlay like the detail panel, so Esc / Back closes it. Modified clicks on sheet links (Ctrl/⌘, middle) still open the raw PDF. Styles in `viewer.css` (prefix `sv-`)
- `Labs.tsx` — the Practice view: one practice set at a time (picked from the section strip, URL hash `#<code>/set/<n>`; old `/lab/<n>` links still parse), key methods in a sticky shaded box beside the problems (stacked below 1100px or with the panel docked), each solution behind a Show solution button and only mounted once opened. Search results for practice problems open the set and scroll to the problem
- `Palette.tsx` — ⌘K / Ctrl+K or `/` searches every course (`buildIndex` / `search` in `paneModel.ts`), including practice problems; `paneIcons.tsx`, `Tex.tsx`
- CSS: `sheet.css` (prefix `sh-`, includes print styles), `pane.css` (prefix `ix-`, detail pane + palette), `inspector.css` (the panel's docked / drawer / phone placement). The `ix-` parts started life as a separate "Index" layout, hence the second prefix

Performance: KaTeX layout dominates (a big course is ~13k DOM nodes; one full layout costs hundreds of ms), so avoid anything that forces layout of every entry. `.sh-entry` / `.sh-ex` use `content-visibility: auto` (off-screen entries skip layout). `InspectorLayout` measures entry heights for pagination in a hidden, layout-isolated `.sh-measure` box (cloned entries, time-sliced), caches heights and fitted formula sizes per column geometry (cleared when course data changes), and passes them to `Entry` (`estH` → `contain-intrinsic-size`, `fit` → pre-fitted font sizes). Formulas are otherwise fitted lazily via an IntersectionObserver. Phones (one column) skip height measuring. `renderLatex` memoises its output.

Course grouping by `term` comes from `groupCourses` in `src/lib/courseGroups.ts`.

### Theme

`src/lib/theme.ts` holds a light/dark/system preference (`localStorage` `formula-ref:theme`) and writes the resolved theme to `<html data-theme>`; `index.html` sets it before first paint. Key dark styles off `:root[data-theme="dark"]`, never `prefers-color-scheme`. Use `useTheme()` / `toggleTheme()` for toggles.

### KaTeX

`src/lib/katex.ts` exports `renderLatex(tex, display?)` — wraps `katex.renderToString` with `throwOnError: false`. All formula rendering goes through this helper.
