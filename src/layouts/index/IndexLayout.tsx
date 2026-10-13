import { useCallback, useEffect, useMemo, useState } from 'react'
import { useCourses } from '@/hooks/courseModel'
import { CardEditor } from '@/components/cards/CardEditor'
import { SectionEditor } from '@/components/courses/SectionEditor'
import { CourseEditor } from '@/components/courses/CourseEditor'
import { loadCollapsed, saveCollapsed } from '@/lib/courseGroups'
import type { Card, Course, Section } from '@/types'
import { CourseColumn } from './CourseColumn'
import { FormulaList } from './FormulaList'
import { DetailPane } from './DetailPane'
import { Palette } from './Palette'
import { buildIndex, flattenCourse, formatHash, parseHash, rowId, splitSectionLabel, sortedCards, type SearchDoc, type Selection } from './model'
import { isTypingTarget, useMediaQuery } from './hooks'
import { ChevronLeft, ChevronDown, ChevronUp, PlusIcon, SearchIcon } from './icons'
import './IndexLayout.css'

type View = 'courses' | 'list' | 'detail'
const DEPTH: Record<View, number> = { courses: 0, list: 1, detail: 2 }
type Editor =
  | { kind: 'card'; section: Section; card?: Card }
  | { kind: 'section'; section?: Section; order: number }
  | { kind: 'course'; course?: Course }

