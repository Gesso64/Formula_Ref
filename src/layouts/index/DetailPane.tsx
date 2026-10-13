import { useState } from 'react'
import { InterestTable } from '@/components/cards/InterestTable'
import type { Card, Course, Section, WorkedExample } from '@/types'
import { cardEquations, sortedSections, splitSectionLabel, type ListItem, type Selection } from './model'
import { Tex } from './Tex'
import { isMac } from './hooks'
import {
  ArrowLeft, ArrowRight, CheckIcon, ChevronDown, ChevronUp, CopyIcon, FileIcon, FunctionIcon, LinkIcon, PencilIcon,
} from './icons'

interface Props {
  course: Course
  items: ListItem[]
  index: number               // index of the selected item in `items`, -1 for the course overview
  onSelect: (sel: Selection) => void
  onOverview: () => void
  onJumpSection: (section: Section) => void
  editMode: boolean
  onEditCard: (card: Card, section: Section) => void
  onEditCourse: (course: Course) => void
}

function itemTitle(it: ListItem) {
  return it.kind === 'card' ? it.card.title : `Q${it.example.number} · ${it.example.title}`
}
function itemContext(it: ListItem) {
  return it.kind === 'card' ? splitSectionLabel(it.section.label).main : 'Worked examples'
}
const selOf = (it: ListItem): Selection => ({ kind: it.kind, id: it.id })

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null)
  const copy = (key: string, text: string) => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(key)
      window.setTimeout(() => setCopied(c => (c === key ? null : c)), 1400)
    }).catch(() => { /* clipboard unavailable */ })
  }
  return { copied, copy }
}

export function DetailPane(p: Props) {
  const item = p.index >= 0 ? p.items[p.index] : null
  const prev = p.index > 0 ? p.items[p.index - 1] : null
  const next = p.index >= 0 && p.index < p.items.length - 1 ? p.items[p.index + 1] : null
  const { copied, copy } = useCopy()

  const wide = item?.kind === 'card' && item.card.type === 'widget'

  return (
    <div className="ix-detail">
      <header className="ix-detail-head">
        <nav className="ix-crumbs" aria-label="Breadcrumb">
          <button type="button" className="ix-crumb" onClick={p.onOverview}>{p.course.code}</button>
          {item && (
            <>
              <span className="ix-crumb-sep" aria-hidden="true">/</span>
              {item.kind === 'card'
                ? <button type="button" className="ix-crumb" onClick={() => p.onJumpSection(item.section)}>
                    {splitSectionLabel(item.section.label).main}
                  </button>
                : <span className="ix-crumb ix-crumb--static">Worked examples</span>}
            </>
          )}
        </nav>
        <div className="ix-detail-actions">
          {item && (
            <button type="button" className="ix-icon-btn" aria-label="Copy link to this formula"
              title="Copy link" onClick={() => copy('link', window.location.href)}>
              {copied === 'link' ? <CheckIcon size={15} /> : <LinkIcon size={15} />}
            </button>
          )}
          {item && <span className="ix-head-sep" aria-hidden="true" />}
          <button type="button" className="ix-icon-btn" aria-label="Previous" title="Previous (↑)"
            disabled={!prev && !item} onClick={() => (prev ? p.onSelect(selOf(prev)) : p.onOverview())}>
            <ChevronUp size={16} />
          </button>
          <button type="button" className="ix-icon-btn" aria-label="Next" title="Next (↓)"
            disabled={item ? !next : p.items.length === 0}
            onClick={() => { const n = item ? next : p.items[0]; if (n) p.onSelect(selOf(n)) }}>
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      <div className="ix-detail-scroll" key={item ? `${item.kind}:${item.id}` : 'overview'}>
        <article className={`ix-doc${wide ? ' ix-doc--wide' : ''}`}>
          {!item && <CourseOverview {...p} />}
          {item?.kind === 'card' && (
            <CardDetail card={item.card} section={item.section} course={p.course} onSelect={p.onSelect}
              editMode={p.editMode} onEdit={() => p.onEditCard(item.card, item.section)}
              copied={copied} copy={copy} />
          )}
          {item?.kind === 'example' && (
            <ExampleDetail example={item.example} course={p.course} onSelect={p.onSelect} copied={copied} copy={copy} />
          )}

          {item && (prev || next) && (
            <nav className="ix-pager" aria-label="Previous and next">
              {prev ? (
                <button type="button" className="ix-pager-btn" onClick={() => p.onSelect(selOf(prev))}>
                  <span className="ix-pager-dir"><ArrowLeft size={13} /> Previous</span>
                  <span className="ix-pager-title">{itemTitle(prev)}</span>
                  <span className="ix-pager-ctx">{itemContext(prev)}</span>
                </button>
              ) : <span />}
              {next ? (
                <button type="button" className="ix-pager-btn ix-pager-btn--next" onClick={() => p.onSelect(selOf(next))}>
                  <span className="ix-pager-dir">Next <ArrowRight size={13} /></span>
                  <span className="ix-pager-title">{itemTitle(next)}</span>
                  <span className="ix-pager-ctx">{itemContext(next)}</span>
                </button>
              ) : <span />}
            </nav>
          )}
        </article>
      </div>
    </div>
  )
}

