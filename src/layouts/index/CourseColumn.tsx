import { useEffect, useRef, useState } from 'react'
import { groupCourses } from '@/lib/courseGroups'
import type { Course } from '@/types'
import { isMac } from './hooks'
import { ChevronRight, DownloadIcon, MoreIcon, PencilIcon, PlusIcon, SearchIcon, UploadIcon } from './icons'

interface Props {
  courses: Course[]
  activeCourseId: string | null
  onSelectCourse: (id: string) => void
  collapsed: Set<string>
  onToggleGroup: (term: string) => void
  onOpenSearch: () => void
  editMode: boolean
  onToggleEdit: () => void
  onExport: () => void
  onImport: () => void
  onNewCourse: () => void
  onEditCourse: (course: Course) => void
}

function formulaCount(c: Course) {
  return c.sections.reduce((n, s) => n + s.cards.length, 0)
}

export function CourseColumn(p: Props) {
  const groups = groupCourses(p.courses)
  return (
    <nav className="ix-nav" aria-label="Courses">
      <div className="ix-nav-head">
        <div className="ix-brand">
          <span className="ix-brand-mark" aria-hidden="true">∫</span>
          <span className="ix-brand-name">Formula Reference</span>
        </div>
      </div>

      <div className="ix-nav-search">
        <button type="button" className="ix-search-btn" onClick={p.onOpenSearch}>
          <SearchIcon size={15} />
          <span>Search formulas</span>
          <kbd className="ix-kbd">{isMac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
      </div>

      <div className="ix-nav-scroll">
        {groups.map(({ term, courses }) => {
          const open = !p.collapsed.has(term)
          return (
            <div className="ix-group" key={term}>
              <button type="button" className="ix-group-head" aria-expanded={open} onClick={() => p.onToggleGroup(term)}>
                <ChevronRight size={13} className="ix-group-chev" strokeWidth={2} />
                <span>{term}</span>
                <span className="ix-group-count">{courses.length}</span>
              </button>
              {open && (
                <ul className="ix-course-list">
                  {courses.map(c => {
                    const active = c.id === p.activeCourseId
                    return (
                      <li key={c.id} className="ix-course-li">
                        <button type="button" className="ix-course" aria-current={active ? 'page' : undefined}
                          style={{ '--ix-dot': c.accent } as React.CSSProperties}
                          onClick={() => p.onSelectCourse(c.id)}>
                          <span className="ix-course-code">{c.code}</span>
                          <span className="ix-course-name">{c.name}</span>
                          <span className="ix-course-count">{formulaCount(c)}</span>
                          <ChevronRight size={16} className="ix-course-chev" />
                        </button>
                        {p.editMode && (
                          <button type="button" className="ix-icon-btn ix-course-edit" aria-label={`Edit ${c.code}`}
                            onClick={() => p.onEditCourse(c)}>
                            <PencilIcon size={14} />
                          </button>
                        )}
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          )
        })}
        {p.editMode && (
          <button type="button" className="ix-add-btn ix-add-course" onClick={p.onNewCourse}>
            <PlusIcon size={14} /> New course
          </button>
        )}
      </div>

      <div className="ix-nav-foot">
        <button type="button" className="ix-edit-toggle" role="switch" aria-checked={p.editMode} onClick={p.onToggleEdit}>
          <PencilIcon size={14} />
          <span>Edit mode</span>
          <span className="ix-switch" aria-hidden="true"><span /></span>
        </button>
        <DataMenu onExport={p.onExport} onImport={p.onImport} onNewCourse={p.onNewCourse} />
      </div>
    </nav>
  )
}

function DataMenu({ onExport, onImport, onNewCourse }: { onExport: () => void; onImport: () => void; onNewCourse: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { e.stopPropagation(); setOpen(false) } }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey, true)
    return () => { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey, true) }
  }, [open])

  const run = (fn: () => void) => () => { setOpen(false); fn() }

  return (
    <div className="ix-menu-wrap" ref={ref}>
      <button type="button" className="ix-icon-btn" aria-label="Data and courses" aria-haspopup="menu" aria-expanded={open}
        onClick={() => setOpen(o => !o)}>
        <MoreIcon size={16} strokeWidth={2.2} />
      </button>
      {open && (
        <div className="ix-menu" role="menu">
          <button type="button" role="menuitem" onClick={run(onNewCourse)}><PlusIcon size={15} /> New course</button>
          <div className="ix-menu-sep" />
          <button type="button" role="menuitem" onClick={run(onExport)}><DownloadIcon size={15} /> Export backup (JSON)</button>
          <button type="button" role="menuitem" onClick={run(onImport)}><UploadIcon size={15} /> Import backup…</button>
        </div>
      )}
    </div>
  )
}
