import { memo, useMemo } from 'react'
import { renderLatex } from '@/lib/katex'
import { InterestTable } from '@/components/cards/InterestTable'
import type { Card, WorkedExample } from '@/types'
import type { DocSection, ExampleGroup } from './search'
import { latexHit } from './search'
import { Icon } from './Icon'

// ─── Math ───────────────────────────────────────────────────────────────────

function MathLine({ tex, display, hit }: { tex: string; display?: boolean; hit?: boolean }) {
  const html = useMemo(() => renderLatex(tex, display), [tex, display])
  return <div className={`hb-math${hit ? ' is-hit' : ''}`} dangerouslySetInnerHTML={{ __html: html }} />
}

function visualLength(tex: string): number {
  return tex
    .replace(/\\(?:quad|qquad|[,;!])/g, ' ')
    .replace(/\\(?:dfrac|tfrac|frac|left|right|text|mathrm|operatorname)/g, '')
    .replace(/\\[a-zA-Z]+/g, 'x')
    .replace(/[{}^_\s]/g, '').length
}

/** Plain-text table cells sometimes use TeX-ish "s^2" / "ρ_air"; typeset those as sup/sub. */
function richText(s: string) {
  const re = /([\^_])(?:\{([^{}]*)\}|([A-Za-z0-9]+))/g
  if (!re.test(s)) return s
  re.lastIndex = 0
  const out: (string | React.JSX.Element)[] = []
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(s.slice(last, m.index))
    const body = m[2] ?? m[3]
    out.push(m[1] === '^' ? <sup key={m.index}>{body}</sup> : <sub key={m.index}>{body}</sub>)
    last = m.index + m[0].length
  }
  if (last < s.length) out.push(s.slice(last))
  return out
}

// ─── Formula document ───────────────────────────────────────────────────────

interface RowProps {
  card: Card
  sec: DocSection
  terms: string[]
  editMode: boolean
  exampleNums: Map<string, number>
  onEdit: (card: Card, sec: DocSection) => void
  onExample: (id: string) => void
}

