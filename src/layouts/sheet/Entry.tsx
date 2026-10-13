import { memo, useMemo } from 'react'
import { renderLatex } from '@/lib/katex'
import { InterestTable } from '@/components/cards/InterestTable'
import type { Card } from '@/types'
import { tagHint } from './model'
import { IconPencil, IconPin } from './icons'

interface EntryProps {
  card: Card
  editing: boolean
  onEdit: (card: Card) => void
  exampleNumbers: Map<string, number>
  onExample: (id: string) => void
  /** Combined layouts: open the entry in the inspector / focus view. */
  onOpen?: (card: Card) => void
  selected?: boolean
  /** Workspace layout: pin toggle for “My sheet”. */
  pinned?: boolean
  onPin?: (card: Card) => void
}

/** One formula entry, set as a label-rail row: name + hint on the left, formulas + terse note on the right. */
export const Entry = memo(function Entry({ card, editing, onEdit, exampleNumbers, onExample, onOpen, selected, pinned, onPin }: EntryProps) {
  const formulaHtml = useMemo(
    () => (card.formula ? renderLatex(card.formula, card.formulaDisplay) : ''),
    [card.formula, card.formulaDisplay],
  )
  const subsHtml = useMemo(
    () => (card.subs ?? []).filter(s => s.latex.trim()).map(s => renderLatex(s.latex, s.displayMode)),
    [card.subs],
  )
  const hint = tagHint(card)
  const hasTable = (card.tableRows?.length ?? 0) > 0
  const isWidget = card.type === 'widget'
  const examples = (card.exampleIds ?? [])
    .map(id => ({ id, n: exampleNumbers.get(id) }))
    .filter((x): x is { id: string; n: number } => x.n != null)

  const cls = ['sh-entry', hasTable || isWidget ? 'sh-entry--wide' : '', editing ? 'sh-entry--editing' : '',
    onOpen && !editing ? 'sh-entry--open' : '', selected ? 'sh-entry--selected' : ''].join(' ')

  return (
    <article className={cls} data-entry="" data-card={card.id}
      onClick={editing ? () => onEdit(card) : onOpen ? () => onOpen(card) : undefined}>
      <div className="sh-label">
        <h3 className="sh-name">{card.title}</h3>
        {hint && <div className="sh-hint">{hint}</div>}
        {examples.length > 0 && (
          <div className="sh-exlinks">
            <span className="sh-exlinks-label">Ex.</span>
            {examples.map(x => (
              <button key={x.id} type="button" className="sh-exlink"
                aria-label={`Open worked example Q${x.n}`}
                onClick={e => { e.stopPropagation(); onExample(x.id) }}>
                Q{x.n}
              </button>
            ))}
          </div>
        )}
        {onPin && (
          <button type="button" className={`sh-pin${pinned ? ' is-on' : ''}`} aria-pressed={!!pinned}
            aria-label={pinned ? `Unpin “${card.title}” from My sheet` : `Pin “${card.title}” to My sheet`}
            title={pinned ? 'Unpin from My sheet' : 'Pin to My sheet'}
            onClick={e => { e.stopPropagation(); onPin(card) }}>
            <IconPin size={13} />{pinned ? 'Pinned' : 'Pin'}
          </button>
        )}
        {editing && (
          <button type="button" className="sh-iconbtn sh-entry-edit" aria-label={`Edit “${card.title}”`}
            onClick={e => { e.stopPropagation(); onEdit(card) }}>
            <IconPencil size={14} />
          </button>
        )}
      </div>

      <div className="sh-content">
        {isWidget && <div className="sh-widget" onClick={e => e.stopPropagation()}><InterestTable /></div>}

        {hasTable && (
          <div className="sh-table-wrap">
            <table className="sh-table">
              <tbody>
                {card.tableRows!.map((r, i) => (
                  <tr key={i}>
                    <td className={`sh-table-sym${r.symbol.length > 14 ? ' is-long' : ''}`}>{r.symbol}</td>
                    <td className={`sh-table-val${r.value.length > 26 ? ' is-long' : ''}`}>{r.value}</td>
                    <td className="sh-table-qty">{r.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {formulaHtml && <div className="sh-f sh-f--key" dangerouslySetInnerHTML={{ __html: formulaHtml }} />}

        {subsHtml.length > 0 && (
          <div className="sh-subs">
            {subsHtml.map((html, i) => <div key={i} className="sh-f" dangerouslySetInnerHTML={{ __html: html }} />)}
          </div>
        )}

        {card.notes && <div className="sh-note" dangerouslySetInnerHTML={{ __html: card.notes }} />}

      </div>
    </article>
  )
})
