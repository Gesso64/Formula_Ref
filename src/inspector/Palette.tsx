import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { search, type ResultKind, type SearchDoc } from './paneModel'
import { Tex } from './Tex'
import { BookIcon, CloseIcon, CourseIcon, EnterIcon, FunctionIcon, LayersIcon, PracticeIcon, SearchIcon } from './paneIcons'

interface Props {
  index: SearchDoc[]
  activeCourseId: string | null
  activeCourseCode: string
  onPick: (doc: SearchDoc) => void
  onClose: () => void
}

const KIND_ICON: Record<ResultKind, ReactNode> = {
  card: <FunctionIcon size={15} />,
  example: <BookIcon size={15} />,
  lab: <PracticeIcon size={15} />,
  section: <LayersIcon size={15} />,
  course: <CourseIcon size={15} />,
}
const KIND_LABEL: Record<ResultKind, string> = { card: 'Formula', example: 'Worked example', lab: 'Practice', section: 'Section', course: 'Course' }

function highlight(text: string, query: string): ReactNode {
  const terms = query.trim().split(/\s+/).filter(t => t.length > 0).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (!terms.length) return text
  const re = new RegExp(`(${terms.join('|')})`, 'gi')
  return text.split(re).map((part, i) => (i % 2 === 1 ? <mark key={i}>{part}</mark> : part))
}

export function Palette({ index, activeCourseId, activeCourseCode, onPick, onClose }: Props) {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    inputRef.current?.focus()
    return () => { prev?.focus?.({ preventScroll: true }) }
  }, [])

  const groups = useMemo(() => {
    if (query.trim()) {
      const res = search(index, query, activeCourseId)
      return [{ label: res.length ? `${res.length === 60 ? '60+' : res.length} result${res.length === 1 ? '' : 's'}` : '', docs: res }]
    }
    return [
      { label: `Jump to a section in ${activeCourseCode}`, docs: index.filter(d => d.kind === 'section' && d.course.id === activeCourseId) },
      { label: 'Courses', docs: index.filter(d => d.kind === 'course') },
    ]
  }, [query, index, activeCourseId, activeCourseCode])

  const flat = useMemo(() => groups.flatMap(g => g.docs), [groups])
  const current = flat[Math.min(active, flat.length - 1)]

  useEffect(() => {
    listRef.current?.querySelector('[data-active="true"]')?.scrollIntoView({ block: 'nearest' })
  }, [active, flat])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || (e.key === 'n' && e.ctrlKey)) {
      e.preventDefault(); setActive(a => (flat.length ? (a + 1) % flat.length : 0))
    } else if (e.key === 'ArrowUp' || (e.key === 'p' && e.ctrlKey)) {
      e.preventDefault(); setActive(a => (flat.length ? (a - 1 + flat.length) % flat.length : 0))
    } else if (e.key === 'Enter') {
      e.preventDefault(); if (current) onPick(current)
    } else if (e.key === 'Escape') {
      e.preventDefault(); e.stopPropagation(); onClose()
    } else if (e.key === 'Tab') {
      e.preventDefault()
    }
  }

  const starts = groups.map((_, gi) => groups.slice(0, gi).reduce((sum, g) => sum + g.docs.length, 0))
  return (
    <div className="ix-pal-backdrop" onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="ix-pal" role="dialog" aria-modal="true" aria-label="Search formulas" onKeyDown={onKeyDown}>
        <div className="ix-pal-input">
          <SearchIcon size={18} />
          <input ref={inputRef} value={query} placeholder="Search formulas, symbols, sections…"
            onChange={e => { setQuery(e.target.value); setActive(0) }}
            role="combobox" aria-expanded="true" aria-controls="ix-pal-list" aria-autocomplete="list"
            aria-activedescendant={current ? `ix-pal-${current.key}` : undefined}
            spellCheck={false} autoComplete="off" />
          <button type="button" className="ix-pal-close" onClick={onClose} aria-label="Close search">
            <span className="ix-kbd ix-pal-esc">esc</span>
            <CloseIcon size={18} className="ix-pal-x" />
          </button>
        </div>

        <div className="ix-pal-list" id="ix-pal-list" role="listbox" ref={listRef}>
          {groups.map((g, gi) => (
            <div key={g.label} role="presentation">
              {g.label && g.docs.length > 0 && <div className="ix-pal-group">{g.label}</div>}
              {g.docs.map((doc, j) => {
                const i = starts[gi] + j
                const on = doc === current
                return (
                  <div key={doc.key} id={`ix-pal-${doc.key}`} role="option" aria-selected={on} data-active={on}
                    className="ix-pal-row" onMouseMove={() => { if (active !== i) setActive(i) }}
                    onClick={() => onPick(doc)}>
                    <span className="ix-pal-icon" title={KIND_LABEL[doc.kind]}>{KIND_ICON[doc.kind]}</span>
                    <span className="ix-pal-main">
                      <span className="ix-pal-title">{highlight(doc.title, query)}</span>
                      {doc.context && <span className="ix-pal-ctx">{doc.context}</span>}
                    </span>
                    {doc.kind !== 'course' && <span className="ix-pal-code">{doc.course.code}</span>}
                    {on && <EnterIcon size={14} className="ix-pal-enter" />}
                  </div>
                )
              })}
            </div>
          ))}
          {query.trim() && flat.length === 0 && (
            <div className="ix-pal-empty">
              No matches for “{query.trim()}”.
              <span>Try a symbol name like <em>omega</em>, a tag, or a course code.</span>
            </div>
          )}
        </div>

        <div className="ix-pal-foot">
          <div className="ix-pal-preview" aria-hidden="true">
            {current?.preview ? <Tex tex={current.preview} /> : current ? <span className="ix-pal-kind">{KIND_LABEL[current.kind]}{current.tag ? ` · ${current.tag}` : ''}</span> : null}
          </div>
          <div className="ix-pal-keys">
            <span><kbd className="ix-kbd">↑</kbd><kbd className="ix-kbd">↓</kbd> move</span>
            <span><kbd className="ix-kbd">↵</kbd> open</span>
          </div>
        </div>
      </div>
    </div>
  )
}
