import { renderLatex } from '@/lib/katex'
import type { Card } from '@/types'

interface Props {
  card: Card
  onEdit?: () => void
  onExampleClick?: (id: string) => void
  exampleNumbers?: Map<string, number>
}

export function FormulaCard({ card, onEdit, onExampleClick, exampleNumbers }: Props) {
  return (
    <div
      className="card-root group"
      style={{ background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 12, padding: '12px 14px 14px', transition: 'border-color .15s', cursor: onEdit ? 'pointer' : 'default' }}
      onClick={onEdit}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 9 }}>
        <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, whiteSpace: 'nowrap', flexShrink: 0, background: card.tagBg, color: card.tagColor }}>
          {card.tag}
        </span>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)', flex: 1, lineHeight: 1.4 }}>
          {card.title}
        </span>
        {onEdit && (
          <button
            onClick={e => { e.stopPropagation(); onEdit() }}
            style={{ opacity: 0, fontSize: 11, padding: '2px 6px', borderRadius: 5, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text2)', cursor: 'pointer', transition: 'opacity .15s', flexShrink: 0 }}
            className="edit-btn"
          >
            Edit
          </button>
        )}
      </div>

      {/* Table rows */}
      {card.tableRows && card.tableRows.length > 0 && (
        <table style={{ width: '100%', fontSize: 11.5, borderCollapse: 'collapse', color: 'var(--color-text2)' }}>
          <thead>
            <tr>
              {['Symbol', 'Value', 'Quantity'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '3px 6px 3px 0', color: 'var(--color-text)', fontWeight: 500, borderBottom: '0.5px solid var(--color-border)', fontSize: 11 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {card.tableRows.map((r, i) => (
              <tr key={i}>
                <td style={{ padding: '3px 0', fontWeight: 500, color: 'var(--color-text)' }}>{r.symbol}</td>
                <td style={{ padding: '3px 6px' }}>{r.value}</td>
                <td style={{ padding: '3px 6px' }}>{r.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Single formula */}
      {card.formula && (
        <div style={{ background: 'var(--color-bg2)', borderRadius: 8, padding: '8px 11px', marginBottom: 8, fontSize: 13, overflowX: 'auto' }}
          dangerouslySetInnerHTML={{ __html: renderLatex(card.formula, card.formulaDisplay) }}
        />
      )}

      {/* Sub-formulas */}
      {card.subs && card.subs.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 7 }}>
          {card.subs.map((s, i) => (
            <div key={i} style={{ flex: '1', minWidth: 105, background: 'var(--color-bg2)', borderRadius: 8, padding: '7px 9px', fontSize: 12, overflowX: 'auto' }}
              dangerouslySetInnerHTML={{ __html: renderLatex(s.latex, s.displayMode) }}
            />
          ))}
        </div>
      )}

      {/* Notes */}
      {card.notes && (
        <div style={{ fontSize: 12, color: 'var(--color-text2)', lineHeight: 1.65 }}
          dangerouslySetInnerHTML={{ __html: card.notes }}
        />
      )}

      {/* Worked example links */}
      {onExampleClick && card.exampleIds && card.exampleIds.length > 0 && (
        <div style={{ marginTop: 7, display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 9.5, color: 'var(--color-text3)', fontWeight: 500 }}>See:</span>
          {card.exampleIds.map(id => {
            const num = exampleNumbers?.get(id)
            if (num == null) return null
            return (
              <button
                key={id}
                onClick={e => { e.stopPropagation(); onExampleClick(id) }}
                style={{
                  fontSize: 9.5, padding: '1px 7px', borderRadius: 99,
                  border: `0.5px solid ${card.tagColor}80`,
                  background: card.tagBg, color: card.tagColor,
                  cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700,
                  lineHeight: 1.7,
                }}
              >
                Q{num}
              </button>
            )
          })}
        </div>
      )}

    </div>
  )
}
