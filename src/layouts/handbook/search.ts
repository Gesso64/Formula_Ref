import type { Card, Course, Section, WorkedExample } from '@/types'

// ─── Text normalisation ─────────────────────────────────────────────────────
// Search is case-insensitive, treats "ε₀" like "ε0", and spells Greek letters
// out so that typing "omega" finds both `\omega` in LaTeX and "ω" in notes.

const GREEK: Record<string, string> = {
  α: 'alpha', β: 'beta', γ: 'gamma', δ: 'delta', ε: 'epsilon', ϵ: 'epsilon', ζ: 'zeta', η: 'eta',
  θ: 'theta', ϑ: 'theta', ι: 'iota', κ: 'kappa', λ: 'lambda', μ: 'mu', ν: 'nu', ξ: 'xi', π: 'pi',
  ρ: 'rho', σ: 'sigma', ς: 'sigma', τ: 'tau', υ: 'upsilon', φ: 'phi', ϕ: 'phi', χ: 'chi', ψ: 'psi',
  ω: 'omega',
}
const GREEK_RE = new RegExp(`[${Object.keys(GREEK).join('')}]`, 'g')
const NAME_TO_GREEK = new Map<string, string>()
for (const [ch, name] of Object.entries(GREEK)) if (!NAME_TO_GREEK.has(name)) NAME_TO_GREEK.set(name, ch)

function norm(s: string): string {
  return s.normalize('NFKD').toLowerCase()
}

function spellGreek(s: string): string {
  return s.replace(GREEK_RE, ch => ` ${GREEK[ch]} `)
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
}

/** Split a query into normalised terms ("ω" → "omega"). */
export function parseQuery(q: string): string[] {
  return spellGreek(norm(q)).split(/\s+/).filter(Boolean)
}

/** The literal strings to highlight in rendered text for a set of terms. */
export function highlightNeedles(terms: string[]): string[] {
  const out = new Set<string>()
  for (const t of terms) {
    out.add(t)
    const g = NAME_TO_GREEK.get(t)
    if (g) out.add(g)
  }
  return [...out]
}

function prose(s: string): string {
  const n = norm(s)
  return `${n} ${spellGreek(n)}`
}

/** LaTeX lines only match terms of 2+ characters, so a single letter doesn't hit every formula. */
export function latexHit(latex: string, terms: string[]): boolean {
  const n = norm(latex)
  return terms.some(t => t.length >= 2 && n.includes(t))
}

function cardLatex(card: Card): string[] {
  return [card.formula ?? '', ...(card.subs ?? []).map(s => s.latex)].filter(Boolean)
}

function cardText(card: Card): string {
  return prose([
    card.title, card.tag, stripHtml(card.notes ?? ''),
    ...(card.tableRows ?? []).flatMap(r => [r.symbol, r.value, r.quantity]),
  ].join(' '))
}

export function cardMatches(card: Card, terms: string[], sectionText = ''): boolean {
  if (!terms.length) return true
  const text = `${cardText(card)} ${sectionText}`
  const latex = cardLatex(card)
  return terms.every(t => text.includes(t) || (t.length >= 2 && latex.some(l => norm(l).includes(t))))
}

export function exampleMatches(ex: WorkedExample, terms: string[]): boolean {
  if (!terms.length) return true
  const text = prose([
    `q${ex.number}`, ex.title, ex.source, ex.topics.join(' '), ex.given.join(' '), ex.answer,
    ex.interpretation ?? '', ...ex.steps.map(s => s.text ?? ''),
  ].join(' '))
  const latex = ex.steps.map(s => s.latex ?? '').filter(Boolean)
  return terms.every(t => text.includes(t) || (t.length >= 2 && latex.some(l => norm(l).includes(t))))
}

// ─── Course shaping ─────────────────────────────────────────────────────────

export interface DocSection {
  section: Section
  num: number
  title: string
  ref: string | null
  cards: Card[]
  total: number
}

/** "Oscillations — SHM (Ch. 15)" → { title: "Oscillations — SHM", ref: "Ch. 15" } */
export function splitLabel(label: string): { title: string; ref: string | null } {
  const m = label.match(/^(.*\S)\s*\(([^()]+)\)\s*$/)
  return m ? { title: m[1], ref: m[2] } : { title: label, ref: null }
}

export function buildSections(course: Course, terms: string[]): DocSection[] {
  return [...course.sections]
    .sort((a, b) => a.order - b.order)
    .map((section, i) => {
      const cards = [...section.cards].sort((a, b) => a.order - b.order)
      const { title, ref } = splitLabel(section.label)
      const secText = terms.length ? prose(section.label) : ''
      return {
        section, num: i + 1, title, ref, total: cards.length,
        cards: terms.length ? cards.filter(c => cardMatches(c, terms, secText)) : cards,
      }
    })
}

export interface ExampleGroup {
  id: string
  label: string
  examples: WorkedExample[]
  total: number
}

export function slug(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function buildExampleGroups(course: Course, terms: string[]): ExampleGroup[] {
  const groups: ExampleGroup[] = []
  const byId = new Map<string, ExampleGroup>()
  const sorted = [...(course.examples ?? [])]
  for (const ex of sorted) {
    let g = byId.get(ex.source)
    if (!g) {
      g = { id: slug(ex.source), label: ex.source, examples: [], total: 0 }
      byId.set(ex.source, g)
      groups.push(g)
    }
    g.total++
    if (exampleMatches(ex, terms)) g.examples.push(ex)
  }
  return groups
}

// ─── Outline (shared by the left "Contents", right "On this page" and mobile sheet) ──

export interface OutlineItem { id: string; anchor: string; label: string }
export interface OutlineGroup {
  id: string
  anchor: string
  num: number
  label: string
  count: number
  items: OutlineItem[]
}
