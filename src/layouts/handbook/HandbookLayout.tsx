import { useCallback, useDeferredValue, useEffect, useMemo, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react'
import { useCourses } from '@/hooks/courseModel'
import { CardEditor } from '@/components/cards/CardEditor'
import { SectionEditor } from '@/components/courses/SectionEditor'
import { CourseEditor } from '@/components/courses/CourseEditor'
import type { Card, Course, Section } from '@/types'
import {
  buildExampleGroups, buildSections, highlightNeedles, parseQuery,
  type DocSection, type OutlineGroup,
} from './search'
import { FormulaDoc, ExampleDoc } from './Doc'
import { CourseNav, ModeSwitch, Outline, RailFooter, SearchField, SheetLinks, type Mode } from './Rails'
import { Icon } from './Icon'
import './handbook.css'

// ─── Small hooks ────────────────────────────────────────────────────────────

function useMedia(query: string): boolean {
  return useSyncExternalStore(
    cb => { const m = window.matchMedia(query); m.addEventListener('change', cb); return () => m.removeEventListener('change', cb) },
    () => window.matchMedia(query).matches,
  )
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function isTypingTarget(t: EventTarget | null) {
  const el = t as HTMLElement | null
  return !!el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)
}

// ─── Root ───────────────────────────────────────────────────────────────────

export default function HandbookLayout() {
  const { courses, activeCourse, setActiveCourseId, exportAll, importAll } = useCourses()
  const [editMode, setEditMode] = useState(false)
  const [courseEditor, setCourseEditor] = useState<{ course?: Course } | null>(null)
  const isMobile = useMedia('(max-width: 767px)')

  useEffect(() => {
    document.body.classList.add('hb-body')
    return () => document.body.classList.remove('hb-body')
  }, [])

  const selectCourse = useCallback((id: string) => {
    setActiveCourseId(id)
    window.scrollTo({ top: 0 })
  }, [setActiveCourseId])

  const shared = {
    courses, editMode, setEditMode, isMobile,
    onSelectCourse: selectCourse,
    onNewCourse: () => setCourseEditor({}),
    onEditCourse: (course: Course) => setCourseEditor({ course }),
    onExport: () => { void exportAll() },
    onImport: (f: File) => { void importAll(f) },
  }

  return (
    <>
      {activeCourse
        ? <CoursePage key={activeCourse.id} course={activeCourse} {...shared} />
        : (
          <div className="hb-root hb-root--empty">
            <div className="hb-empty">
              <h1 className="hb-h1">No courses yet</h1>
              <p className="hb-lede">Create a course or import a JSON backup to get started.</p>
              <div className="hb-empty-actions">
                <button type="button" className="hb-ghost" onClick={() => setCourseEditor({})}><Icon name="plus" size={14} />New course</button>
              </div>
              <RailFooter editMode={true} onEditMode={() => {}} onExport={shared.onExport} onImport={shared.onImport} />
            </div>
          </div>
        )}
      {courseEditor && <CourseEditor course={courseEditor.course} onClose={() => setCourseEditor(null)} />}
    </>
  )
}

// ─── Course page ────────────────────────────────────────────────────────────

interface PageProps {
  course: Course
  courses: Course[]
  editMode: boolean
  setEditMode: (v: boolean) => void
  isMobile: boolean
  onSelectCourse: (id: string) => void
  onNewCourse: () => void
  onEditCourse: (c: Course) => void
  onExport: () => void
  onImport: (f: File) => void
}

type Sheet = 'courses' | 'sections' | null

function CoursePage(props: PageProps) {
  const { course, courses, editMode, setEditMode, isMobile, onSelectCourse, onNewCourse, onEditCourse, onExport, onImport } = props
  const exampleCount = course.examples?.length ?? 0
  const hasExamples = exampleCount > 0

  const [mode, setMode] = useState<Mode>('formulas')
  const view: Mode = hasExamples ? mode : 'formulas'
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const terms = useMemo(() => parseQuery(deferredQuery), [deferredQuery])
  const searching = terms.length > 0

  const [sheet, setSheet] = useState<Sheet>(null)
  const [mSearch, setMSearch] = useState(false)
  const [editCard, setEditCard] = useState<{ card?: Card; section: Section } | null>(null)
  const [editSection, setEditSection] = useState<{ section?: Section; order: number } | null>(null)
  const [spy, setSpy] = useState<{ group: string | null; item: string | null; top: boolean }>({ group: null, item: null, top: true })

  const docRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)
  const pendingJump = useRef<string | null>(null)

  // ── Data ──
  const sections = useMemo(() => buildSections(course, terms), [course, terms])
  const exGroups = useMemo(() => buildExampleGroups(course, terms), [course, terms])
  const exampleNums = useMemo(() => new Map((course.examples ?? []).map(e => [e.id, e.number])), [course])
  const backlinks = useMemo(() => {
    const map = new Map<string, { id: string; title: string }[]>()
    for (const s of course.sections) for (const c of s.cards) for (const id of c.exampleIds ?? []) {
      if (!map.has(id)) map.set(id, [])
      map.get(id)!.push({ id: c.id, title: c.title })
    }
    return map
  }, [course])

  const formulaTotal = useMemo(() => course.sections.reduce((n, s) => n + s.cards.length, 0), [course])
  const formulaHits = sections.reduce((n, s) => n + s.cards.length, 0)
  const exampleHits = exGroups.reduce((n, g) => n + g.examples.length, 0)

  const outline: OutlineGroup[] = useMemo(() => view === 'formulas'
    ? sections.map(s => ({
        id: s.section.id, anchor: `hb-sec-${s.section.id}`, num: s.num, label: s.title, count: s.cards.length,
        items: s.cards.map(c => ({ id: c.id, anchor: `hb-card-${c.id}`, label: c.title })),
      }))
    : exGroups.map((g, i) => ({
        id: g.id, anchor: `hb-grp-${g.id}`, num: i + 1, label: g.label, count: g.examples.length,
        items: g.examples.map(e => ({ id: e.id, anchor: `hb-ex-${e.id}`, label: `Q${e.number} · ${e.title}` })),
      })), [view, sections, exGroups])

  // ── Navigation ──
  const scrollToAnchor = useCallback((anchor: string, flash = false) => {
    if (anchor === 'top') { window.scrollTo({ top: 0 }); return true }
    const el = document.getElementById(anchor)
    if (!el) return false
    el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
    if (flash) {
      el.classList.remove('hb-flash')
      void el.offsetWidth
      el.classList.add('hb-flash')
      window.setTimeout(() => el.classList.remove('hb-flash'), 1800)
    }
    return true
  }, [])

  // Pending cross-view jumps resolve once the target has rendered.
  useEffect(() => {
    const target = pendingJump.current
    if (!target) return
    const flash = target !== 'top' && !target.startsWith('hb-sec-') && !target.startsWith('hb-grp-')
    if (scrollToAnchor(target, flash)) pendingJump.current = null
  })

  const switchMode = useCallback((m: Mode) => {
    setMode(m)
    pendingJump.current = 'top'
  }, [])

  const goExample = useCallback((id: string) => {
    pendingJump.current = `hb-ex-${id}`
    setQuery('')
    setMode('examples')
  }, [])

  const goCard = useCallback((id: string) => {
    pendingJump.current = `hb-card-${id}`
    setQuery('')
    setMode('formulas')
  }, [])

  const jump = useCallback((anchor: string) => {
    setSheet(null)
    // Let the sheet unmount (and body scroll unlock) before scrolling.
    requestAnimationFrame(() => scrollToAnchor(anchor))
  }, [scrollToAnchor])

  const changeQuery = useCallback((q: string) => {
    setQuery(q)
    window.scrollTo({ top: 0 })
  }, [])

  // ── Scroll spy ──
  useEffect(() => {
    const doc = docRef.current
    if (!doc) return
    let raf = 0
    const compute = () => {
      raf = 0
      const line = (isMobile ? 60 : 0) + Math.min(160, window.innerHeight * 0.2)
      const heads = Array.from(doc.querySelectorAll<HTMLElement>('[data-hb-group]'))
      let head: HTMLElement | null = null
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      for (const h of heads) {
        const top = h.getBoundingClientRect().top
        if (top <= line || (atBottom && top < window.innerHeight)) head = h
        else break
      }
      let item: string | null = null
      if (head) {
        const rows = head.parentElement?.querySelectorAll<HTMLElement>('[data-hb-row]') ?? []
        for (const r of rows) {
          if (r.getBoundingClientRect().top <= line + 40) item = r.dataset.hbRow ?? null
          else break
        }
        if (atBottom && rows.length) item = rows[rows.length - 1].dataset.hbRow ?? item
      }
      const top = !head
      if (!head && heads.length) {
        head = heads[0]
        item = head.parentElement?.querySelector<HTMLElement>('[data-hb-row]')?.dataset.hbRow ?? null
      }
      const group = head?.dataset.hbGroup ?? null
      setSpy(prev => (prev.group === group && prev.item === item && prev.top === top ? prev : { group, item, top }))
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(compute) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    raf = requestAnimationFrame(compute)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [isMobile, view, sections, exGroups])

  // ── Search highlighting (CSS Custom Highlight API; filtering works without it) ──
  useEffect(() => {
    const registry = typeof CSS !== 'undefined' ? CSS.highlights : undefined
    if (!registry || typeof Highlight === 'undefined') return
    const doc = docRef.current
    if (!doc || !terms.length) { registry.delete('hb-match'); return }
    const needles = highlightNeedles(terms)
    const ranges: Range[] = []
    const walker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, {
      acceptNode: n => (n.parentElement?.closest('.katex, .hb-widget, button, .hb-sec-num')
        ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
    })
    while (walker.nextNode() && ranges.length < 3000) {
      const node = walker.currentNode as Text
      const text = node.data.toLowerCase()
      for (const n of needles) {
        let i = text.indexOf(n)
        while (i !== -1) {
          const r = new Range()
          r.setStart(node, i)
          r.setEnd(node, i + n.length)
          ranges.push(r)
          i = text.indexOf(n, i + n.length)
        }
      }
    }
    registry.set('hb-match', new Highlight(...ranges))
    return () => { registry.delete('hb-match') }
  }, [terms, view, sections, exGroups])

  // ── Keyboard: "/" focuses search, Esc closes sheets ──
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !e.metaKey && !e.ctrlKey && !e.altKey && !isTypingTarget(e.target)) {
        e.preventDefault()
        if (isMobile) { setSheet(null); setMSearch(true) } else searchRef.current?.focus()
      } else if (e.key === 'Escape' && sheet) {
        setSheet(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isMobile, sheet])

  // ── Lock page scroll under a sheet ──
  useEffect(() => {
    if (!sheet) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [sheet])

  // ── Edit handlers ──
  const onEditCard = useCallback((card: Card, sec: DocSection) => setEditCard({ card, section: sec.section }), [])
  const onAddCard = useCallback((sec: DocSection) => setEditCard({ section: sec.section }), [])
  const onEditSection = useCallback((sec: DocSection) => setEditSection({ section: sec.section, order: sec.section.order }), [])
  const onAddSection = useCallback(() => setEditSection({ order: course.sections.length }), [course])

  // ── Derived labels ──
  const activeGroup = outline.find(g => g.id === spy.group)
  const contextLabel = (!spy.top && activeGroup?.label) || (view === 'examples' ? 'Worked examples' : 'Contents')

  const accentVars = {
    '--hb-a': course.accent, '--hb-a-bg': course.accentBg, '--hb-a-fg': course.accentFg,
    '--hb-a-bg-d': course.accentBgDark, '--hb-a-fg-d': course.accentFgDark,
  } as CSSProperties

  const docLabel = view === 'formulas' ? `${course.code} contents` : 'Worked examples'

  const courseNav = (
    <CourseNav courses={courses} activeId={course.id} editMode={editMode} onNewCourse={onNewCourse}
      onSelect={id => { setSheet(null); if (id !== course.id) onSelectCourse(id) }} />
  )
  const footer = <RailFooter editMode={editMode} onEditMode={setEditMode} onExport={onExport} onImport={onImport} />

  return (
    <div className={`hb-root${editMode ? ' is-editing' : ''}`} style={accentVars}>
      <a className="hb-skip" href="#hb-doc">Skip to content</a>

      {/* ── Left rail (desktop) ── */}
      <aside className="hb-left" aria-label="Navigation">
        <div className="hb-brand">
          <span className="hb-brand-mark" aria-hidden="true">ƒ</span>
          <span className="hb-brand-name">Formula Reference</span>
        </div>
        <SearchField value={query} onChange={changeQuery} inputRef={searchRef}
          placeholder={view === 'formulas' ? `Search ${course.code}` : 'Search examples'} />
        <div className="hb-left-scroll">
          {courseNav}
          <div className="hb-rail-label">
            <span>{view === 'formulas' ? 'Contents' : 'Worked examples'}</span>
            {searching && <span className="hb-rail-meta">{view === 'formulas' ? formulaHits : exampleHits} matches</span>}
          </div>
          <Outline groups={outline} activeGroup={spy.group} activeItem={spy.item} onJump={jump}
            searching={searching} label={docLabel} />
        </div>
        {footer}
      </aside>

      {/* ── Mobile top bar ── */}
      <div className="hb-mbar-wrap">
        <div className="hb-mbar">
          <button type="button" className="hb-icon-btn" aria-label="Courses" onClick={() => setSheet('courses')}>
            <Icon name="menu" size={20} />
          </button>
          <button type="button" className="hb-mbar-ctx" onClick={() => setSheet('sections')} aria-haspopup="dialog"
            aria-label={`${course.code}: ${contextLabel}. Jump to section`}>
            <span className="hb-mbar-code">{course.code}</span>
            <span className="hb-mbar-sec">{contextLabel}</span>
            <Icon name="chevronDown" size={16} />
          </button>
          <button type="button" className={`hb-icon-btn${mSearch || query ? ' is-on' : ''}`} aria-label="Search" aria-expanded={mSearch}
            onClick={() => setMSearch(s => !s)}>
            <Icon name="search" size={19} />
          </button>
        </div>
        {(mSearch || query) && (
          <div className="hb-msearch">
            <SearchField value={query} onChange={changeQuery} autoFocus={mSearch} showKbd={false}
              placeholder={view === 'formulas' ? `Search ${course.code} formulas` : 'Search worked examples'} />
            <button type="button" className="hb-text-btn" onClick={() => { changeQuery(''); setMSearch(false) }}>Cancel</button>
          </div>
        )}
      </div>

      {/* ── Document ── */}
      <main className="hb-main" id="hb-doc" tabIndex={-1}>
        <div className="hb-doc" ref={docRef}>
          {editMode && (
            <div className="hb-editbar" role="status">
              <Icon name="pencil" size={14} />
              <span>Editing. Changes are saved in this browser.</span>
              <button type="button" className="hb-text-btn" onClick={() => setEditMode(false)}>Done</button>
            </div>
          )}

          <header className="hb-page-head">
            <div className="hb-eyebrow">
              <span className="hb-code">{course.code}</span>
              {course.term && <span>{course.term}</span>}
              {editMode && (
                <button type="button" className="hb-ghost hb-course-settings" onClick={() => onEditCourse(course)}>
                  <Icon name="settings" size={14} />Course settings
                </button>
              )}
            </div>
            <h1 className="hb-h1">{course.name}</h1>
            {course.description && <p className="hb-lede">{course.description}</p>}
            <p className="hb-stats">
              {course.sections.length} sections · {formulaTotal} formulas
              {hasExamples && <> · {exampleCount} worked examples</>}
            </p>
            {(hasExamples || (course.sheets?.length ?? 0) > 0) && (
              <div className="hb-head-tools">
                {hasExamples && <ModeSwitch mode={view} onMode={switchMode} exampleCount={exampleCount} />}
                <SheetLinks course={course} />
              </div>
            )}
          </header>

          {searching && (
            <div className="hb-status" role="status">
              <span>
                <strong>{view === 'formulas' ? formulaHits : exampleHits}</strong>{' '}
                {view === 'formulas' ? (formulaHits === 1 ? 'formula' : 'formulas') : (exampleHits === 1 ? 'example' : 'examples')}
                {' '}{(view === 'formulas' ? formulaHits : exampleHits) === 1 ? 'matches' : 'match'} <q>{deferredQuery.trim()}</q>
              </span>
              {hasExamples && view === 'formulas' && exampleHits > 0 && (
                <button type="button" className="hb-text-btn" onClick={() => switchMode('examples')}>
                  {exampleHits} in worked examples<Icon name="arrowRight" size={13} />
                </button>
              )}
              {hasExamples && view === 'examples' && formulaHits > 0 && (
                <button type="button" className="hb-text-btn" onClick={() => switchMode('formulas')}>
                  {formulaHits} in formulas<Icon name="arrowRight" size={13} />
                </button>
              )}
              <button type="button" className="hb-text-btn hb-status-clear" onClick={() => changeQuery('')}>Clear</button>
            </div>
          )}

          {view === 'formulas'
            ? <FormulaDoc sections={sections} terms={terms} editMode={editMode} exampleNums={hasExamples ? exampleNums : EMPTY_NUMS}
                onEditCard={onEditCard} onAddCard={onAddCard} onEditSection={onEditSection} onAddSection={onAddSection}
                onExample={goExample} />
            : <ExampleDoc groups={exGroups} terms={terms} backlinks={backlinks} onCard={goCard} />}

          {searching && (view === 'formulas' ? formulaHits : exampleHits) === 0 && (
            <div className="hb-empty">
              <p>Nothing in {view === 'formulas' ? `${course.code} formulas` : 'the worked examples'} matches <q>{deferredQuery.trim()}</q>.</p>
              <p className="hb-empty-hint">Search covers titles, notes, tables and LaTeX source, so symbol names like <code>omega</code> or <code>sigma</code> work too.</p>
            </div>
          )}
          {!searching && view === 'formulas' && course.sections.length === 0 && (
            <div className="hb-empty"><p>This course has no sections yet.{!editMode && ' Turn on edit mode to add one.'}</p></div>
          )}
        </div>
      </main>

      {/* ── Right rail (wide desktop) ── */}
      <aside className="hb-right" aria-label="On this page">
        <div className="hb-right-scroll">
          {hasExamples && <ModeSwitch mode={view} onMode={switchMode} exampleCount={exampleCount} />}
          <div className="hb-rail-label hb-rail-label--right"><span>On this page</span></div>
          <Outline groups={outline} activeGroup={spy.group} activeItem={spy.item} onJump={jump}
            searching={searching} nested label="On this page" />
        </div>
        {(course.sheets?.length ?? 0) > 0 && (
          <div className="hb-right-foot">
            <div className="hb-rail-label hb-rail-label--right"><span>Formula sheets</span></div>
            <SheetLinks course={course} />
          </div>
        )}
      </aside>

      {/* ── Mobile sheets ── */}
      {sheet && <div className="hb-scrim" onClick={() => setSheet(null)} aria-hidden="true" />}
      {sheet === 'courses' && (
        <div className="hb-drawer" role="dialog" aria-modal="true" aria-label="Courses">
          <div className="hb-sheet-head">
            <div className="hb-brand hb-brand--sheet">
              <span className="hb-brand-mark" aria-hidden="true">ƒ</span>
              <span className="hb-brand-name">Formula Reference</span>
            </div>
            <button type="button" className="hb-icon-btn" aria-label="Close" onClick={() => setSheet(null)}><Icon name="close" size={18} /></button>
          </div>
          <div className="hb-drawer-scroll">{courseNav}</div>
          {footer}
        </div>
      )}
      {sheet === 'sections' && (
        <div className="hb-bsheet" role="dialog" aria-modal="true" aria-label={docLabel}>
          <div className="hb-grabber" aria-hidden="true" />
          <div className="hb-sheet-head">
            <div className="hb-sheet-title">
              <span className="hb-mbar-code">{course.code}</span>
              <span>{view === 'formulas' ? 'Contents' : 'Worked examples'}</span>
            </div>
            <button type="button" className="hb-icon-btn" aria-label="Close" onClick={() => setSheet(null)}><Icon name="close" size={18} /></button>
          </div>
          {hasExamples && (
            <div className="hb-sheet-mode">
              <ModeSwitch mode={view} onMode={m => { setSheet(null); switchMode(m) }} exampleCount={exampleCount} />
            </div>
          )}
          <div className="hb-bsheet-scroll">
            <Outline groups={outline} activeGroup={spy.group} activeItem={spy.item} onJump={jump}
              searching={searching} label={docLabel} />
          </div>
        </div>
      )}

      {/* ── Editors ── */}
      {editCard && (
        <CardEditor courseId={course.id} section={editCard.section} card={editCard.card} onClose={() => setEditCard(null)} />
      )}
      {editSection && (
        <SectionEditor courseId={course.id} section={editSection.section} order={editSection.order} onClose={() => setEditSection(null)} />
      )}
    </div>
  )
}

const EMPTY_NUMS = new Map<string, number>()