export default function IndexLayout() {
  const { courses, activeCourseId, setActiveCourseId, exportAll, importAll } = useCourses()
  const isMobile = useMediaQuery('(max-width: 767px)')

  // Deep link (#pcs125/<cardId>) wins over the persisted active course on first render.
  const [initial] = useState(() => parseHash(window.location.hash, courses))
  const [hashCourseId, setHashCourseId] = useState<string | null>(initial?.course.id ?? null)
  const [selState, setSelState] = useState<{ courseId: string; sel: Selection | null } | null>(
    initial ? { courseId: initial.course.id, sel: initial.sel } : null)
  const [initialView] = useState<View>(initial?.sel ? 'detail' : 'list')
  const [view, setView] = useState<View>(initialView)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editor, setEditor] = useState<Editor | null>(null)
  const [collapsed, setCollapsed] = useState<Set<string>>(loadCollapsed)
  const [scrollToSection, setScrollToSection] = useState<{ id: string; n: number } | null>(null)

  const effectiveId = hashCourseId ?? activeCourseId
  const course = courses.find(c => c.id === effectiveId) ?? courses[0] ?? null

  // Persist the deep-linked course as the active course.
  useEffect(() => {
    if (hashCourseId && hashCourseId !== activeCourseId) setActiveCourseId(hashCourseId)
  }, [hashCourseId, activeCourseId, setActiveCourseId])

  const items = useMemo(() => (course ? flattenCourse(course) : []), [course])
  const sel = course && selState?.courseId === course.id ? selState.sel : null
  const index = sel ? items.findIndex(i => i.kind === sel.kind && i.id === sel.id) : -1
  const liveSel = index >= 0 ? sel : null

  const searchIndex = useMemo(() => buildIndex(courses), [courses])

  /* ── Navigation actions ─────────────────────────────────────────────── */

  // Mobile push navigation is mirrored into browser history so the system back gesture works.
  const go = useCallback((next: View) => {
    if (next === view) return
    if (!isMobile) { setView(next); return }
    const st = window.history.state ?? {}
    const depth = st.ixN ?? 0
    if (DEPTH[next] > DEPTH[view]) {
      window.history.pushState({ ...st, ixView: next, ixN: depth + 1 }, '')
      setView(next)
    } else if (depth > 0 && DEPTH[view] - DEPTH[next] === 1) {
      window.history.back()   // popstate restores the previous view
    } else {
      window.history.replaceState({ ...st, ixView: next }, '')
      setView(next)
    }
  }, [isMobile, view])

  useEffect(() => {
    window.history.replaceState({ ...(window.history.state ?? {}), ixView: initialView }, '')
    const onPop = (e: PopStateEvent) => { const v = e.state?.ixView as View | undefined; if (v) setView(v) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [initialView])

  const selectCourse = useCallback((id: string) => {
    setHashCourseId(null)
    setActiveCourseId(id)
    go('list')
  }, [setActiveCourseId, go])

  const select = useCallback((s: Selection | null, courseId?: string) => {
    const cid = courseId ?? course?.id
    if (!cid) return
    if (courseId && courseId !== course?.id) { setHashCourseId(null); setActiveCourseId(courseId) }
    setSelState({ courseId: cid, sel: s })
    go('detail')
  }, [course?.id, setActiveCourseId, go])

  const onSelect = useCallback((s: Selection) => select(s), [select])
  const showOverview = useCallback(() => select(null), [select])

  const jumpSection = useCallback((section: Section, courseId?: string) => {
    const first = sortedCards(section)[0]
    if (first) select({ kind: 'card', id: first.id }, courseId)
    setScrollToSection(prev => ({ id: section.id, n: (prev?.n ?? 0) + 1 }))
  }, [select])

  const pickResult = useCallback((doc: SearchDoc) => {
    setPaletteOpen(false)
    if (doc.kind === 'course') { selectCourse(doc.course.id); setSelState({ courseId: doc.course.id, sel: null }); return }
    if (doc.kind === 'section') {
      const section = doc.course.sections.find(s => s.id === doc.sectionId)
      if (section) jumpSection(section, doc.course.id)
      return
    }
    if (doc.sel) select(doc.sel, doc.course.id)
  }, [select, selectCourse, jumpSection])

  const toggleGroup = useCallback((term: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(term)) next.delete(term); else next.add(term)
      saveCollapsed(next)
      return next
    })
  }, [])

  const handleImport = useCallback(() => {
    const input = document.createElement('input')
    input.type = 'file'; input.accept = '.json,application/json'
    input.onchange = async () => { if (input.files?.[0]) await importAll(input.files[0]) }
    input.click()
  }, [importAll])

  /* ── URL hash ↔ selection ───────────────────────────────────────────── */

  useEffect(() => {
    if (!course) return
    const h = formatHash(course, liveSel)
    if (window.location.hash !== h) window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search + h)
  }, [course, liveSel])

  useEffect(() => {
    const onHash = () => {
      const parsed = parseHash(window.location.hash, courses)
      if (!parsed) return
      setHashCourseId(null)
      setActiveCourseId(parsed.course.id)
      setSelState({ courseId: parsed.course.id, sel: parsed.sel })
      if (!window.history.state?.ixView) setView(parsed.sel ? 'detail' : 'list')
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [courses, setActiveCourseId])

  /* ── Keyboard ───────────────────────────────────────────────────────── */

  useEffect(() => {
    const move = (delta: number) => {
      if (!items.length) return
      const next = index < 0 ? (delta > 0 ? 0 : -1) : index + delta
      if (next >= items.length) return
      const followFocus = document.activeElement?.classList.contains('ix-row')
      if (next < 0) { select(null); return }
      const it = items[next]
      select({ kind: it.kind, id: it.id })
      if (followFocus) requestAnimationFrame(() => document.getElementById(rowId(it))?.focus({ preventScroll: true }))
    }
    const onKey = (e: KeyboardEvent) => {
      if (editor) return
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setPaletteOpen(o => !o); return }
      if (paletteOpen || isTypingTarget(e.target) || e.metaKey || e.ctrlKey || e.altKey) return
      if (e.key === '/') { e.preventDefault(); setPaletteOpen(true) }
      else if (e.key === 'ArrowDown' || e.key === 'j') { e.preventDefault(); move(1) }
      else if (e.key === 'ArrowUp' || e.key === 'k') { e.preventDefault(); move(-1) }
      else if (e.key === 'Escape' && liveSel && !isMobile) select(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [editor, paletteOpen, items, index, select, liveSel, isMobile])

  /* ── Render ─────────────────────────────────────────────────────────── */

  if (!course) {
    return (
      <div className="ix-root ix-empty-root">
        <div className="ix-empty">
          <h1>No courses yet</h1>
          <p>Create a course to start collecting formulas, or import a backup.</p>
          <div className="ix-empty-actions">
            <button type="button" className="ix-btn ix-btn--primary" onClick={() => setEditor({ kind: 'course' })}><PlusIcon size={14} /> New course</button>
            <button type="button" className="ix-btn" onClick={handleImport}>Import backup…</button>
          </div>
        </div>
        {editor?.kind === 'course' && <CourseEditor course={editor.course} onClose={() => setEditor(null)} />}
      </div>
    )
  }

  const accentVars = {
    '--ix-a-l': course.accent, '--ix-a-d': course.accentFgDark,
    '--ix-abg-l': course.accentBg, '--ix-abg-d': course.accentBgDark,
    '--ix-afg-l': course.accentFg, '--ix-afg-d': course.accentFgDark,
  } as React.CSSProperties

  const current = index >= 0 ? items[index] : null
  const hidden = (v: View) => isMobile && view !== v

  return (
    <div className={`ix-root${isMobile ? ' ix-mobile' : ''}${editMode ? ' ix-editing' : ''}`} data-view={view} style={accentVars}>
      {isMobile && (
        <header className="ix-mbar">
          {view === 'courses' && <span className="ix-mbar-title">Courses</span>}
          {view === 'list' && (
            <span className="ix-mbar-title"><span className="ix-mbar-code">{course.code}</span>Formulas</span>
          )}
          {view === 'detail' && (
            <span className="ix-mbar-title">
              <span className="ix-mbar-code">{course.code}</span>
              {current ? (current.kind === 'card' ? splitSectionLabel(current.section.label).main : 'Worked examples') : 'Overview'}
            </span>
          )}
        </header>
      )}

      <div className="ix-cols">
        <div className="ix-col ix-col-nav" inert={hidden('courses')}>
          <CourseColumn courses={courses} activeCourseId={course.id} onSelectCourse={selectCourse}
            collapsed={collapsed} onToggleGroup={toggleGroup} onOpenSearch={() => setPaletteOpen(true)}
            editMode={editMode} onToggleEdit={() => setEditMode(m => !m)}
            onExport={exportAll} onImport={handleImport}
            onNewCourse={() => { setHashCourseId(null); setEditor({ kind: 'course' }) }}
            onEditCourse={c => { setHashCourseId(null); setEditor({ kind: 'course', course: c }) }} />
        </div>
        <div className="ix-col ix-col-list" inert={hidden('list')}>
          <FormulaList course={course} selected={liveSel} onSelect={onSelect} onOverview={showOverview}
            editMode={editMode} scrollToSection={scrollToSection}
            onAddCard={section => setEditor({ kind: 'card', section })}
            onEditSection={section => setEditor({ kind: 'section', section, order: section.order })}
            onAddSection={() => setEditor({ kind: 'section', order: course.sections.length })} />
        </div>
        <main className="ix-col ix-col-detail" inert={hidden('detail')}>
          <DetailPane course={course} items={items} index={index} onSelect={onSelect} onOverview={showOverview}
            onJumpSection={s => jumpSection(s)} editMode={editMode}
            onEditCard={(card, section) => setEditor({ kind: 'card', card, section })}
            onEditCourse={c => { setHashCourseId(null); setEditor({ kind: 'course', course: c }) }} />
        </main>
      </div>

      {isMobile && (
        <nav className="ix-tbar" aria-label="Navigation">
          {view !== 'courses' && (
            <button type="button" className="ix-tbar-btn ix-tbar-back"
              onClick={() => go(view === 'detail' ? 'list' : 'courses')}
              aria-label={view === 'detail' ? `Back to ${course.code} formulas` : 'Back to courses'}>
              <ChevronLeft size={20} />
              <span>{view === 'detail' ? course.code : 'Courses'}</span>
            </button>
          )}
          <button type="button" className="ix-tbar-search" onClick={() => setPaletteOpen(true)}>
            <SearchIcon size={16} /> <span>Search</span>
          </button>
          {view === 'detail' && (
            <span className="ix-tbar-step">
              <button type="button" className="ix-tbar-btn" aria-label="Previous formula" disabled={index < 0}
                onClick={() => { const it = items[index - 1]; select(it ? { kind: it.kind, id: it.id } : null) }}>
                <ChevronUp size={20} />
              </button>
              <button type="button" className="ix-tbar-btn" aria-label="Next formula" disabled={index >= items.length - 1}
                onClick={() => { const it = items[index + 1]; if (it) select({ kind: it.kind, id: it.id }) }}>
                <ChevronDown size={20} />
              </button>
            </span>
          )}
        </nav>
      )}

      {paletteOpen && (
        <Palette index={searchIndex} activeCourseId={course.id} activeCourseCode={course.code}
          onPick={pickResult} onClose={() => setPaletteOpen(false)} />
      )}

      {editor?.kind === 'card' && (
        <CardEditor courseId={course.id} section={editor.section} card={editor.card} onClose={() => setEditor(null)} />
      )}
      {editor?.kind === 'section' && (
        <SectionEditor courseId={course.id} section={editor.section} order={editor.order} onClose={() => setEditor(null)} />
      )}
      {editor?.kind === 'course' && <CourseEditor course={editor.course} onClose={() => setEditor(null)} />}
    </div>
  )
}
