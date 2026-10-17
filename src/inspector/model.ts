import type { Card, Section } from '@/types'

export type Density = 'compact' | 'comfortable'
export type Mode = 'formulas' | 'examples' | 'labs'

/* ── Labels ─────────────────────────────────────────────────────────────── */

/** "Mechanical Waves (Ch. 16–17)" → { title: "Mechanical Waves", ref: "Ch. 16–17" }.
 *  "Integration by Parts — Lab 1" → { title: "Integration by Parts", ref: "Lab 1" }. */
export function splitLabel(label: string): { title: string; ref: string } {
  let title = label.trim()
  let ref = ''
  const paren = title.match(/^(.*?)\s*\(([^)]*)\)\s*$/)
  if (paren) { title = paren[1]; ref = paren[2] }
  const lab = title.match(/^(.*?)\s+[—–-]\s+(Lab \d+)$/)
  if (lab) { title = lab[1]; ref = ref ? `${lab[2]} · ${ref}` : lab[2] }
  return { title, ref: ref.replace(/-/g, '–') }
}

/** Short name for the section index strip: drop the reference and any " — subtitle". */
export function shortLabel(label: string): string {
  return splitLabel(label).title.split(/\s+[—–]\s+/)[0]
}

/** The card tag is shown as a quiet hint only when it adds information. */
export function tagHint(card: Card): string {
  const tag = card.tag?.trim()
  if (!tag) return ''
  const t = card.title.toLowerCase()
  const words = tag.toLowerCase().split(/[\s/&,-]+/).filter(w => w.length > 2)
  if (words.length > 0 && words.every(w => t.includes(w))) return ''
  return tag
}

export const sortedCards = (s: Section) => [...s.cards].sort((a, b) => a.order - b.order)

/* ── Pagination ─────────────────────────────────────────────────────────────
 * The body is set as a run of "pages": each page is a balanced CSS multi-column
 * block roughly one viewport tall, so a screenful reads like a printed sheet
 * (down column 1, then 2, then 3) and scrolling stays monotonic. Sections flow
 * across columns and may continue onto the next page with a "cont." band. */

export interface FlowSection {
  id: string
  count: number      // visible entries
  wide: boolean      // contains a widget → gets its own full-width page
}

export interface Part { id: string; start: number; end: number; cont: boolean }
export interface Page { wide: boolean; parts: Part[] }

/** Heights in px: band (incl. top spacing) and each entry, per section id. */
export type Heights = Map<string, { band: number; items: number[] }>

const EST_BAND = 44
const EST_ITEM = 128

export function paginate(sections: FlowSection[], heights: Heights | null, cols: number, colH: number): Page[] {
  const pages: Page[] = []
  if (cols <= 1) {
    // Single column (mobile): one continuous flow, no pages.
    let flow: Part[] = []
    for (const s of sections) {
      if (s.wide) {
        if (flow.length) pages.push({ wide: false, parts: flow })
        pages.push({ wide: true, parts: [{ id: s.id, start: 0, end: s.count, cont: false }] })
        flow = []
      } else flow.push({ id: s.id, start: 0, end: s.count, cont: false })
    }
    if (flow.length) pages.push({ wide: false, parts: flow })
    return pages
  }

  const cap = cols * colH
  const used_: number[] = []
  let cur: Part[] = []
  let used = 0
  const flush = () => {
    if (cur.length) { pages.push({ wide: false, parts: cur }); used_[pages.length - 1] = used }
    cur = []; used = 0
  }

  for (const s of sections) {
    if (s.wide) {
      flush()
      pages.push({ wide: true, parts: [{ id: s.id, start: 0, end: s.count, cont: false }] })
      continue
    }
    if (s.count === 0) {
      // Empty section (edit mode): band only.
      if (used > 0 && used + EST_BAND > cap) flush()
      cur.push({ id: s.id, start: 0, end: 0, cont: false }); used += EST_BAND
      continue
    }
    const h = heights?.get(s.id)
    const band = h?.band ?? EST_BAND
    const item = (i: number) => h?.items[i] ?? EST_ITEM
    let i = 0
    let guard = 0
    while (i < s.count && guard++ < 1000) {
      const room = cap - used
      let take = 0
      let acc = band
      while (i + take < s.count && acc + item(i + take) <= room) { acc += item(i + take); take++ }
      const left = s.count - i - take
      if (left === 0) {
        cur.push({ id: s.id, start: i, end: s.count, cont: i > 0 }); used += acc; i = s.count
      } else if (used === 0) {
        // Fresh page and the section still overflows: fill this page, carry the rest over.
        // Avoid stranding a single entry on the next page.
        const n = Math.max(1, left === 1 ? take + 1 : take)
        cur.push({ id: s.id, start: i, end: i + n, cont: i > 0 })
        i += n
        flush()
      } else if (take >= 1 && ((take >= 2 && left >= 2) || used + band + item(i) < cap * 0.6)) {
        // Split the section across pages (only at comfortable points, unless this page
        // would otherwise be left mostly empty).
        cur.push({ id: s.id, start: i, end: i + take, cont: i > 0 })
        i += take
        flush()
      } else {
        flush()
      }
    }
  }
  flush()

  // A trailing page holding less than one column's worth would leave columns empty:
  // fold it into the previous page instead (that page simply runs a little longer).
  const out: Page[] = []
  const outUsed: number[] = []
  pages.forEach((p, i) => {
    const u = used_[i] ?? Infinity
    const prev = out[out.length - 1]
    const trailing = i === pages.length - 1 || pages[i + 1].wide
    if (!p.wide && prev && !prev.wide && trailing && u < colH) {
      for (const part of p.parts) {
        const last = prev.parts[prev.parts.length - 1]
        if (last && last.id === part.id && last.end === part.start) last.end = part.end
        else prev.parts.push(part)
      }
      outUsed[out.length - 1] += u
    } else {
      out.push({ wide: p.wide, parts: p.parts.map(x => ({ ...x })) })
      outUsed.push(u)
    }
  })
  return out
}

export const pagesKey = (pages: Page[]) =>
  pages.map(p => (p.wide ? 'W' : '') + p.parts.map(x => `${x.id}:${x.start}-${x.end}`).join(',')).join('|')

/* ── Per-viewer conveniences (browser storage, best effort) ─────────────── */

const DENSITY_KEY = 'formula-ref:sheet-density'

export function loadDensity(): Density {
  try { return localStorage.getItem(DENSITY_KEY) === 'comfortable' ? 'comfortable' : 'compact' } catch { return 'compact' }
}

export function saveDensity(d: Density) {
  try { localStorage.setItem(DENSITY_KEY, d) } catch { /* ignore */ }
}