const RefRow = memo(function RefRow({ card, sec, terms, editMode, exampleNums, onEdit, onExample }: RowProps) {
  const subs = card.subs ?? []
  const longest = Math.max(0, ...subs.map(s => visualLength(s.latex)))
  const grid = subs.length >= 2 && longest <= 30
  const cell = { ['--hb-cell' as string]: `${Math.max(140, Math.round(longest * 10.5 + 20))}px` }
  const examples = (card.exampleIds ?? []).filter(id => exampleNums.has(id))
  const isWidget = card.type === 'widget'

  return (
    <article id={`hb-card-${card.id}`} data-hb-row={card.id}
      className={`hb-row${isWidget ? ' hb-row--wide' : ''}${editMode ? ' is-editing' : ''}`}>
      <div className="hb-row-head">
        <h3 className="hb-row-title">{card.title}</h3>
        {card.tag && <div className="hb-row-tag">{card.tag}</div>}
      </div>
      <div className="hb-row-body">
        {isWidget ? (
          <div className="hb-widget"><InterestTable /></div>
        ) : (
          <>
            {card.formula && <MathLine tex={card.formula} display={card.formulaDisplay} hit={latexHit(card.formula, terms)} />}
            {subs.length > 0 && (
              <div className={grid ? 'hb-subs hb-subs--grid' : 'hb-subs'} style={grid ? cell : undefined}>
                {subs.map((s, i) => <MathLine key={i} tex={s.latex} display={s.displayMode} hit={latexHit(s.latex, terms)} />)}
              </div>
            )}
            {card.tableRows && card.tableRows.length > 0 && (
              <div className="hb-table-wrap">
                <table className="hb-table">
                  <thead><tr><th scope="col">Symbol</th><th scope="col">Value</th><th scope="col">Quantity</th></tr></thead>
                  <tbody>
                    {card.tableRows.map((r, i) => (
                      <tr key={i}><td className="hb-sym">{richText(r.symbol)}</td><td className="hb-val">{richText(r.value)}</td><td>{richText(r.quantity)}</td></tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {card.notes && <div className="hb-notes" dangerouslySetInnerHTML={{ __html: card.notes }} />}
          </>
        )}
        {examples.length > 0 && (
          <div className="hb-xref">
            <span className="hb-xref-label">Worked {examples.length > 1 ? 'examples' : 'example'}</span>
            {examples.map(id => (
              <button key={id} type="button" className="hb-xref-link" onClick={() => onExample(id)}>
                Q{exampleNums.get(id)}<Icon name="arrowRight" size={12} />
              </button>
            ))}
          </div>
        )}
      </div>
      {editMode && (
        <button type="button" className="hb-row-edit" onClick={() => onEdit(card, sec)} aria-label={`Edit “${card.title}”`}>
          <Icon name="pencil" size={14} /><span>Edit</span>
        </button>
      )}
    </article>
  )
})

interface FormulaDocProps {
  sections: DocSection[]
  terms: string[]
  editMode: boolean
  exampleNums: Map<string, number>
  onEditCard: (card: Card, sec: DocSection) => void
  onAddCard: (sec: DocSection) => void
  onEditSection: (sec: DocSection) => void
  onAddSection: () => void
  onExample: (id: string) => void
}

export function FormulaDoc({ sections, terms, editMode, exampleNums, onEditCard, onAddCard, onEditSection, onAddSection, onExample }: FormulaDocProps) {
  const searching = terms.length > 0
  const shown = searching ? sections.filter(s => s.cards.length > 0) : sections
  return (
    <>
      {shown.map(sec => (
        <section key={sec.section.id} className="hb-sec" aria-labelledby={`hb-sec-${sec.section.id}`}>
          <header className="hb-sec-head" id={`hb-sec-${sec.section.id}`} data-hb-group={sec.section.id}>
            <span className="hb-sec-num" aria-hidden="true">{String(sec.num).padStart(2, '0')}</span>
            <h2 className="hb-sec-title">
              {sec.title}
              {sec.ref && <span className="hb-sec-ref">{sec.ref}</span>}
            </h2>
            {editMode && (
              <div className="hb-sec-actions">
                <button type="button" className="hb-ghost" onClick={() => onAddCard(sec)}><Icon name="plus" size={14} />Add formula</button>
                <button type="button" className="hb-ghost" onClick={() => onEditSection(sec)}><Icon name="pencil" size={14} />Edit section</button>
              </div>
            )}
          </header>
          {sec.cards.map(card => (
            <RefRow key={card.id} card={card} sec={sec} terms={terms} editMode={editMode} exampleNums={exampleNums}
              onEdit={onEditCard} onExample={onExample} />
          ))}
          {sec.cards.length === 0 && <p className="hb-empty-sec">No formulas in this section yet.</p>}
        </section>
      ))}
      {editMode && !searching && (
        <button type="button" className="hb-add-section" onClick={onAddSection}>
          <Icon name="plus" size={14} />Add section
        </button>
      )}
    </>
  )
}

// ─── Worked examples document ───────────────────────────────────────────────

interface ExampleDocProps {
  groups: ExampleGroup[]
  terms: string[]
  backlinks: Map<string, { id: string; title: string }[]>
  onCard: (id: string) => void
}

const ExampleRow = memo(function ExampleRow({ ex, terms, refs, onCard }: {
  ex: WorkedExample; terms: string[]; refs: { id: string; title: string }[]; onCard: (id: string) => void
}) {
  return (
    <article id={`hb-ex-${ex.id}`} data-hb-row={ex.id} className="hb-row hb-ex">
      <div className="hb-row-head">
        <div className="hb-ex-num">Q{ex.number}</div>
        {ex.topics.length > 0 && <div className="hb-row-tag">{ex.topics.join(' · ')}</div>}
      </div>
      <div className="hb-row-body">
        <h3 className="hb-ex-title">{ex.title}</h3>
        {ex.given.length > 0 && (
          <div className="hb-ex-block">
            <h4 className="hb-ex-label">Given</h4>
            <ul className="hb-ex-given">{ex.given.map((g, i) => <li key={i}>{g}</li>)}</ul>
          </div>
        )}
        <div className="hb-ex-block">
          <h4 className="hb-ex-label">Solution</h4>
          <div className="hb-ex-steps">
            {ex.steps.map((s, i) => (
              <div key={i} className="hb-ex-step">
                {s.text && <p>{s.text}</p>}
                {s.latex && <MathLine tex={s.latex} display={s.displayMode} hit={latexHit(s.latex, terms)} />}
              </div>
            ))}
          </div>
        </div>
        <div className="hb-ex-answer"><span className="hb-ex-answer-label">Answer</span><span>{ex.answer}</span></div>
        {ex.interpretation && <p className="hb-ex-interp">{ex.interpretation}</p>}
        {refs.length > 0 && (
          <div className="hb-xref">
            <span className="hb-xref-label">Formulas used</span>
            {refs.map(r => (
              <button key={r.id} type="button" className="hb-xref-link" onClick={() => onCard(r.id)}>
                <Icon name="cornerUpLeft" size={12} />{r.title}
              </button>
            ))}
          </div>
        )}
      </div>
    </article>
  )
})

export function ExampleDoc({ groups, terms, backlinks, onCard }: ExampleDocProps) {
  const shown = groups.filter(g => g.examples.length > 0)
  return (
    <>
      {shown.map((g, gi) => (
        <section key={g.id} className="hb-sec" aria-labelledby={`hb-grp-${g.id}`}>
          <header className="hb-sec-head" id={`hb-grp-${g.id}`} data-hb-group={g.id}>
            <span className="hb-sec-num" aria-hidden="true">{String(gi + 1).padStart(2, '0')}</span>
            <h2 className="hb-sec-title">
              {g.label}
              <span className="hb-sec-ref">{g.total} {g.total === 1 ? 'question' : 'questions'}</span>
            </h2>
          </header>
          {g.examples.map(ex => (
            <ExampleRow key={ex.id} ex={ex} terms={terms} refs={backlinks.get(ex.id) ?? []} onCard={onCard} />
          ))}
        </section>
      ))}
    </>
  )
}
