import { useState, useMemo, useRef, useEffect, useEffectEvent, useCallback, type CSSProperties } from 'react'
import { useCourses } from '@/hooks/courseModel'
import { groupCourses } from '@/lib/courseGroups'
import { useTheme } from '@/lib/theme'
import { CardEditor } from '@/components/cards/CardEditor'
import { SectionEditor } from '@/components/courses/SectionEditor'
import { CourseEditor } from '@/components/courses/CourseEditor'
import type { Card, Course, Section } from '@/types'
import {
  type Density, type Mode, type FlowSection, type Page, type Heights,
  splitLabel, shortLabel, sortedCards, cardHaystack, exampleHaystack, queryTerms, matches,
  paginate, pagesKey, loadDensity, saveDensity,
} from './model'
import { Entry } from './Entry'
import { loadPins, savePins, type Pin } from './pins'
// The combined layouts (inspector, workspace) borrow Index's detail pane, palette and course rail.
import { DetailPane } from '@/layouts/index/DetailPane'
import { Palette } from '@/layouts/index/Palette'
import { CourseColumn } from '@/layouts/index/CourseColumn'
import { buildIndex, flattenCourse, formatHash, parseHash, type SearchDoc, type Selection } from '@/layouts/index/model'
import { loadCollapsed, saveCollapsed } from '@/lib/courseGroups'
import '@/layouts/index/IndexLayout.css'
import './combo.css'
import { ExampleBlock } from './Examples'
import { Menu, MenuHeading, MenuSep } from './Menu'
import {
  IconChevronDown, IconSearch, IconClose, IconMore, IconPencil, IconPlus, IconDownload, IconUpload,
  IconPrint, IconFile, IconArrowUpRight, IconCheck, IconDensityCompact, IconDensityComfortable, IconMark, IconSettings,
  IconSun, IconMoon, IconPin,
} from './icons'
import './sheet.css'

const MOBILE_BP = 768
const COL_GAP = 28
const SEC_GAP = 14 // matches .sh-sec + .sh-sec .sh-keep margin

/* ── Small hooks ─────────────────────────────────────────────────────────── */

function useViewport() {
  const [vp, setVp] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    let raf = 0
    const on = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setVp(p =>
        p.w === window.innerWidth && p.h === window.innerHeight ? p : { w: window.innerWidth, h: window.innerHeight }))
    }
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [])
  return vp
}

function useElementWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setW(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, w] as const
}

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

/** Typesetter's fit: shrink an overflowing formula (down to 80%) so it sits on the line;
 *  anything still wider scrolls inside its own box. `root` is one entry / example, or a list of them. */
function fitFormulas(roots: HTMLElement[], cache?: Map<string, string[]>) {
  const els = roots.flatMap(r => [...r.querySelectorAll<HTMLElement>('.sh-f')])
  els.forEach(el => { el.style.fontSize = '' })
  const ratios = els.map(el => (el.scrollWidth > el.clientWidth + 1 ? el.clientWidth / el.scrollWidth : 1))
  els.forEach((el, i) => {
    const r = ratios[i]
    if (r < 1) el.style.fontSize = `calc(var(--sh-fs-f) * ${Math.max(0.8, Math.floor(r * 100) / 100 - 0.01)})`
  })
  // Remember each entry's sizes so it renders already fitted next time (see Entry's `fit`).
  if (cache) for (const r of roots) {
    if (r.dataset.card) cache.set(r.dataset.card, [...r.querySelectorAll<HTMLElement>('.sh-f')].map(el => el.style.fontSize))
  }
}

/* Entries use content-visibility: auto, so the browser only lays out the ones near the viewport —
   KaTeX layout is the expensive part of this page. Measuring an entry forces its layout, so heights
   are cached per column geometry (an entry's height depends only on the column width, density and
   edit mode); a course or a width is measured once, and the cached heights double as each entry's
   contain-intrinsic-size so off-screen entries keep their real size. */
const HEIGHT_CACHES = new Map<string, Map<string, number>>()
const FIT_CACHES = new Map<string, Map<string, string[]>>()   // fitted .sh-f font sizes per entry
let cachedFor: unknown = null   // the courses array the caches were measured from
function sheetCache<T>(store: Map<string, Map<string, T>>, key: string, courses: Course[]) {
  if (cachedFor !== courses) { HEIGHT_CACHES.clear(); FIT_CACHES.clear(); cachedFor = courses }   // any edit re-measures
  let c = store.get(key)
  if (!c) {
    c = new Map()
    store.set(key, c)
    if (store.size > 8) store.delete(store.keys().next().value!)
  }
  return c
}

/** Measure every entry missing from the cache. Each is cloned into a hidden, layout-isolated box at the
 *  column width and fitted there, so measuring never re-balances the visible columns; the work is split
 *  into short slices so a first visit doesn't block the page. Resolves false if cancelled. */
async function measureEntries(root: HTMLElement, cache: Map<string, number>, fits: Map<string, string[]>, cancelled: () => boolean) {
  const missing = [...root.querySelectorAll<HTMLElement>('.sh-page:not(.sh-page--wide) [data-entry]')]
    .filter(el => !cache.has(el.dataset.card!))
  if (!missing.length) return !cancelled()
  const box = document.createElement('div')
  box.className = 'sh-measure'
  box.style.width = `${missing[0].getBoundingClientRect().width}px`
  root.appendChild(box)
  try {
    for (let i = 0; i < missing.length;) {
      if (cancelled()) return false
      const t0 = performance.now()
      do {
        const src = missing[i++]
        const clone = src.cloneNode(true) as HTMLElement
        clone.removeAttribute('style')
        box.appendChild(clone)
        fitFormulas([clone], fits)
        cache.set(src.dataset.card!, clone.offsetHeight)
        clone.remove()
      } while (i < missing.length && performance.now() - t0 < 24)
      await new Promise(r => setTimeout(r, 0))
    }
  } finally {
    box.remove()
  }
  return !cancelled()
}

function measureHeights(root: HTMLElement, cache: Map<string, number>): Heights {
  const map: Heights = new Map()
  root.querySelectorAll<HTMLElement>('[data-part]').forEach(part => {
    const id = part.dataset.sec!
    const start = Number(part.dataset.start)
    let rec = map.get(id)
    if (!rec) { rec = { band: 0, items: [] }; map.set(id, rec) }
    const band = part.querySelector<HTMLElement>('.sh-band')
    if (band) rec.band = Math.max(rec.band, band.offsetHeight + SEC_GAP)
    const entries = part.querySelectorAll<HTMLElement>('[data-entry]')
    entries.forEach((el, k) => { rec.items[start + k] = cache.get(el.dataset.card!) ?? el.offsetHeight })
    const add = part.querySelector<HTMLElement>('.sh-add')
    if (add && entries.length) rec.items[start + entries.length - 1] += add.offsetHeight
  })
  return map
}