/* ── Equations ─────────────────────────────────────────────────────────── */

function EquationBlock({ eqs, copied, copy, idPrefix }: {
  eqs: { tex: string; main: boolean }[]
  copied: string | null
  copy: (key: string, text: string) => void
  idPrefix: string
}) {
  if (!eqs.length) return null
  const numbered = eqs.length > 1
  const hasMain = eqs.some(e => e.main)
  return (
    <div className="ix-eqs">
      {eqs.map((eq, i) => {
        const key = `${idPrefix}-${i}`
        const size = eq.main ? 'ix-eq--main' : hasMain ? 'ix-eq--sub' : 'ix-eq--solo'
        return (
          <div className={`ix-eq ${size}`} key={i}>
            <div className="ix-eq-math"><Tex tex={eq.tex} display /></div>
            <div className="ix-eq-side">
              <button type="button" className="ix-eq-copy" aria-label="Copy LaTeX" title="Copy LaTeX"
                onClick={() => copy(key, eq.tex)}>
                {copied === key ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
              </button>
              {numbered && <span className="ix-eq-num">({i + 1})</span>}
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Card ──────────────────────────────────────────────────────────────── */

function CardDetail({ card, section, course, onSelect, editMode, onEdit, copied, copy }: {
  card: Card; section: Section; course: Course; onSelect: (s: Selection) => void
  editMode: boolean; onEdit: () => void
  copied: string | null; copy: (key: string, text: string) => void
}) {
  const examples = (card.exampleIds ?? [])
    .map(id => course.examples?.find(e => e.id === id))
    .filter((e): e is WorkedExample => !!e)

  return (
    <>
      <div className="ix-doc-eyebrow">
        <span>{splitSectionLabel(section.label).main}</span>
        {card.tag && <><span className="ix-dot-sep" aria-hidden="true" /><span className="ix-doc-tag">{card.tag}</span></>}
      </div>
      <div className="ix-doc-titlebar">
        <h1 className="ix-doc-title">{card.title}</h1>
        {editMode && (
          <button type="button" className="ix-btn" onClick={onEdit}><PencilIcon size={14} /> Edit</button>
        )}
      </div>

      {card.type === 'widget' ? (
        <div className="ix-widget"><InterestTable /></div>
      ) : (
        <EquationBlock eqs={cardEquations(card)} copied={copied} copy={copy} idPrefix={card.id} />
      )}

      {card.tableRows && card.tableRows.length > 0 && (
        <div className="ix-table-wrap">
          <table className="ix-table">
            <thead><tr><th>Symbol</th><th>Value</th><th>Quantity</th></tr></thead>
            <tbody>
              {card.tableRows.map((r, i) => (
                <tr key={i}><td className="ix-table-sym">{r.symbol}</td><td className="ix-table-val">{r.value}</td><td>{r.quantity}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {card.notes && <div className="ix-notes" dangerouslySetInnerHTML={{ __html: card.notes }} />}

      {examples.length > 0 && (
        <section className="ix-related">
          <h2 className="ix-h2">Worked examples</h2>
          <ul className="ix-link-list">
            {examples.map(ex => (
              <li key={ex.id}>
                <button type="button" className="ix-link-row" onClick={() => onSelect({ kind: 'example', id: ex.id })}>
                  <span className="ix-link-qn">Q{ex.number}</span>
                  <span className="ix-link-title">{ex.title}</span>
                  <span className="ix-link-meta">{ex.source}</span>
                  <ArrowRight size={14} className="ix-link-arrow" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}

/* ── Worked example ────────────────────────────────────────────────────── */

function ExampleDetail({ example, course, onSelect, copied, copy }: {
  example: WorkedExample; course: Course; onSelect: (s: Selection) => void
  copied: string | null; copy: (key: string, text: string) => void
}) {
  // Group "text, latex, latex, text, latex…" into numbered steps.
  const steps: { text?: string; eqs: { tex: string; main: boolean }[] }[] = []
  for (const s of example.steps) {
    if (s.text || !steps.length) steps.push({ text: s.text, eqs: [] })
    if (s.latex) steps[steps.length - 1].eqs.push({ tex: s.latex, main: false })
  }

  const usedBy: { card: Card }[] = []
  for (const sec of sortedSections(course))
    for (const card of sec.cards) if (card.exampleIds?.includes(example.id)) usedBy.push({ card })

  return (
    <>
      <div className="ix-doc-eyebrow">
        <span>Worked example</span><span className="ix-dot-sep" aria-hidden="true" />
        <span>{example.source}</span>
      </div>
      <div className="ix-doc-titlebar">
        <h1 className="ix-doc-title"><span className="ix-doc-qn">Q{example.number}</span>{example.title}</h1>
      </div>
      {(example.topics.length > 0 || usedBy.length > 0) && (
        <div className="ix-ex-meta">
          {example.topics.length > 0 && <span className="ix-ex-topics">{example.topics.join(' · ')}</span>}
          {usedBy.length > 0 && (
            <span className="ix-ex-uses">
              Uses
              {usedBy.map(({ card }) => (
                <button type="button" key={card.id} className="ix-inline-link" onClick={() => onSelect({ kind: 'card', id: card.id })}>
                  {card.title}
                </button>
              ))}
            </span>
          )}
        </div>
      )}

      <section className="ix-ex-block">
        <h2 className="ix-h2">Given</h2>
        <ul className="ix-given">{example.given.map((g, i) => <li key={i}>{g}</li>)}</ul>
      </section>

      <section className="ix-ex-block">
        <h2 className="ix-h2">Solution</h2>
        <ol className="ix-steps">
          {steps.map((s, i) => (
            <li key={i} className="ix-step">
              <span className="ix-step-n" aria-hidden="true">{i + 1}</span>
              <div className="ix-step-body">
                {s.text && <p>{s.text}</p>}
                {s.eqs.length > 0 && <EquationBlock eqs={s.eqs} copied={copied} copy={copy} idPrefix={`${example.id}-${i}`} />}
              </div>
            </li>
          ))}
        </ol>
      </section>

      <div className="ix-answer">
        <span className="ix-answer-label">Answer</span>
        <span className="ix-answer-text">{example.answer}</span>
      </div>
      {example.interpretation && <p className="ix-interp">{example.interpretation}</p>}
    </>
  )
}

/* ── Course overview (nothing selected) ────────────────────────────────── */

function CourseOverview({ course, items, onSelect, onJumpSection, editMode, onEditCourse }: Props) {
  const sections = sortedSections(course)
  const formulas = items.filter(i => i.kind === 'card').length
  const examples = course.examples ?? []
  const first = items[0]
  return (
    <>
      <div className="ix-doc-eyebrow">
        <span className="ix-doc-code">{course.code}</span>
        {course.term && <><span className="ix-dot-sep" aria-hidden="true" /><span>{course.term}</span></>}
      </div>
      <div className="ix-doc-titlebar">
        <h1 className="ix-doc-title ix-doc-title--course">{course.name}</h1>
        {editMode && (
          <button type="button" className="ix-btn" onClick={() => onEditCourse(course)}><PencilIcon size={14} /> Edit course</button>
        )}
      </div>
      {course.description && <p className="ix-lede">{course.description}</p>}

      <dl className="ix-stats">
        <div><dt>Sections</dt><dd>{sections.length}</dd></div>
        <div><dt>Formulas</dt><dd>{formulas}</dd></div>
        {examples.length > 0 && <div><dt>Worked examples</dt><dd>{examples.length}</dd></div>}
        {course.sheets && course.sheets.length > 0 && <div><dt>Formula sheets</dt><dd>{course.sheets.length}</dd></div>}
      </dl>

      {course.sheets && course.sheets.length > 0 && (
        <div className="ix-sheets">
          {course.sheets.map(sheet => (
            <a key={sheet.file} className="ix-sheet" href={`${import.meta.env.BASE_URL}formula-sheets/${sheet.file}`}
              target="_blank" rel="noopener noreferrer">
              <FileIcon size={18} />
              <span className="ix-sheet-text">
                <span className="ix-sheet-label">{sheet.label}</span>
                <span className="ix-sheet-file">PDF · opens in new tab</span>
              </span>
              <ArrowRight size={14} className="ix-link-arrow" />
            </a>
          ))}
        </div>
      )}

      {sections.length > 0 && (
        <section className="ix-related">
          <h2 className="ix-h2">Sections</h2>
          <ol className="ix-toc">
            {sections.map((s, i) => {
              const { main, aside } = splitSectionLabel(s.label)
              return (
                <li key={s.id}>
                  <button type="button" className="ix-toc-row" onClick={() => onJumpSection(s)} disabled={!s.cards.length}>
                    <span className="ix-toc-n">{String(i + 1).padStart(2, '0')}</span>
                    <span className="ix-toc-name">{main}{aside && <span className="ix-toc-aside">{aside}</span>}</span>
                    <span className="ix-toc-count">{s.cards.length}</span>
                  </button>
                </li>
              )
            })}
          </ol>
        </section>
      )}

      {examples.length > 0 && (
        <section className="ix-related">
          <h2 className="ix-h2">Worked examples</h2>
          <ul className="ix-link-list">
            {examples.map(ex => (
              <li key={ex.id}>
                <button type="button" className="ix-link-row" onClick={() => onSelect({ kind: 'example', id: ex.id })}>
                  <span className="ix-link-qn">Q{ex.number}</span>
                  <span className="ix-link-title">{ex.title}</span>
                  <span className="ix-link-meta">{ex.topics.join(', ')}</span>
                  <ArrowRight size={14} className="ix-link-arrow" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {first && (
        <p className="ix-hint">
          <FunctionIcon size={14} />
          <span>
            Press <kbd className="ix-kbd">↓</kbd> to step through formulas, <kbd className="ix-kbd">{isMac ? '⌘' : 'Ctrl'} K</kbd> or{' '}
            <kbd className="ix-kbd">/</kbd> to search every course.
          </span>
        </p>
      )}
    </>
  )
}
