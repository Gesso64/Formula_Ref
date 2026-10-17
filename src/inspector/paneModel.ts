import type { Card, Course, FormulaSheet, PracticeLab, Section, WorkedExample } from '@/types'
import { markdownText } from '@/lib/markdown'

export const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent)

/* ── Selection ─────────────────────────────────────────────────────────── */

export type ItemKind = 'card' | 'example'
export interface Selection { kind: ItemKind; id: string }

export type ListItem =
  | { kind: 'card'; id: string; card: Card; section: Section }
  | { kind: 'example'; id: string; example: WorkedExample }

export function sortedSections(course: Course): Section[] {
  return [...(course.sections ?? [])].sort((a, b) => a.order - b.order)
}

export function sortedCards(section: Section): Card[] {
  return [...section.cards].sort((a, b) => a.order - b.order)
}

/** Every selectable item of a course in on-screen order (formulas, then worked examples). */
export function flattenCourse(course: Course): ListItem[] {
  const out: ListItem[] = []
  for (const section of sortedSections(course))
    for (const card of sortedCards(section)) out.push({ kind: 'card', id: card.id, card, section })
  for (const example of course.examples ?? []) out.push({ kind: 'example', id: example.id, example })
  return out
}

/* ── Formula sheet PDFs ────────────────────────────────────────────────── */