/* ── Layout ──────────────────────────────────────────────────────────────── */

interface VisibleSection { section: Section; num: number; cards: Card[]; wide: boolean }

/** 'sheet' = the plain sheet; 'inspector' = sheet + docked detail panel; 'workspace' = course rail + focus view + My sheet. */
export type SheetVariant = 'sheet' | 'inspector' | 'workspace'

const EMPTY_NUMBERS = new Map<string, number>()

/** The course and (if it still exists) the entry a URL hash points at. */
function readHash(courses: Course[]): { courseId: string; sel: Selection | null } | null {
  const parsed = parseHash(window.location.hash, courses)
  if (!parsed) return null
  const { course, sel } = parsed
  const found = !!sel && flattenCourse(course).some(i => i.kind === sel.kind && i.id === sel.id)
  return { courseId: course.id, sel: found ? sel : null }
}
const DOCK_BP = 1100   // inspector docks beside the sheet at or above this width
const RAIL_BP = 1024   // workspace shows the course rail at or above this width

export default function SheetLayout({ variant = 'sheet' }: { variant?: SheetVariant }) {
  const { courses, activeCourse, setActiveCourseId, exportAll, importAll } = useCourses()
  const vp = useViewport()
  const mobile = vp.w < MOBILE_BP
  const { theme, toggle: toggleTheme } = useTheme()
  const combo = variant !== 'sheet'
  const isWorkspace = variant === 'workspace'
  const docked = variant === 'inspector' && vp.w >= DOCK_BP
  const railed = isWorkspace && vp.w >= RAIL_BP

  const [density, setDensity] = useState<Density>(loadDensity)
  const [editing, setEditing] = useState(false)
  const [query, setQuery] = useState('')
  const [mode, setMode] = useState<Mode>('formulas')
  const [jump, setJump] = useState<string | null>(null)
  const [flash, setFlash] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [inView, setInView] = useState<string[]>([])
  const [editCard, setEditCard] = useState<{ section: Section; card?: Card } | null>(null)
  const [editSection, setEditSection] = useState<{ section?: Section; order: number } | null>(null)
  const [editCourse, setEditCourse] = useState<{ course?: Course } | null>(null)
  // A deep link (#aer309/<cardId>) wins over the persisted active course on first render.
  const [linked] = useState(() => (combo ? readHash(courses) : null))
  const [insp, setInsp] = useState<{ courseId: string; sel: Selection | null } | null>(linked?.sel ? linked : null)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [pins, setPins] = useState<Pin[]>(loadPins)
  const [mySheet, setMySheet] = useState(false)
  const [collapsed, setCollapsed] = useState<Set<string>>(loadCollapsed)
  const [headH, setHeadH] = useState(92)

  const headRef = useRef<HTMLDivElement>(null)
  const stripRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const savedScroll = useRef<Record<Mode, number>>({ formulas: 0, examples: 0 })
  const flashTimer = useRef(0)
  const [sheetRef, sheetW] = useElementWidth<HTMLDivElement>()

  useEffect(() => {
    const el = headRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setHeadH(el.offsetHeight))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.add('sh-bodybg')
    return () => document.body.classList.remove('sh-bodybg')
  }, [])

  const course = activeCourse
  const editorOpen = !!(editCard || editSection || editCourse)
  const hasExamples = (course?.examples?.length ?? 0) > 0
  const effMode: Mode = hasExamples ? mode : 'formulas'
  const terms = useMemo(() => queryTerms(query), [query])
  const termsKey = terms.join(' ')

  /* Search haystacks for every course (cheap; recomputed only when data changes). */
  const hay = useMemo(() => {
    const m = new Map<string, string>()
    for (const c of courses) for (const s of c.sections) for (const card of s.cards) m.set(card.id, cardHaystack(card, s.label))
    return m
  }, [courses])

  const sections = useMemo(() => (course ? [...course.sections].sort((a, b) => a.order - b.order) : []), [course])

  const visible: VisibleSection[] = useMemo(() => {
    const t = termsKey ? termsKey.split(' ') : []
    return sections.map((section, i) => {
      const all = sortedCards(section)
      const cards = t.length ? all.filter(c => matches(hay.get(c.id) ?? '', t)) : all
      return { section, num: i + 1, cards, wide: all.some(c => c.type === 'widget') }
    })
  }, [sections, hay, termsKey])

  const shown = useMemo(
    () => visible.filter(v => v.cards.length > 0 || (editing && !termsKey)),
    [visible, editing, termsKey],
  )
  const byId = useMemo(() => new Map(shown.map(v => [v.section.id, v])), [shown])
  const matchCount = shown.reduce((n, v) => n + v.cards.length, 0)
  const totalCount = visible.reduce((n, v) => n + v.section.cards.length, 0)

  const flow: FlowSection[] = useMemo(
    () => shown.map(v => ({ id: v.section.id, count: v.cards.length, wide: v.wide })),
    [shown],
  )

  /* Matches in other courses (search is global, shown as a jump list). */
  const elsewhere = useMemo(() => {
    if (!termsKey || !course) return []
    const t = termsKey.split(' ')
    return courses.filter(c => c.id !== course.id).map(c => ({
      course: c,
      n: c.sections.reduce((n, s) => n + s.cards.filter(card => matches(hay.get(card.id) ?? '', t)).length, 0),
    })).filter(x => x.n > 0)
  }, [termsKey, courses, course, hay])

  /* Examples */
  const exampleNumbers = useMemo(() => new Map((course?.examples ?? []).map(e => [e.id, e.number])), [course])
  const exHay = useMemo(() => new Map((course?.examples ?? []).map(e => [e.id, exampleHaystack(e)])), [course])
  const shownExamples = useMemo(() => {
    const t = termsKey ? termsKey.split(' ') : []
    const all = [...(course?.examples ?? [])].sort((a, b) => a.number - b.number)
    return t.length ? all.filter(e => matches(exHay.get(e.id) ?? '', t)) : all
  }, [course, exHay, termsKey])

  /* Column geometry: each "page" is a balanced multi-column block about one screen tall. */
  const minCol = density === 'compact' ? 360 : 470
  const maxCols = density === 'compact' ? 4 : 3
  const cw = sheetW || vp.w - 56
  const cols = mobile ? 1 : Math.max(1, Math.min(maxCols, Math.floor((cw + COL_GAP) / (minCol + COL_GAP))))
  const colH = cols > 1 ? Math.max(460, vp.h - (editing ? 132 : 92) - 64) : 0
  const sig = `${density}|${editing}`
  const fitKey = `${cw}|${cols}|${density}`
  const hc = cols > 1 ? sheetCache(HEIGHT_CACHES, `${fitKey}|${editing}`, courses) : null
  const fc = sheetCache(FIT_CACHES, fitKey, courses)

  const [measured, setMeasured] = useState<{ flow: FlowSection[]; cols: number; colH: number; sig: string; pages: Page[] } | null>(null)
  const estimated = useMemo(() => paginate(flow, null, cols, colH), [flow, cols, colH])
  const pages = measured && measured.flow === flow && measured.cols === cols && measured.colH === colH && measured.sig === sig
    ? measured.pages
    : estimated

  /* Measure entry heights (multi-column only; a single column needs no pagination), then paginate.
     Waits for the KaTeX fonts so nothing measured with fallback fonts gets cached, and runs a beat
     after the last change so a window being resized isn't re-measured on every frame. */
  useEffect(() => {
    if (effMode !== 'formulas' || mySheet || !hc) return
    let cancelled = false
    let timer = 0
    const run = async () => {
      const root = sheetRef.current
      if (cancelled || !root || !await measureEntries(root, hc, fc, () => cancelled)) return
      const next = paginate(flow, measureHeights(root, hc), cols, colH)
      setMeasured(prev =>
        prev && prev.flow === flow && prev.cols === cols && prev.colH === colH && prev.sig === sig && pagesKey(prev.pages) === pagesKey(next)
          ? prev : { flow, cols, colH, sig, pages: next })
    }
    const schedule = () => { if (!cancelled) timer = window.setTimeout(() => void run(), 60) }
    if (!document.fonts || document.fonts.status === 'loaded') schedule()
    else document.fonts.ready.then(schedule)
    return () => { cancelled = true; window.clearTimeout(timer) }
  }, [flow, cols, colH, sig, effMode, mySheet, sheetRef, hc, fc])

  /* Fit formulas lazily, as entries (or worked examples) come near the viewport. */
  useEffect(() => {
    const root = sheetRef.current
    if (!root) return
    const io = new IntersectionObserver(recs => {
      const due = recs.filter(r => r.isIntersecting && (r.target as HTMLElement).dataset.fit !== fitKey).map(r => r.target as HTMLElement)
      if (!due.length) return
      fitFormulas(due, fc)
      due.forEach(el => { el.dataset.fit = fitKey })
    }, { rootMargin: '600px 0px' })
    root.querySelectorAll('[data-entry], [data-ex]').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [sheetRef, fitKey, fc, pages, effMode, shownExamples, mySheet, editing])

  /* Scroll-spy: which sections (or examples) are on screen. */
  useEffect(() => {
    let raf = 0
    const compute = () => {
      raf = 0
      const top = headRef.current?.getBoundingClientRect().bottom ?? 0
      const bottom = window.innerHeight
      const ids: string[] = []
      const sel = effMode === 'formulas' ? '.sh-root [data-part]' : '.sh-root [data-ex]'
      document.querySelectorAll<HTMLElement>(sel).forEach(el => {
        const r = el.getBoundingClientRect()
        const id = el.dataset.sec ?? el.dataset.ex ?? ''
        if (r.bottom > top + 24 && r.top < bottom - 24 && !ids.includes(id)) ids.push(id)
      })
      setInView(prev => (prev.join() === ids.join() ? prev : ids))
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(compute) }
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    raf = requestAnimationFrame(compute)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [effMode, pages, shownExamples])

  /* Keep the first in-view chip visible in the index strip. */
  useEffect(() => {
    const strip = stripRef.current
    if (!strip || !inView.length) return
    const chip = strip.querySelector<HTMLElement>(`[data-chip="${CSS.escape(inView[0])}"]`)
    if (!chip) return
    const l = chip.offsetLeft
    const r = l + chip.offsetWidth
    if (l < strip.scrollLeft + 8 || r > strip.scrollLeft + strip.clientWidth - 8) {
      strip.scrollTo({ left: Math.max(0, l - 16), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    }
  }, [inView])

  const flashEl = useCallback((id: string) => {
    setFlash(id)
    window.clearTimeout(flashTimer.current)
    flashTimer.current = window.setTimeout(() => setFlash(null), 1400)
  }, [])

  const scrollToEl = useCallback((el: Element) => {
    const target = () => Math.max(0, el.getBoundingClientRect().top + window.scrollY - (headRef.current?.offsetHeight ?? 0) - 10)
    window.scrollTo({ top: target(), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    // Entries rendered on the way can differ from their estimated size; settle on the real position.
    let n = 0
    const settle = () => {
      const y = target()
      if (Math.abs(window.scrollY - y) > 4 && n++ < 3) { window.scrollTo({ top: y }); window.setTimeout(settle, 80) }
    }
    if ('onscrollend' in window) window.addEventListener('scrollend', settle, { once: true })
    else setTimeout(settle, 700)
  }, [])

  const jumpToSection = (id: string) => {
    const el = document.querySelector(`.sh-root [data-part][data-sec="${CSS.escape(id)}"] .sh-band`)
    if (el) { scrollToEl(el); flashEl(id) }
  }
  const jumpToExample = (id: string) => {
    const el = document.getElementById(`sh-ex-${id}`)
    if (el) { scrollToEl(el); flashEl(id) }
  }

  /* Example link from an entry: switch view, then scroll once it has rendered. */
  useEffect(() => {
    if (!jump || effMode !== 'examples') return
    const raf = requestAnimationFrame(() => {
      const el = document.getElementById(`sh-ex-${jump}`)
      if (el) {
        const headH = headRef.current?.offsetHeight ?? 0
        window.scrollTo({ top: Math.max(0, el.getBoundingClientRect().top + window.scrollY - headH - 10) })
        flashEl(jump)
      }
      setJump(null)
    })
    return () => cancelAnimationFrame(raf)
  }, [jump, effMode, flashEl])

  /* Restore the scroll position of the view we return to. */
  const pendingRestore = useRef<number | null>(null)
  useEffect(() => {
    const y = pendingRestore.current
    if (y == null) return
    pendingRestore.current = null
    const raf = requestAnimationFrame(() => window.scrollTo({ top: y }))
    return () => cancelAnimationFrame(raf)
  }, [effMode])

  const switchMode = (m: Mode) => {
    if (mySheet) { setMySheet(false); setMode(m); window.scrollTo({ top: 0 }); return }
    if (m === effMode) return
    savedScroll.current[effMode] = window.scrollY
    pendingRestore.current = savedScroll.current[m]
    setMode(m)
  }

  const openExample = useCallback((id: string) => {
    savedScroll.current.formulas = window.scrollY
    setQuery('')
    setMode('examples')
    setJump(id)
  }, [])

  const switchCourse = (id: string, keepQuery = false) => {
    if (!keepQuery) setQuery('')
    setMySheet(false)
    setMode('formulas')
    setInView([])
    savedScroll.current = { formulas: 0, examples: 0 }
    setActiveCourseId(id)
    window.scrollTo({ top: 0 })
  }

  const changeDensity = (d: Density) => { setDensity(d); saveDensity(d) }

  const onEditCard = useCallback((card: Card) => {
    const section = course?.sections.find(s => s.cards.some(c => c.id === card.id))
    if (section) setEditCard({ section, card })
  }, [course])

  /* ── Combined layouts: inspector / focus view, palette, pins ─────────── */

  const items = useMemo(() => (combo && course ? flattenCourse(course) : []), [combo, course])
  const inspOpen = !!insp && !!course && insp.courseId === course.id
  const inspSel = inspOpen ? insp!.sel : null
  const inspIdx = inspSel ? items.findIndex(i => i.kind === inspSel.kind && i.id === inspSel.id) : -1
  const inspItem = inspIdx >= 0 ? items[inspIdx] : null

  /* Position among items of the same kind, so the formula count leaves out worked examples. */
  const inspPos = useMemo(() => {
    if (!inspItem) return null
    const peers = items.filter(i => i.kind === inspItem.kind)
    const n = peers.indexOf(inspItem) + 1
    return { text: `${n} / ${peers.length}`, label: `${inspItem.kind === 'card' ? 'Formula' : 'Worked example'} ${n} of ${peers.length}` }
  }, [items, inspItem])

  /* Opening the panel pushes a history entry (see the URL sync below), so closing goes back to it. */
  const closingInsp = useRef(false)
  const closeInsp = useCallback(() => {
    if (window.history.state?.shInsp) {
      if (!closingInsp.current) { closingInsp.current = true; window.history.back() }
    } else setInsp(null)
  }, [])

  const openCard = useCallback((card: Card) => {
    if (course) setInsp({ courseId: course.id, sel: { kind: 'card', id: card.id } })
  }, [course])

  const selectItem = useCallback((sel: Selection | null) => {
    if (course) setInsp({ courseId: course.id, sel })
  }, [course])

  /* Keep the selected entry visible in the sheet behind the panel: when the selection changes, and
     again whenever the columns reflow (the panel docking, a deep link, a resize) until the reader scrolls away. */
  const revealing = useRef<{ id: string; follow: boolean } | null>(null)
  useEffect(() => {
    const stop = () => { if (revealing.current) revealing.current.follow = false }
    const opts = { passive: true }
    window.addEventListener('wheel', stop, opts)
    window.addEventListener('touchmove', stop, opts)
    window.addEventListener('pointerdown', stop, opts)
    return () => {
      window.removeEventListener('wheel', stop)
      window.removeEventListener('touchmove', stop)
      window.removeEventListener('pointerdown', stop)
    }
  }, [])
  useEffect(() => {
    if (inspSel?.kind !== 'card' || mySheet || effMode !== 'formulas') { revealing.current = null; return }
    if (revealing.current?.id !== inspSel.id) revealing.current = { id: inspSel.id, follow: true }
    else if (!revealing.current.follow) return
    const el = document.querySelector(`.sh-root [data-card="${CSS.escape(inspSel.id)}"]`)
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < headH || r.bottom > window.innerHeight) scrollToEl(el)
  }, [inspSel, mySheet, effMode, headH, scrollToEl, pages])

  /* ── URL hash ↔ course + selected entry: #<code> · #<code>/<cardId> · #<code>/ex/<exampleId> ── */

  const pendingCourse = useRef<string | null>(linked?.courseId ?? null)   // held until that course is active
  const applyHash = useEffectEvent(() => {
    closingInsp.current = false
    const next = readHash(courses)
    if (!next) { setInsp(null); return }
    if (next.courseId !== course?.id) { pendingCourse.current = next.courseId; switchCourse(next.courseId) }
    setInsp(next.sel ? next : null)
  })
  const enterLinkedCourse = useEffectEvent(() => {
    if (pendingCourse.current && pendingCourse.current !== course?.id) switchCourse(pendingCourse.current)
  })

  useEffect(() => {
    if (!combo) return
    const prev = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'   // going back closes the panel; it must not move the sheet
    enterLinkedCourse()
    window.addEventListener('popstate', applyHash)
    window.addEventListener('hashchange', applyHash)
    return () => {
      window.history.scrollRestoration = prev
      window.removeEventListener('popstate', applyHash)
      window.removeEventListener('hashchange', applyHash)
    }
  }, [combo])

  useEffect(() => {
    if (!combo || !course) return
    if (pendingCourse.current) {
      if (pendingCourse.current !== course.id) return
      pendingCourse.current = null
    }
    const base = window.location.pathname + window.location.search
    const hash = formatHash(course, inspSel)
    if (window.location.hash === hash) return
    if (inspSel && !window.history.state?.shInsp) {
      window.history.replaceState(null, '', base + formatHash(course, null))
      window.history.pushState({ shInsp: true }, '', base + hash)
    } else {
      window.history.replaceState(inspSel ? window.history.state : null, '', base + hash)
    }
  }, [combo, course, inspSel])

  const searchIndex = useMemo(() => (combo ? buildIndex(courses) : []), [combo, courses])

  const pickResult = (doc: SearchDoc) => {
    setPaletteOpen(false)
    if (doc.course.id !== course?.id) switchCourse(doc.course.id)
    else if (mySheet) setMySheet(false)
    if (doc.kind === 'section' && doc.sectionId) {
      const id = doc.sectionId
      window.setTimeout(() => jumpToSection(id), 120)
    } else if (doc.sel) {
      setInsp({ courseId: doc.course.id, sel: doc.sel })
    }
  }

  const pinnedIds = useMemo(() => new Set(pins.map(p => p.cardId)), [pins])
  const togglePin = useCallback((card: Card) => {
    if (!course) return
    setPins(prev => {
      const next = prev.some(p => p.cardId === card.id)
        ? prev.filter(p => p.cardId !== card.id)
        : [...prev, { courseId: course.id, cardId: card.id }]
      savePins(next)
      return next
    })
  }, [course])
  const unpin = useCallback((card: Card) => {
    setPins(prev => { const next = prev.filter(p => p.cardId !== card.id); savePins(next); return next })
  }, [])

  /* Pinned entries resolved against current data, grouped by course then section. */
  const pinnedGroups = useMemo(() => {
    if (!isWorkspace) return []
    const ids = new Set(pins.map(p => p.cardId))
    const out: { course: Course; section: Section; cards: Card[] }[] = []
    for (const c of courses) {
      for (const sec of [...c.sections].sort((a, b) => a.order - b.order)) {
        const cards = sortedCards(sec).filter(card => ids.has(card.id))
        if (cards.length) out.push({ course: c, section: sec, cards })
      }
    }
    return out
  }, [isWorkspace, pins, courses])
  const pinCount = pinnedGroups.reduce((n, g) => n + g.cards.length, 0)

  const toggleGroup = (term: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(term)) next.delete(term); else next.add(term)
      saveCollapsed(next)
      return next
    })
  }

  /* Keyboard for the combined layouts: ⌘K / Ctrl+K palette; Esc, j/k and arrows in the detail view. */
  useEffect(() => {
    if (!combo) return
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPaletteOpen(o => !o); return }
      if (!inspOpen || paletteOpen || editorOpen || e.metaKey || e.ctrlKey || e.altKey) return
      if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable="true"]')) return
      const step = (d: number) => {
        e.preventDefault()
        const i = Math.max(0, Math.min(items.length - 1, (inspIdx < 0 ? -1 : inspIdx) + d))
        const it = items[i]
        if (it) selectItem({ kind: it.kind, id: it.id })
      }
      if (e.key === 'Escape') { e.preventDefault(); closeInsp() }
      else if (e.key === 'j' || e.key === 'ArrowDown' || (isWorkspace && e.key === 'ArrowRight')) step(1)
      else if (e.key === 'k' || e.key === 'ArrowUp' || (isWorkspace && e.key === 'ArrowLeft')) step(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [combo, inspOpen, paletteOpen, editorOpen, items, inspIdx, isWorkspace, selectItem, closeInsp])

  /* Keyboard: "/" focuses search (opens the palette in the combined layouts). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return
      e.preventDefault()
      if (combo) { setPaletteOpen(true); return }
      if (mobile) setSearchOpen(true)
      requestAnimationFrame(() => searchRef.current?.focus())
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobile, combo])

  const onImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    e.target.value = ''
    if (f) await importAll(f)
  }

  /* ── Render ──────────────────────────────────────────────────────────── */

  const groups = groupCourses(courses)
  const accentStyle = course ? {
    '--sh-acc': course.accent, '--sh-acc-bg-l': course.accentBg, '--sh-acc-fg-l': course.accentFg,
    '--sh-acc-bg-d': course.accentBgDark, '--sh-acc-fg-d': course.accentFgDark,
  } as CSSProperties : undefined

  const ixAccent = course ? {
    '--ix-a-l': course.accent, '--ix-a-d': course.accentFgDark,
    '--ix-abg-l': course.accentBg, '--ix-abg-d': course.accentBgDark,
    '--ix-afg-l': course.accentFg, '--ix-afg-d': course.accentFgDark,
  } as CSSProperties : undefined

  const rootCls = ['sh-root', `sh-${density}`, mobile ? 'sh-is-mobile' : 'sh-is-desktop', editing ? 'sh-is-editing' : '',
    `sh-v-${variant}`, docked && inspOpen ? 'sh-insp-docked' : '', railed ? 'sh-railed' : ''].join(' ')

  const courseMenu = (
    <Menu label="Choose course" sheet={mobile} className="sh-coursemenu"
      trigger={(p, open) => (
        <button type="button" {...p} className={`sh-course-btn${open ? ' is-open' : ''}`} aria-label={`Course: ${course?.code ?? 'none'}. Change course`}>
          <span className="sh-course-code">{course?.code ?? 'Courses'}</span>
          {!mobile && course && <span className="sh-course-name">{course.name}</span>}
          <IconChevronDown size={14} className="sh-course-chev" />
        </button>
      )}>
      {close => (
        <>
          {groups.map(g => (
            <div key={g.term} className="sh-menu-group" role="group" aria-label={g.term}>
              <MenuHeading>{g.term}</MenuHeading>
              {g.courses.map(c => (
                <button key={c.id} type="button" role="menuitemradio" aria-checked={c.id === course?.id}
                  className="sh-menu-item sh-menu-course" style={{ '--sh-dot': c.accent } as CSSProperties}
                  onClick={() => { close(); if (c.id !== course?.id) switchCourse(c.id) }}>
                  <span className="sh-menu-course-code">{c.code}</span>
                  <span className="sh-menu-course-name">{c.name}</span>
                  {c.id === course?.id && <IconCheck size={14} className="sh-menu-check" />}
                </button>
              ))}
            </div>
          ))}
          {editing && (
            <>
              <MenuSep />
              <button type="button" role="menuitem" className="sh-menu-item" onClick={() => { close(); setEditCourse({}) }}>
                <IconPlus size={14} /> New course
              </button>
            </>
          )}
        </>
      )}
    </Menu>
  )

  const sheetLinks = course?.sheets ?? []

  const overflowMenu = (
    <Menu label="More" align="end" sheet={mobile}
      trigger={(p) => (
        <button type="button" {...p} className="sh-iconbtn" aria-label="More options"><IconMore size={16} /></button>
      )}>
      {close => (
        <>
          {mobile && sheetLinks.length > 0 && (
            <>
              <MenuHeading>Printable PDF sheets</MenuHeading>
              {sheetLinks.map(s => (
                <a key={s.file} role="menuitem" className="sh-menu-item" target="_blank" rel="noopener noreferrer"
                  href={`${import.meta.env.BASE_URL}formula-sheets/${s.file}`} onClick={() => close()}>
                  <IconFile size={14} /> {s.label} <IconArrowUpRight size={12} className="sh-menu-trail" />
                </a>
              ))}
              <MenuSep />
            </>
          )}
          {mobile && (
            <>
              <MenuHeading>Density</MenuHeading>
              {(['compact', 'comfortable'] as Density[]).map(d => (
                <button key={d} type="button" role="menuitemradio" aria-checked={density === d} className="sh-menu-item"
                  onClick={() => { changeDensity(d); close() }}>
                  {d === 'compact' ? <IconDensityCompact size={14} /> : <IconDensityComfortable size={14} />}
                  {d === 'compact' ? 'Compact' : 'Comfortable'}
                  {density === d && <IconCheck size={14} className="sh-menu-trail" />}
                </button>
              ))}
              <MenuSep />
              <button type="button" role="menuitemcheckbox" aria-checked={editing} className="sh-menu-item"
                onClick={() => { setEditing(e => !e); close() }}>
                <IconPencil size={14} /> {editing ? 'Finish editing' : 'Edit mode'}
              </button>
              <MenuSep />
            </>
          )}
          {!mobile && (
            <button type="button" role="menuitem" className="sh-menu-item" onClick={() => { close(); window.print() }}>
              <IconPrint size={14} /> Print this sheet
            </button>
          )}
          <button type="button" role="menuitem" className="sh-menu-item" onClick={() => { close(); void exportAll() }}>
            <IconDownload size={14} /> Export all (JSON)
          </button>
          <button type="button" role="menuitem" className="sh-menu-item" onClick={() => { close(); fileRef.current?.click() }}>
            <IconUpload size={14} /> Import JSON…
          </button>
          <MenuSep />
          {course && (
            <button type="button" role="menuitem" className="sh-menu-item" onClick={() => { close(); setEditCourse({ course }) }}>
              <IconSettings size={14} /> Course details…
            </button>
          )}
          <button type="button" role="menuitem" className="sh-menu-item" onClick={() => { close(); setEditCourse({}) }}>
            <IconPlus size={14} /> New course…
          </button>
        </>
      )}
    </Menu>
  )

  const searchBox = (
    <div className="sh-search">
      <IconSearch size={15} className="sh-search-icon" />
      <input ref={searchRef} type="search" value={query} spellCheck={false} autoComplete="off"
        placeholder={effMode === 'examples' ? 'Search examples' : 'Search formulas, symbols…'}
        aria-label={effMode === 'examples' ? 'Search worked examples' : 'Search formulas'}
        onChange={e => { setQuery(e.target.value); window.scrollTo({ top: 0 }) }}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            if (query) setQuery('')
            else { e.currentTarget.blur(); setSearchOpen(false) }
          }
        }} />
      {query
        ? <span className="sh-search-count" aria-live="polite">{effMode === 'examples' ? shownExamples.length : matchCount}</span>
        : !mobile && <kbd className="sh-kbd" aria-hidden="true">/</kbd>}
      {query && (
        <button type="button" className="sh-search-clear" aria-label="Clear search" onClick={() => { setQuery(''); searchRef.current?.focus() }}>
          <IconClose size={13} />
        </button>
      )}
    </div>
  )

  const paletteTrigger = mobile ? (
    <button type="button" className="sh-iconbtn" aria-label="Search all courses" onClick={() => setPaletteOpen(true)}>
      <IconSearch size={16} />
    </button>
  ) : (
    <button type="button" className="sh-search sh-search--btn" onClick={() => setPaletteOpen(true)} aria-label="Search all courses">
      <IconSearch size={15} className="sh-search-icon" />
      <span className="sh-search-ph">Search all courses…</span>
      <kbd className="sh-kbd" aria-hidden="true">{/Mac|iPhone|iPad/.test(navigator.platform) ? '⌘K' : 'Ctrl K'}</kbd>
    </button>
  )

  const modeSwitch = (hasExamples || isWorkspace) && (
    <div className="sh-seg" role="group" aria-label="View">
      <button type="button" aria-pressed={!mySheet && effMode === 'formulas'} onClick={() => switchMode('formulas')}>Formulas</button>
      {hasExamples && (
        <button type="button" aria-pressed={!mySheet && effMode === 'examples'} onClick={() => switchMode('examples')}>
          {mobile || isWorkspace ? 'Examples' : 'Worked Examples'}
        </button>
      )}
      {isWorkspace && (
        <button type="button" aria-pressed={mySheet} onClick={() => { setMySheet(true); setInsp(null); window.scrollTo({ top: 0 }) }}>
          My sheet{pinCount > 0 && <span className="sh-seg-count">{pinCount}</span>}
        </button>
      )}
    </div>
  )

  return (
    <div className={rootCls} style={{ ...accentStyle, '--sh-head-h': `${headH}px` } as CSSProperties}>
      <input ref={fileRef} type="file" accept=".json,application/json" hidden onChange={onImport} />

      <div className="sh-head" ref={headRef}>
        {/* ── Top bar ── */}
        <header className="sh-bar">
          {mobile && searchOpen ? (
            <div className="sh-bar-search">
              {searchBox}
              <button type="button" className="sh-textbtn" onClick={() => { setSearchOpen(false); setQuery('') }}>Cancel</button>
            </div>
          ) : (
            <>
              {!mobile && !railed && (
                <a className="sh-mark" href={`${import.meta.env.BASE_URL}?layout=${variant}`} aria-label="Formula Ref home">
                  <IconMark size={18} /><span>Formula Ref</span>
                </a>
              )}
              {!railed && courseMenu}
              {!mobile && sheetLinks.length > 0 && (
                <nav className="sh-sheets" aria-label="Printable PDF sheets">
                  {sheetLinks.map(s => (
                    <a key={s.file} className="sh-sheet-link" target="_blank" rel="noopener noreferrer"
                      href={`${import.meta.env.BASE_URL}formula-sheets/${s.file}`} title={`${s.label} (PDF)`}>
                      <IconFile size={14} />{s.label.replace(/\s*Sheet$/i, '')}
                      <span className="sh-visually-hidden"> sheet, PDF, opens in new tab</span>
                    </a>
                  ))}
                </nav>
              )}
              <div className="sh-bar-spacer" />
              {modeSwitch}
              {combo ? paletteTrigger : mobile ? (
                <button type="button" className="sh-iconbtn" aria-label="Search" onClick={() => {
                  setSearchOpen(true); requestAnimationFrame(() => searchRef.current?.focus())
                }}>
                  <IconSearch size={16} />
                </button>
              ) : searchBox}
              {!mobile && (
                <div className="sh-seg sh-seg--icons" role="group" aria-label="Density">
                  <button type="button" aria-pressed={density === 'compact'} aria-label="Compact density" title="Compact"
                    onClick={() => changeDensity('compact')}><IconDensityCompact size={15} /></button>
                  <button type="button" aria-pressed={density === 'comfortable'} aria-label="Comfortable density" title="Comfortable"
                    onClick={() => changeDensity('comfortable')}><IconDensityComfortable size={15} /></button>
                </div>
              )}
              {!mobile && !railed && (
                <button type="button" className={`sh-textbtn sh-editbtn${editing ? ' is-on' : ''}`} aria-pressed={editing}
                  onClick={() => setEditing(e => !e)}>
                  <IconPencil size={14} />{editing ? 'Done' : 'Edit'}
                </button>
              )}
              {!railed && <button type="button" className="sh-iconbtn" onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'} title="Toggle light/dark theme">
                {theme === 'dark' ? <IconSun size={16} /> : <IconMoon size={16} />}
              </button>}
              {overflowMenu}
            </>
          )}
        </header>

        {/* ── Section index strip ── */}
        {course && !mySheet && (
          <nav className="sh-strip" aria-label={effMode === 'formulas' ? 'Sections' : 'Worked examples'}>
            <div className="sh-strip-inner" ref={stripRef}>
              {effMode === 'formulas'
                ? visible.map(v => {
                    const on = byId.has(v.section.id)
                    return (
                      <button key={v.section.id} type="button" data-chip={v.section.id}
                        className={`sh-chip${inView.includes(v.section.id) ? ' is-active' : ''}`}
                        disabled={!on} title={v.section.label}
                        onClick={() => jumpToSection(v.section.id)}>
                        <span className="sh-chip-num">{v.num}</span>{shortLabel(v.section.label)}
                        {termsKey && on && <span className="sh-chip-count">{v.cards.length}</span>}
                      </button>
                    )
                  })
                : shownExamples.map(ex => (
                    <button key={ex.id} type="button" data-chip={ex.id} title={ex.title}
                      className={`sh-chip sh-chip--q${inView.includes(ex.id) ? ' is-active' : ''}`}
                      onClick={() => jumpToExample(ex.id)}>
                      <span className="sh-chip-num">Q{ex.number}</span>
                      <span className="sh-chip-qt">{ex.title}</span>
                    </button>
                  ))}
            </div>
          </nav>
        )}

        {editing && course && (
          <div className="sh-editbar" role="region" aria-label="Edit mode">
            <span className="sh-editbar-label"><IconPencil size={13} /> Editing {course.code}</span>
            <span className="sh-editbar-hint">Select any entry to edit it. Changes are saved in this browser.</span>
            <div className="sh-editbar-actions">
              <button type="button" className="sh-textbtn" onClick={() => setEditCourse({ course })}>Course details</button>
              <button type="button" className="sh-textbtn" onClick={() => setEditSection({ order: sections.length })}>
                <IconPlus size={13} />Section
              </button>
              <button type="button" className="sh-textbtn sh-textbtn--solid" onClick={() => setEditing(false)}>Done</button>
            </div>
          </div>
        )}
      </div>

      {/* ── Sheet body ── */}
      <main className="sh-main" ref={sheetRef}>
        {!course ? (
          <div className="sh-empty">
            <p>No course yet.</p>
            <button type="button" className="sh-textbtn sh-textbtn--solid" onClick={() => setEditCourse({})}>
              <IconPlus size={13} />New course
            </button>
          </div>
        ) : mySheet ? (
          <>
            <div className="sh-titleblock">
              <div className="sh-tb-row">
                <h1 className="sh-tb-name sh-tb-name--solo">My sheet</h1>
                <span className="sh-tb-kind">{pinCount} pinned {pinCount === 1 ? 'entry' : 'entries'}</span>
                {pinCount > 0 && (
                  <button type="button" className="sh-textbtn sh-mysheet-print" onClick={() => window.print()}>
                    <IconPrint size={14} />Print
                  </button>
                )}
              </div>
              <div className="sh-tb-meta"><span>Formulas pinned from any course, kept in this browser.</span></div>
            </div>
            {pinCount === 0 ? (
              <div className="sh-noresults">
                <p>Nothing pinned yet. Use <strong>Pin</strong> on any entry to collect formulas from every course on one sheet.</p>
              </div>
            ) : (
              <div className="sh-page" style={{ columnCount: cols }}>
                {pinnedGroups.map(g => {
                  const { title } = splitLabel(g.section.label)
                  const entry = (c: Card) => (
                    <Entry key={c.id} card={c} editing={false} onEdit={onEditCard} exampleNumbers={EMPTY_NUMBERS}
                      onExample={openExample} pinned onPin={unpin} />
                  )
                  return (
                    <section key={g.section.id} className="sh-sec" aria-label={`${g.course.code} ${title}`}>
                      <div className="sh-keep">
                        <header className="sh-band">
                          <span className="sh-band-num sh-band-code">{g.course.code}</span>
                          <h2 className="sh-band-title">{title}</h2>
                        </header>
                        {entry(g.cards[0])}
                      </div>
                      {g.cards.slice(1).map(entry)}
                    </section>
                  )
                })}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="sh-titleblock">
              <div className="sh-tb-row">
                <span className="sh-tb-code">{course.code}</span>
                <h1 className="sh-tb-name">{course.name}</h1>
                <span className="sh-tb-kind">{effMode === 'formulas' ? 'Formula sheet' : 'Worked examples'}</span>
              </div>
              <div className="sh-tb-meta">
                {course.description && <span>{course.description}</span>}
                {effMode === 'formulas'
                  ? <span>{sections.length} sections · {totalCount} entries</span>
                  : <span>{course.examples!.length} problems{course.examples![0]?.source ? ` · ${course.examples![0].source}` : ''}</span>}
                {course.term && <span className="sh-tb-term">{course.term}</span>}
              </div>
            </div>

            {effMode === 'formulas' ? (
              <>
                {pages.map((page, pi) => (
                  <div key={pi} className={`sh-page${page.wide ? ' sh-page--wide' : ''}`}
                    style={{ columnCount: page.wide ? 1 : cols }}>
                    {page.parts.map(part => {
                      const v = byId.get(part.id)
                      if (!v) return null
                      const { title, ref } = splitLabel(v.section.label)
                      const cards = v.cards.slice(part.start, part.end)
                      const entry = (c: Card) => (
                        <Entry key={c.id} card={c} editing={editing} onEdit={onEditCard} estH={hc?.get(c.id)} fit={fc.get(c.id)} fitKey={fitKey}
                          exampleNumbers={exampleNumbers} onExample={openExample}
                          onOpen={combo ? openCard : undefined} selected={inspSel?.kind === 'card' && inspSel.id === c.id}
                          pinned={pinnedIds.has(c.id)} onPin={isWorkspace ? togglePin : undefined} />
                      )
                      return (
                        <section key={`${part.id}-${part.start}`} className="sh-sec" data-part="" data-sec={part.id}
                          data-start={part.start} aria-label={`${v.num}. ${title}${part.cont ? ' (continued)' : ''}`}>
                          <div className="sh-keep">
                            <header className={`sh-band${flash === part.id && !part.cont ? ' sh-flash' : ''}`}>
                              <span className="sh-band-num">{v.num}</span>
                              <h2 className="sh-band-title">{title}</h2>
                              <span className="sh-band-ref">{part.cont ? 'continued' : ref}</span>
                              {editing && !part.cont && (
                                <button type="button" className="sh-band-edit" aria-label={`Edit section “${title}”`}
                                  onClick={() => setEditSection({ section: v.section, order: v.section.order })}>
                                  <IconPencil size={13} />
                                </button>
                              )}
                            </header>
                            {cards[0] && entry(cards[0])}
                          </div>
                          {cards.slice(1).map(entry)}
                          {editing && part.end === v.cards.length && !termsKey && (
                            <button type="button" className="sh-add" onClick={() => setEditCard({ section: v.section })}>
                              <IconPlus size={13} />Add entry
                            </button>
                          )}
                        </section>
                      )
                    })}
                  </div>
                ))}

                {termsKey && matchCount === 0 && (
                  <div className="sh-noresults">
                    <p>No entries in {course.code} match “{query.trim()}”.</p>
                    <button type="button" className="sh-textbtn" onClick={() => setQuery('')}>Clear search</button>
                  </div>
                )}

                {elsewhere.length > 0 && (
                  <div className="sh-also">
                    <span className="sh-also-label">Also matches in</span>
                    {elsewhere.map(x => (
                      <button key={x.course.id} type="button" className="sh-also-item" onClick={() => switchCourse(x.course.id, true)}>
                        <span className="sh-also-code">{x.course.code}</span>{x.n}
                      </button>
                    ))}
                  </div>
                )}

                {editing && !termsKey && (
                  <button type="button" className="sh-add sh-add--section" onClick={() => setEditSection({ order: sections.length })}>
                    <IconPlus size={13} />Add section
                  </button>
                )}
              </>
            ) : (
              <div className="sh-examples">
                {shownExamples.map(ex => <ExampleBlock key={ex.id} ex={ex} flash={flash === ex.id} />)}
                {shownExamples.length === 0 && (
                  <div className="sh-noresults">
                    <p>No worked examples match “{query.trim()}”.</p>
                    <button type="button" className="sh-textbtn" onClick={() => setQuery('')}>Clear search</button>
                  </div>
                )}
              </div>
            )}

            <footer className="sh-colophon">
              {course.code} · {course.name} — {effMode === 'formulas' ? 'formula sheet' : 'worked examples'}
            </footer>
          </>
        )}
      </main>

      {/* ── Workspace course rail (Index's course column) ── */}
      {railed && (
        <div className="ix-root sh-rail" style={ixAccent}>
          <CourseColumn courses={courses} activeCourseId={course?.id ?? null} onSelectCourse={id => switchCourse(id)}
            collapsed={collapsed} onToggleGroup={toggleGroup} onOpenSearch={() => setPaletteOpen(true)}
            editMode={editing} onToggleEdit={() => setEditing(e => !e)}
            onExport={() => void exportAll()} onImport={() => fileRef.current?.click()}
            onNewCourse={() => setEditCourse({})} onEditCourse={c => setEditCourse({ course: c })} />
        </div>
      )}

      {/* ── Inspector (docked panel / drawer) or focus view (Index's detail pane) ── */}
      {combo && course && inspOpen && (
        <>
          {!docked && <div className="sh-insp-scrim" onClick={closeInsp} />}
          <aside className={`ix-root sh-insp ${isWorkspace ? 'sh-insp--focus' : docked ? 'sh-insp--dock' : 'sh-insp--drawer'}`}
            style={ixAccent} aria-label="Formula detail" role={docked ? undefined : 'dialog'}>
            <DetailPane course={course} items={items} index={inspIdx} onSelect={selectItem}
              position={inspPos?.text} positionLabel={inspPos?.label}
              headExtra={
                <>
                  {isWorkspace && inspItem?.kind === 'card' && (
                    <button type="button" className={`sh-insp-pin${pinnedIds.has(inspItem.id) ? ' is-on' : ''}`}
                      aria-pressed={pinnedIds.has(inspItem.id)} onClick={() => togglePin(inspItem.card)}>
                      <IconPin size={14} />{pinnedIds.has(inspItem.id) ? 'Pinned' : 'Pin'}
                    </button>
                  )}
                  <button type="button" className="sh-insp-close" aria-label="Close" title="Close (Esc)" onClick={closeInsp}>
                    <IconClose size={15} />
                  </button>
                </>
              }
              onOverview={() => selectItem(null)}
              onJumpSection={sec => { if (!docked) closeInsp(); jumpToSection(sec.id) }}
              editMode={editing} onEditCard={(card, section) => setEditCard({ section, card })}
              onEditCourse={c => setEditCourse({ course: c })} />
          </aside>
        </>
      )}

      {/* ── Command palette across all courses ── */}
      {combo && paletteOpen && course && (
        <div className="ix-root sh-ixportal" style={ixAccent}>
          <Palette index={searchIndex} activeCourseId={course.id} activeCourseCode={course.code}
            onPick={pickResult} onClose={() => setPaletteOpen(false)} />
        </div>
      )}

      {/* ── Editors (existing modals) ── */}
      {editCard && course && (
        <CardEditor courseId={course.id} section={editCard.section} card={editCard.card} onClose={() => setEditCard(null)} />
      )}
      {editSection && course && (
        <SectionEditor courseId={course.id} section={editSection.section} order={editSection.order} onClose={() => setEditSection(null)} />
      )}
      {editCourse && (
        <CourseEditor course={editCourse.course} onClose={() => setEditCourse(null)} />
      )}
    </div>
  )
}
