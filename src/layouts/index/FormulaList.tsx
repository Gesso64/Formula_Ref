import { memo, useEffect, useRef } from 'react'
import type { Card, Course, Section } from '@/types'
import { previewTex, rowId, sortedCards, sortedSections, splitSectionLabel, stripHtml, type Selection } from './model'
import { Tex } from './Tex'
import { BookIcon, ChevronRight, GridIcon, PencilIcon, PlusIcon, TableIcon } from './icons'

interface Props {
  course: Course
  selected: Selection | null
  onSelect: (sel: Selection) => void
  onOverview: () => void
  editMode: boolean
  onAddCard: (section: Section) => void
  onEditSection: (section: Section) => void
  onAddSection: () => void
  scrollToSection: { id: string; n: number } | null
}

export function FormulaList(p: Props) {
  const { course, selected } = p
  const sections = sortedSections(course)
  const examples = course.examples ?? []
  const total = sections.reduce((n, s) => n + s.cards.length, 0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Keep the selected row visible (keyboard navigation, palette jumps, deep links).
  useEffect(() => {
    if (!selected) return
    document.getElementById(rowId(selected))?.scrollIntoView({ block: 'nearest' })
  }, [selected])

  useEffect(() => {
    if (!p.scrollToSection) return
    const el = document.getElementById(`ix-sec-${p.scrollToSection.id}`)
    if (el && scrollRef.current) scrollRef.current.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }, [p.scrollToSection])

  // New course → start at the top of its list.
  useEffect(() => { scrollRef.current?.scrollTo({ top: 0 }) }, [course.id])

  const isSel = (kind: Selection['kind'], id: string) => selected?.kind === kind && selected.id === id

  return (
    <div className="ix-list">
      <header className="ix-list-head">
        <button type="button" className="ix-list-title" onClick={p.onOverview} aria-pressed={!selected}
          title="Course overview">
          <span className="ix-list-code">{course.code}</span>
          <span className="ix-list-name">{course.name}</span>
          <span className="ix-list-more">Overview, sheets &amp; sections <ChevronRight size={14} /></span>
        </button>
        <span className="ix-list-count">{total} formulas</span>
      </header>

      <div className="ix-list-scroll" ref={scrollRef}>
        {sections.map(section => {
          const { main, aside } = splitSectionLabel(section.label)
          return (
            <section className="ix-sec" key={section.id} id={`ix-sec-${section.id}`} aria-label={section.label}>
              <h3 className="ix-sec-head">
                <span className="ix-sec-name">{main}</span>
                {aside && <span className="ix-sec-aside">{aside}</span>}
                {p.editMode ? (
                  <span className="ix-sec-tools">
                    <button type="button" className="ix-icon-btn ix-icon-btn--sm" aria-label={`Edit section ${main}`}
                      onClick={() => p.onEditSection(section)}><PencilIcon size={13} /></button>
                    <button type="button" className="ix-icon-btn ix-icon-btn--sm" aria-label={`Add card to ${main}`}
                      onClick={() => p.onAddCard(section)}><PlusIcon size={14} /></button>
                  </span>
                ) : <span className="ix-sec-count">{section.cards.length}</span>}
              </h3>
              {sortedCards(section).map(card => (
                <CardRow key={card.id} card={card} selected={isSel('card', card.id)}
                  onSelect={p.onSelect} />
              ))}
              {section.cards.length === 0 && <div className="ix-row-empty">No formulas yet</div>}
            </section>
          )
        })}

        {examples.length > 0 && (
          <section className="ix-sec" id="ix-sec-examples" aria-label="Worked examples">
            <h3 className="ix-sec-head">
              <span className="ix-sec-name">Worked examples</span>
              <span className="ix-sec-count">{examples.length}</span>
            </h3>
            {examples.map(ex => {
              const sel = { kind: 'example', id: ex.id } as const
              return (
                <button type="button" key={ex.id} id={rowId(sel)} className="ix-row ix-row--ex"
                  aria-current={isSel('example', ex.id) || undefined} onClick={() => p.onSelect(sel)}>
                  <span className="ix-row-top">
                    <span className="ix-row-qn">Q{ex.number}</span>
                    <span className="ix-row-title">{ex.title}</span>
                  </span>
                  <span className="ix-row-sub">
                    <BookIcon size={12} /> {ex.source}{ex.topics.length ? ` · ${ex.topics.join(', ')}` : ''}
                  </span>
                </button>
              )
            })}
          </section>
        )}

        {p.editMode && (
          <div className="ix-list-add">
            <button type="button" className="ix-add-btn" onClick={p.onAddSection}><PlusIcon size={14} /> Add section</button>
          </div>
        )}
        {sections.length === 0 && !p.editMode && (
          <div className="ix-list-empty">This course has no formulas yet. Turn on Edit mode to add some.</div>
        )}
      </div>
    </div>
  )
}

const CardRow = memo(function CardRow({ card, selected, onSelect }: {
  card: Card; selected: boolean; onSelect: (sel: Selection) => void
}) {
  const sel: Selection = { kind: 'card', id: card.id }
  const tex = previewTex(card)
  let sub: React.ReactNode
  if (card.type === 'widget') sub = <span className="ix-row-sub"><GridIcon size={12} /> Interactive table</span>
  else if (tex) sub = <span className="ix-row-tex" aria-hidden="true"><Tex tex={tex} /></span>
  else if (card.tableRows?.length) sub = <span className="ix-row-sub"><TableIcon size={12} /> {card.tableRows.length} values</span>
  else if (card.notes) sub = <span className="ix-row-sub ix-row-sub--text">{stripHtml(card.notes)}</span>
  else sub = <span className="ix-row-sub" />

  return (
    <button type="button" id={rowId(sel)} className="ix-row" aria-current={selected || undefined}
      onClick={() => onSelect(sel)}>
      <span className="ix-row-title">{card.title}</span>
      <span className="ix-row-bottom">
        {sub}
        {card.tag && <span className="ix-row-tag">{card.tag}</span>}
      </span>
    </button>
  )
})
