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
- `term` — grouping label in the course menu (e.g. `'Year 2 · Fall 2026'`); courses without one fall under "My Courses"
- `sheets` — `{ label, file }[]` of PDFs in `public/formula-sheets/`, linked from the top bar (and the ⋯ menu on phones); a plain click opens them in the in-site viewer (`SheetViewer`). Every Year 2 course uses exactly `Midterm Sheet` + `Final Sheet`
- `examples` — `WorkedExample[]` shown in the "Worked Examples" view (PCS125, ECN801)

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

### UI (`src/inspector/`)

`App.tsx` renders `InspectorLayout` once `CoursesProvider` has loaded. Everything the UI needs lives in `src/inspector/` (the editors `CardEditor` / `SectionEditor` / `CourseEditor` and the `InterestTable` widget stay in `src/components/`):
- `InspectorLayout.tsx` — the page: top bar (course menu, PDF sheet links, Formulas / Worked Examples switch, search trigger, density, Edit, theme, ⋯ menu), sticky numbered section strip with scroll-spy, and the sheet body. Each "page" of the body is a balanced CSS multi-column block about one screen tall (`paginate` in `model.ts`); columns: up to 4 compact / 3 comfortable, one on phones (`< 768px`)
- `Entry.tsx` — one label-rail entry (name + hint on the left, formulas + terse note on the right); `Examples.tsx` — worked examples; `Menu.tsx` — dropdown / phone bottom-sheet menus; `icons.tsx`
- Detail panel: clicking an entry opens `DetailPane.tsx`, docked on the right at ≥ 1100px, an overlay drawer from 768–1100px, full screen on phones. j/k or ↑/↓ step through entries, Esc / Back closes. The course and selected entry live in the URL hash (`#<code>`, `#<code>/<cardId>`, `#<code>/ex/<exampleId>`, via `parseHash` / `formatHash` in `paneModel.ts`); opening the panel pushes a history entry so Back closes it. `DetailPane` shrinks over-wide equations to fit (down to half size, then they scroll)
- `SheetViewer.tsx` — a course's Midterm / Final PDF full screen inside the site: Midterm/Final switch, zoom (−/Fit/+, keys `-` `=` `0`), page counter, open-in-new-tab and Download. Rendered with pdf.js (`pdfjs-dist` legacy build, for older mobile Safari) loaded on demand from `pdf.ts` (`loadSheet` caches documents); `prefetchPdf` warms it when a sheet link is hovered. URL hash `#<code>/sheet/<key>` (`sheetKey`: "Midterm Sheet" → `midterm`); it is an overlay like the detail panel, so Esc / Back closes it. Modified clicks on sheet links (Ctrl/⌘, middle) still open the raw PDF. Styles in `viewer.css` (prefix `sv-`)
- `Palette.tsx` — ⌘K / Ctrl+K or `/` searches every course (`buildIndex` / `search` in `paneModel.ts`); `paneIcons.tsx`, `Tex.tsx`
- CSS: `sheet.css` (prefix `sh-`, includes print styles), `pane.css` (prefix `ix-`, detail pane + palette), `inspector.css` (the panel's docked / drawer / phone placement). The `ix-` parts started life as a separate "Index" layout, hence the second prefix

Performance: KaTeX layout dominates (a big course is ~13k DOM nodes; one full layout costs hundreds of ms), so avoid anything that forces layout of every entry. `.sh-entry` / `.sh-ex` use `content-visibility: auto` (off-screen entries skip layout). `InspectorLayout` measures entry heights for pagination in a hidden, layout-isolated `.sh-measure` box (cloned entries, time-sliced), caches heights and fitted formula sizes per column geometry (cleared when course data changes), and passes them to `Entry` (`estH` → `contain-intrinsic-size`, `fit` → pre-fitted font sizes). Formulas are otherwise fitted lazily via an IntersectionObserver. Phones (one column) skip height measuring. `renderLatex` memoises its output.

Course grouping by `term` comes from `groupCourses` in `src/lib/courseGroups.ts`.

### Theme

`src/lib/theme.ts` holds a light/dark/system preference (`localStorage` `formula-ref:theme`) and writes the resolved theme to `<html data-theme>`; `index.html` sets it before first paint. Key dark styles off `:root[data-theme="dark"]`, never `prefers-color-scheme`. Use `useTheme()` / `toggleTheme()` for toggles.

### KaTeX

`src/lib/katex.ts` exports `renderLatex(tex, display?)` — wraps `katex.renderToString` with `throwOnError: false`. All formula rendering goes through this helper.
