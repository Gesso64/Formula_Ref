import { useState, useEffect, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { renderLatex } from '@/lib/katex'
import { useCourses } from '@/hooks/useCourses'
import type { Card, Section, SubFormula, TableRow } from '@/types'

const PRESET_TAGS = [
  { bg: '#EEEDFE', color: '#3C3489' }, { bg: '#E1F5EE', color: '#0F6E56' },
  { bg: '#FAECE7', color: '#712B13' }, { bg: '#FAEEDA', color: '#633806' },
  { bg: '#E6F1FB', color: '#0C447C' }, { bg: '#FBEAF0', color: '#72243E' },
  { bg: '#EAF3DE', color: '#3B6D11' }, { bg: '#E8EAF6', color: '#283593' },
  { bg: '#FEF9C3', color: '#713F12' }, { bg: '#FEE2E2', color: '#7F1D1D' },
  { bg: '#DCFCE7', color: '#14532D' }, { bg: '#E0F2FE', color: '#0C4A6E' },
  { bg: '#F3E8FF', color: '#581C87' }, { bg: '#FFF7ED', color: '#7C2D12' },
  { bg: '#F0FDF4', color: '#166534' }, { bg: '#FFF1F2', color: '#881337' },
  { bg: '#ECFDF5', color: '#065F46' }, { bg: '#D1FAE5', color: '#064E3B' },
  { bg: '#FEF3C7', color: '#92400E' }, { bg: '#F3F4F6', color: '#374151' },
]

type FormulaMode = 'none' | 'single' | 'subs' | 'table'

interface Props {
  courseId: string
  section: Section
  card?: Card
  onClose: () => void
}

export function CardEditor({ courseId, section, card, onClose }: Props) {
  const { upsertCard, deleteCard } = useCourses()

  const [title, setTitle] = useState(card?.title ?? '')
  const [tag, setTag] = useState(card?.tag ?? '')
  const [tagBg, setTagBg] = useState(card?.tagBg ?? PRESET_TAGS[0].bg)
  const [tagColor, setTagColor] = useState(card?.tagColor ?? PRESET_TAGS[0].color)
  const [mode, setMode] = useState<FormulaMode>(() => {
    if (card?.tableRows?.length) return 'table'
    if (card?.subs?.length) return 'subs'
    if (card?.formula) return 'single'
    return 'none'
  })
  const [formula, setFormula] = useState(card?.formula ?? '')
  const [displayMode, setDisplayMode] = useState(card?.formulaDisplay ?? true)
  const [subs, setSubs] = useState<SubFormula[]>(card?.subs?.length ? card.subs : [{ latex: '' }])
  const [tableRows, setTableRows] = useState<TableRow[]>(card?.tableRows?.length ? card.tableRows : [{ symbol: '', value: '', quantity: '' }])
  const [notes, setNotes] = useState(card?.notes ?? '')
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)

  // Live preview
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mode === 'single' && formula) {
        try { setPreview(renderLatex(formula, displayMode)) } catch { setPreview('') }
      } else if (mode === 'subs') {
        setPreview(subs.map(s => s.latex ? renderLatex(s.latex, s.displayMode) : '').join(' &nbsp; '))
      } else setPreview('')
    }, 150)
    return () => clearTimeout(timer)
  }, [formula, displayMode, subs, mode])

  const save = async () => {
    if (!title.trim()) return
    setSaving(true)
    const base = { id: card?.id ?? uuid(), title, tag, tagBg, tagColor, order: card?.order ?? section.cards.length }
    let c: Card = { ...base }
    if (mode === 'single') c = { ...c, formula, formulaDisplay: displayMode }
    if (mode === 'subs') c = { ...c, subs: subs.filter(s => s.latex) }
    if (mode === 'table') c = { ...c, tableRows: tableRows.filter(r => r.symbol || r.value) }
    if (notes) c.notes = notes
    await upsertCard(courseId, section.id, c)
    setSaving(false)
    onClose()
  }

  const del = async () => {
    if (card && confirm('Delete this card?')) {
      await deleteCard(courseId, section.id, card.id)
      onClose()
    }
  }

  const inp: React.CSSProperties = { width: '100%', fontSize: 13, padding: '7px 10px', borderRadius: 7, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text)', outline: 'none', fontFamily: 'inherit' }
  const monoInp: React.CSSProperties = { ...inp, fontFamily: 'var(--font-mono, monospace)', fontSize: 12 }

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ModalHeader title={card ? 'Edit Card' : 'New Card'} onClose={onClose} />

        <label style={labelStyle}>Title
          <input style={inp} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Newton's Second Law" autoFocus />
        </label>

        <div style={{ display: 'flex', gap: 10 }}>
          <label style={{ ...labelStyle, flex: 1 }}>Tag label
            <input style={inp} value={tag} onChange={e => setTag(e.target.value)} placeholder="e.g. Force" />
          </label>
          <label style={labelStyle}>Preview
            <span style={{ display: 'inline-flex', alignItems: 'center', padding: '6px 12px', borderRadius: 99, background: tagBg, color: tagColor, fontSize: 12, fontWeight: 700, minHeight: 34 }}>{tag || 'Tag'}</span>
          </label>
        </div>

        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Tag colour</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {PRESET_TAGS.map(p => (
              <button key={p.bg} onClick={() => { setTagBg(p.bg); setTagColor(p.color) }}
                style={{ width: 22, height: 22, borderRadius: 99, background: p.bg, border: tagBg === p.bg ? `2px solid ${p.color}` : '1.5px solid transparent', cursor: 'pointer' }} />
            ))}
          </div>
        </div>

        {/* Formula mode */}
        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>Formula type</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {(['none','single','subs','table'] as FormulaMode[]).map(m => (
              <button key={m} onClick={() => setMode(m)}
                style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, border: '0.5px solid var(--color-border2)', background: mode === m ? 'var(--color-text)' : 'var(--color-bg2)', color: mode === m ? 'var(--color-bg)' : 'var(--color-text2)', cursor: 'pointer' }}>
                {m === 'none' ? 'None' : m === 'single' ? 'Single formula' : m === 'subs' ? 'Sub-row' : 'Table'}
              </button>
            ))}
          </div>
        </div>

        {mode === 'single' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>LaTeX</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--color-text2)', cursor: 'pointer' }}>
                <input type="checkbox" checked={displayMode} onChange={e => setDisplayMode(e.target.checked)} /> Display mode
              </label>
            </div>
            <textarea style={{ ...monoInp, minHeight: 64, resize: 'vertical' }} value={formula} onChange={e => setFormula(e.target.value)} placeholder="\frac{F}{ma}" />
            {preview && <div style={{ background: 'var(--color-bg2)', borderRadius: 8, padding: '8px 12px', overflowX: 'auto' }} dangerouslySetInnerHTML={{ __html: preview }} />}
          </div>
        )}

        {mode === 'subs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Sub-formulas</div>
            {subs.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <textarea style={{ ...monoInp, flex: 1, minHeight: 40, resize: 'vertical' }}
                  value={s.latex} onChange={e => setSubs(subs.map((x,j) => j===i ? { ...x, latex: e.target.value } : x))}
                  placeholder={`Formula ${i+1}`} />
                <button onClick={() => setSubs(subs.filter((_,j) => j !== i))} style={{ fontSize: 16, color: 'var(--color-text3)', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
              </div>
            ))}
            <button onClick={() => setSubs([...subs, { latex: '' }])} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text2)', cursor: 'pointer', alignSelf: 'flex-start' }}>+ Add</button>
            {preview && <div style={{ background: 'var(--color-bg2)', borderRadius: 8, padding: '8px 12px', overflowX: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8 }} dangerouslySetInnerHTML={{ __html: preview }} />}
          </div>
        )}

        {mode === 'table' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Table rows (Symbol / Value / Quantity)</div>
            {tableRows.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: 5 }}>
                {(['symbol','value','quantity'] as (keyof TableRow)[]).map(k => (
                  <input key={k} style={{ ...inp, flex: 1, fontSize: 12 }} placeholder={k}
                    value={r[k]} onChange={e => setTableRows(tableRows.map((x,j) => j===i ? { ...x, [k]: e.target.value } : x))} />
                ))}
                <button onClick={() => setTableRows(tableRows.filter((_,j) => j !== i))} style={{ fontSize: 16, color: 'var(--color-text3)', background: 'none', border: 'none', cursor: 'pointer' }}>×</button>
              </div>
            ))}
            <button onClick={() => setTableRows([...tableRows, { symbol: '', value: '', quantity: '' }])} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text2)', cursor: 'pointer', alignSelf: 'flex-start' }}>+ Add row</button>
          </div>
        )}

        <label style={labelStyle}>Notes <span style={{ fontWeight: 400, color: 'var(--color-text3)' }}>(HTML: &lt;strong&gt;, &lt;br&gt;, &lt;code&gt;)</span>
          <textarea style={{ ...inp, minHeight: 64, resize: 'vertical' }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Optional notes..." />
        </label>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 4 }}>
          {card && <button onClick={del} style={{ ...btnStyle, background: '#fee2e2', color: '#7f1d1d', marginRight: 'auto' }}>Delete</button>}
          <button onClick={onClose} style={{ ...btnStyle, background: 'var(--color-bg2)', color: 'var(--color-text2)' }}>Cancel</button>
          <button onClick={save} disabled={!title.trim() || saving} style={{ ...btnStyle, background: 'var(--color-text)', color: 'var(--color-bg)', opacity: !title.trim() || saving ? 0.5 : 1 }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </Overlay>
  )
}

// ─── Shared modal primitives ───────────────────────────────────────────────

export function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 1000, padding: '0 0 env(safe-area-inset-bottom)' }}>
      <div style={{ background: 'var(--color-surface)', width: '100%', maxWidth: 600, maxHeight: '90dvh', overflowY: 'auto', borderRadius: '16px 16px 0 0', padding: 20, boxShadow: '0 -8px 40px rgba(0,0,0,0.2)' }}>
        {children}
      </div>
    </div>
  )
}

export function ModalHeader({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text)' }}>{title}</span>
      <button onClick={onClose} style={{ fontSize: 20, color: 'var(--color-text3)', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>×</button>
    </div>
  )
}

const labelStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 5, fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }
const btnStyle: React.CSSProperties = { fontSize: 13, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: 'inherit' }
