import { useRef, useState, type RefObject } from 'react'
import { groupCourses, loadCollapsed, saveCollapsed } from '@/lib/courseGroups'
import type { Course } from '@/types'
import type { OutlineGroup } from './search'
import { Icon } from './Icon'

// ─── Search field ───────────────────────────────────────────────────────────

interface SearchProps {
  value: string
  onChange: (v: string) => void
  inputRef?: RefObject<HTMLInputElement | null>
  placeholder: string
  showKbd?: boolean
  autoFocus?: boolean
}

export function SearchField({ value, onChange, inputRef, placeholder, showKbd = true, autoFocus }: SearchProps) {
  return (
    <div className="hb-search">
      <Icon name="search" size={15} />
      <input ref={inputRef} type="search" value={value} placeholder={placeholder} aria-label={placeholder}
        autoFocus={autoFocus} spellCheck={false} autoComplete="off"
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Escape') {
            if (value) { e.preventDefault(); onChange('') } else e.currentTarget.blur()
          }
        }} />
      {value
        ? <button type="button" className="hb-search-clear" onClick={() => { onChange(''); inputRef?.current?.focus() }} aria-label="Clear search"><Icon name="close" size={13} /></button>
        : showKbd && <kbd className="hb-kbd" aria-hidden="true">/</kbd>}
    </div>
  )
}

// ─── Course switcher ────────────────────────────────────────────────────────

interface CourseNavProps {
  courses: Course[]
  activeId: string | undefined
  onSelect: (id: string) => void
  editMode: boolean
  onNewCourse: () => void
}

export function CourseNav({ courses, activeId, onSelect, editMode, onNewCourse }: CourseNavProps) {
  const [collapsed, setCollapsed] = useState(loadCollapsed)
  const groups = groupCourses(courses)

  const toggle = (term: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(term)) next.delete(term)
      else next.add(term)
      saveCollapsed(next)
      return next
    })
  }

  return (
    <nav className="hb-courses" aria-label="Courses">
      {groups.map(g => {
        const open = !collapsed.has(g.term)
        const hasActive = g.courses.some(c => c.id === activeId)
        return (
          <div key={g.term} className="hb-term">
            <button type="button" className="hb-term-head" aria-expanded={open} onClick={() => toggle(g.term)}>
              <span className={`hb-term-chev${open ? ' is-open' : ''}`}><Icon name="chevronRight" size={12} /></span>
              <span className="hb-term-label">{g.term}</span>
              {!open && hasActive && <span className="hb-term-dot" aria-label="contains current course" />}
            </button>
            {open && (
              <ul className="hb-course-list">
                {g.courses.map(c => (
                  <li key={c.id}>
                    <button type="button" className={`hb-course${c.id === activeId ? ' is-active' : ''}`}
                      aria-current={c.id === activeId ? 'page' : undefined}
                      onClick={() => onSelect(c.id)}>
                      <span className="hb-course-code">{c.code}</span>
                      <span className="hb-course-name">{c.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )
      })}
      {editMode && (
        <button type="button" className="hb-ghost hb-new-course" onClick={onNewCourse}><Icon name="plus" size={14} />New course</button>
      )}
    </nav>
  )
}

// ─── Outline ────────────────────────────────────────────────────────────────

interface OutlineProps {
  groups: OutlineGroup[]
  activeGroup: string | null
  activeItem: string | null
  onJump: (anchor: string) => void
  searching: boolean
  /** Expand the active group to show its rows (right rail). */
  nested?: boolean
  label: string
}

export function Outline({ groups, activeGroup, activeItem, onJump, searching, nested, label }: OutlineProps) {
  return (
    <nav className={`hb-outline${nested ? ' hb-outline--nested' : ''}`} aria-label={label}>
      <ol>
        {groups.map(g => {
          const active = g.id === activeGroup
          const empty = searching && g.count === 0
          return (
            <li key={g.id} className={empty ? 'is-empty' : undefined}>
              <a href={`#${g.anchor}`} className={`hb-outline-link${active ? ' is-active' : ''}`}
                aria-current={active ? 'location' : undefined}
                onClick={e => { e.preventDefault(); if (!empty) onJump(g.anchor) }}>
                <span className="hb-outline-num">{g.num}</span>
                <span className="hb-outline-label">{g.label}</span>
                {searching && <span className="hb-outline-count">{g.count}</span>}
              </a>
              {nested && active && g.items.length > 0 && (
                <ol className="hb-outline-items">
                  {g.items.map(it => (
                    <li key={it.id}>
                      <a href={`#${it.anchor}`} className={`hb-outline-item${it.id === activeItem ? ' is-active' : ''}`} title={it.label}
                        onClick={e => { e.preventDefault(); onJump(it.anchor) }}>{it.label}</a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// ─── Mode switch + sheets ───────────────────────────────────────────────────

export type Mode = 'formulas' | 'examples'

export function ModeSwitch({ mode, onMode, exampleCount }: { mode: Mode; onMode: (m: Mode) => void; exampleCount: number }) {
  return (
    <div className="hb-seg" role="tablist" aria-label="View">
      <button type="button" role="tab" aria-selected={mode === 'formulas'} className={mode === 'formulas' ? 'is-on' : ''} onClick={() => onMode('formulas')}>Formulas</button>
      <button type="button" role="tab" aria-selected={mode === 'examples'} className={mode === 'examples' ? 'is-on' : ''} onClick={() => onMode('examples')}>
        Worked examples <span className="hb-seg-count">{exampleCount}</span>
      </button>
    </div>
  )
}

export function SheetLinks({ course }: { course: Course }) {
  if (!course.sheets?.length) return null
  return (
    <ul className="hb-sheets">
      {course.sheets.map(s => (
        <li key={s.file}>
          <a href={`${import.meta.env.BASE_URL}formula-sheets/${s.file}`} target="_blank" rel="noopener noreferrer" className="hb-sheet">
            <Icon name="file" size={15} />
            <span>{s.label}</span>
            <span className="hb-sheet-ext">PDF</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

// ─── Footer: edit mode, export / import ─────────────────────────────────────

interface FooterProps {
  editMode: boolean
  onEditMode: (v: boolean) => void
  onExport: () => void
  onImport: (f: File) => void
}

export function RailFooter({ editMode, onEditMode, onExport, onImport }: FooterProps) {
  const fileRef = useRef<HTMLInputElement>(null)
  return (
    <div className="hb-foot">
      <button type="button" role="switch" aria-checked={editMode} className={`hb-switch${editMode ? ' is-on' : ''}`}
        onClick={() => onEditMode(!editMode)}>
        <span className="hb-switch-track" aria-hidden="true"><span className="hb-switch-thumb" /></span>
        <span>Edit mode</span>
      </button>
      {editMode && (
        <div className="hb-foot-actions">
          <button type="button" className="hb-ghost" onClick={onExport}><Icon name="download" size={14} />Export</button>
          <button type="button" className="hb-ghost" onClick={() => fileRef.current?.click()}><Icon name="upload" size={14} />Import</button>
          <input ref={fileRef} type="file" accept="application/json,.json" hidden
            onChange={e => { const f = e.target.files?.[0]; if (f) onImport(f); e.target.value = '' }} />
        </div>
      )}
    </div>
  )
}