/** "Midterm Sheet" → "midterm": the sheet's name in the URL hash. */
export function sheetKey(sheet: FormulaSheet): string {
  return sheet.label.toLowerCase().replace(/\s*sheet\s*$/, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || sheet.file.replace(/\.pdf$/i, '')
}

/** Start fetching pdf.js (SheetViewer's renderer) early, e.g. when a sheet link is hovered. */
export const prefetchPdf = () => { void import('./pdf') }

export const sheetUrl = (sheet: FormulaSheet) => `${import.meta.env.BASE_URL}formula-sheets/${sheet.file}`

/** A practice set's printable PDF, a path under public/. */
export const labPdfUrl = (lab: PracticeLab) => (lab.pdf ? `${import.meta.env.BASE_URL}${lab.pdf}` : null)

/** A practice set's display name ("Set 3", "Practice midterm") and its strip-chip badge. */
export const labHeading = (lab: PracticeLab) => lab.heading ?? `Set ${lab.number}`
export const labShort = (lab: PracticeLab) => lab.short ?? String(lab.number)

/** A public/ asset path (practice figures) as a URL under the app's base. */
export const assetUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

/* ── URL hash: #<code>/<cardId> · #<code>/ex/<exampleId> · #<code>/sheet/<key> · #<code>/set/<n> (old links: /lab/<n>) · #<code> ── */

export function courseSlug(course: Course): string {
  return (course.code || course.id).toLowerCase().replace(/[^a-z0-9-]+/g, '-')
}

export interface HashState { course: Course; sel: Selection | null; sheet: FormulaSheet | null; lab: number | null }

export function parseHash(hash: string, courses: Course[]): HashState | null {
  const raw = decodeURIComponent(hash.replace(/^#\/?/, ''))
  if (!raw) return null
  const [slug, a, b] = raw.split('/')
  const course = courses.find(c => courseSlug(c) === slug.toLowerCase() || c.id === slug)
  if (!course) return null
  const none = { course, sel: null, sheet: null, lab: null }
  if (a === 'sheet' && b) return { ...none, sheet: course.sheets?.find(s => sheetKey(s) === b) ?? null }
  if ((a === 'set' || a === 'lab') && b) return { ...none, lab: course.labs?.find(l => String(l.number) === b)?.number ?? null }
  if (a === 'ex' && b) return { ...none, sel: { kind: 'example', id: b } }
  if (a) return { ...none, sel: { kind: 'card', id: a } }
  return none
}

/** `lab` is the practice lab on screen (Labs view), used when nothing else is open. */
export function formatHash(course: Course, sel: Selection | null, sheet: FormulaSheet | null = null, lab: number | null = null): string {
  const slug = courseSlug(course)
  if (sheet) return `#${slug}/sheet/${sheetKey(sheet)}`
  if (!sel) return lab != null ? `#${slug}/set/${lab}` : `#${slug}`
  return sel.kind === 'example' ? `#${slug}/ex/${encodeURIComponent(sel.id)}` : `#${slug}/${encodeURIComponent(sel.id)}`
}

/* ── Text helpers ──────────────────────────────────────────────────────── */

export function stripHtml(html: string): string {
  return html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/\s+/g, ' ').trim()
}

/** "Oscillations — Simple Harmonic Motion (Ch. 15)" → { main: "Oscillations — Simple Harmonic Motion", aside: "Ch. 15" } */
export function splitSectionLabel(label: string): { main: string; aside: string } {
  const m = label.match(/^(.*?)\s*\(([^()]*)\)\s*$/)
  return m ? { main: m[1], aside: m[2] } : { main: label, aside: '' }
}

/** LaTeX for a compact one-line preview of a card (or null when it has no formula). */
export function previewTex(card: Card): string | null {
  const tex = card.formula || card.subs?.[0]?.latex
  if (!tex) return null
  return '\\textstyle ' + tex
    .replace(/\\dfrac/g, '\\frac')
    .replace(/\\displaystyle/g, '')
    .replace(/\\\\/g, '\\quad ')
}

/** Formulas shown in the detail pane's equation block, in order. */
export function cardEquations(card: Card): { tex: string; main: boolean }[] {
  const eqs: { tex: string; main: boolean }[] = []
  if (card.formula) eqs.push({ tex: card.formula, main: true })
  for (const s of card.subs ?? []) if (s.latex.trim()) eqs.push({ tex: s.latex, main: false })
  return eqs
}

/* ── Search ────────────────────────────────────────────────────────────── */

const GREEK: Record<string, string> = {
  α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'epsilon', ζ: 'zeta', η: 'eta', θ: 'theta', κ: 'kappa',
  λ: 'lambda', μ: 'mu', ν: 'nu', ξ: 'xi', π: 'pi', ρ: 'rho', σ: 'sigma', τ: 'tau', φ: 'phi', χ: 'chi',
  ψ: 'psi', ω: 'omega', Γ: 'gamma', Δ: 'delta', Θ: 'theta', Λ: 'lambda', Σ: 'sigma', Φ: 'phi', Ψ: 'psi', Ω: 'omega',
}

function normalise(s: string): string {
  return s
    .replace(/[α-ωΑ-Ω]/g, ch => ` ${GREEK[ch] ?? ch} `)
    .toLowerCase()
    .replace(/\\(var)?([a-z]+)/g, ' $2 ')   // \omega → omega, \varepsilon → epsilon
    .replace(/[{}_^$\\]/g, ' ')
    .replace(/\s+/g, ' ')
}

export type ResultKind = 'card' | 'example' | 'lab' | 'section' | 'course'

export interface SearchDoc {
  key: string
  kind: ResultKind
  course: Course
  title: string
  context: string          // section label / example source
  tag: string
  preview: string | null   // LaTeX for the palette preview strip
  sel: Selection | null
  sectionId?: string
  lab?: { number: number; problemId: string | null }
  t: string                // normalised title
  meta: string             // normalised tag + section + course
  body: string             // normalised notes + latex
}

export function buildIndex(courses: Course[]): SearchDoc[] {
  const docs: SearchDoc[] = []
  for (const course of courses) {
    const courseMeta = normalise(`${course.code} ${course.name}`)
    docs.push({
      key: `course:${course.id}`, kind: 'course', course, title: `${course.code} · ${course.name}`,
      context: course.term ?? '', tag: '', preview: null, sel: null,
      t: courseMeta, meta: normalise(course.description), body: '',
    })
    for (const section of sortedSections(course)) {
      docs.push({
        key: `section:${section.id}`, kind: 'section', course, title: splitSectionLabel(section.label).main,
        context: `${section.cards.length} formula${section.cards.length === 1 ? '' : 's'}`, tag: '', preview: null,
        sel: null, sectionId: section.id, t: normalise(section.label), meta: courseMeta, body: '',
      })
      for (const card of sortedCards(section)) {
        const tex = [card.formula ?? '', ...(card.subs ?? []).map(s => s.latex)].join(' ')
        const table = (card.tableRows ?? []).map(r => `${r.symbol} ${r.value} ${r.quantity}`).join(' ')
        docs.push({
          key: `card:${card.id}`, kind: 'card', course, title: card.title, context: splitSectionLabel(section.label).main,
          tag: card.tag, preview: previewTex(card), sel: { kind: 'card', id: card.id },
          t: normalise(card.title),
          meta: normalise(`${card.tag} ${section.label} ${courseMeta}`),
          body: normalise(`${stripHtml(card.notes ?? '')} ${table} ${tex}`),
        })
      }
    }
    for (const ex of course.examples ?? []) {
      const tex = ex.steps.map(s => `${s.text ?? ''} ${s.latex ?? ''}`).join(' ')
      docs.push({
        key: `example:${ex.id}`, kind: 'example', course, title: ex.title, context: `Q${ex.number} · ${ex.source}`,
        tag: ex.topics.join(', '), preview: null, sel: { kind: 'example', id: ex.id },
        t: normalise(`q${ex.number} ${ex.title}`),
        meta: normalise(`${ex.topics.join(' ')} ${ex.source} worked example ${courseMeta}`),
        body: normalise(`${ex.given.join(' ')} ${tex} ${ex.answer}`),
      })
    }
    for (const lab of course.labs ?? []) {
      const head = labHeading(lab)
      const labMeta = normalise(`${head} practice ${lab.title} ${lab.ref} ${courseMeta}`)
      docs.push({
        key: `lab:${lab.id}`, kind: 'lab', course, title: `${head} · ${lab.title}`,
        context: `Practice set · ${lab.problems.length} problems`, tag: lab.ref, preview: null, sel: null,
        lab: { number: lab.number, problemId: null },
        t: normalise(`${head} ${lab.title}`), meta: labMeta, body: normalise(markdownText(`${lab.blurb} ${lab.intro}`)),
      })
      for (const p of lab.problems) {
        const firstMath = p.statement.match(/\$\$?([^$]+)\$/)?.[1]
        docs.push({
          key: `lab:${p.id}`, kind: 'lab', course, title: `${head} ${p.label} · ${plainTex(p.method) || lab.title}`,
          context: lab.title, tag: lab.ref, preview: firstMath ? `\\textstyle ${firstMath}` : null, sel: null,
          lab: { number: lab.number, problemId: p.id },
          t: normalise(`${head} ${p.label} ${p.method}`), meta: labMeta,
          body: normalise(markdownText(`${p.statement} ${p.solution}`)),
        })
      }
    }
  }
  return docs
}

const KIND_BONUS: Record<ResultKind, number> = { course: 6, section: 3, card: 2, example: 0, lab: 0 }

/** "integrating factor $\mu(y) = y^3$" → "integrating factor μ(y) = y^3", for result titles. */
function plainTex(s: string): string {
  const greek: Record<string, string> = { mu: 'μ', lambda: 'λ', alpha: 'α', beta: 'β', theta: 'θ', nabla: '∇', delta: 'δ', omega: 'ω' }
  return s.replace(/\$/g, '').replace(/\\([a-zA-Z]+)/g, (_, w: string) => greek[w] ?? (w === 'cdot' ? '·' : w === 'times' ? '×' : ''))
    .replace(/\\[,;! ]/g, ' ').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim()
}

export function search(index: SearchDoc[], query: string, activeCourseId: string | null, limit = 60): SearchDoc[] {
  const terms = normalise(query).split(' ').filter(Boolean)
  if (!terms.length) return []
  const scored: { doc: SearchDoc; score: number }[] = []
  for (const doc of index) {
    let score = 0
    let ok = true
    for (const term of terms) {
      const re = new RegExp(`(^|[^a-z0-9])${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`)
      if (doc.t.startsWith(term)) score += 30
      else if (re.test(doc.t)) score += 20
      else if (doc.t.includes(term)) score += 12
      else if (re.test(doc.meta)) score += 8
      else if (doc.meta.includes(term)) score += 5
      else if (re.test(doc.body)) score += 4
      else if (doc.body.includes(term)) score += 2
      else { ok = false; break }
    }
    if (!ok) continue
    if (doc.course.id === activeCourseId) score += 4
    score += KIND_BONUS[doc.kind]
    scored.push({ doc, score })
  }
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map(s => s.doc)
}
