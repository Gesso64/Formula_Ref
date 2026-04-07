import { useState, useMemo } from 'react'
import { FormulaCard } from '@/components/cards/FormulaCard'
import { InterestTable } from '@/components/cards/InterestTable'
import { CardEditor } from '@/components/cards/CardEditor'
import { SectionEditor } from '@/components/courses/SectionEditor'
import { useCourses } from '@/hooks/useCourses'
import type { Card, Section } from '@/types'

export function CardGrid() {
  const { activeCourse } = useCourses()
  const [search, setSearch] = useState('')
  const [activeCat, setActiveCat] = useState('all')
  const [editCard, setEditCard] = useState<{ card?: Card; section: Section } | null>(null)
  const [editSection, setEditSection] = useState<{ section?: Section; order: number } | null>(null)

  const sections = activeCourse?.sections ?? []

  const cats = useMemo(() => {
    const seen = new Set<string>()
    const out: { cat: string; label: string }[] = []
    sections.forEach(s => {
      if (!seen.has(s.cat)) { seen.add(s.cat); out.push({ cat: s.cat, label: s.label.replace(/ \(Ch\..*?\)/, '').replace(/ —.*$/, '') }) }
    })
    return out
  }, [sections])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return sections
      .filter(s => activeCat === 'all' || s.cat === activeCat)
      .map(s => ({
        ...s,
        cards: s.cards.filter(c =>
          !q || [c.title, c.tag, c.notes ?? ''].join(' ').toLowerCase().includes(q)
        ).sort((a, b) => a.order - b.order)
      }))
      .filter(s => s.cards.length > 0)
  }, [sections, activeCat, search])

  if (!activeCourse) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-text3)', fontSize: 14 }}>
      No course selected
    </div>
  )

  const accent = activeCourse.accent

  return (
    <div style={{ flex: 1, minWidth: 0, padding: '1.5rem 1.2rem 6rem', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      {/* Header */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ fontSize: 10.5, fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-text3)', textTransform: 'uppercase' }}>
          {activeCourse.code} · {activeCourse.name}
        </div>
        <h1 style={{ fontSize: 21, fontWeight: 500, marginBottom: 2 }}>Formula & Concept Reference</h1>
        <div style={{ fontSize: 12, color: 'var(--color-text2)' }}>{activeCourse.description}</div>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 300, margin: '1rem 0 0.5rem' }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--color-text3)', pointerEvents: 'none' }}>⌕</span>
        <input value={search} onChange={e => { setSearch(e.target.value); setActiveCat('all') }}
          placeholder="Search formulas…"
          style={{ width: '100%', fontSize: 12.5, padding: '6px 12px 6px 30px', borderRadius: 99, border: '0.5px solid var(--color-border2)', background: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none' }} />
      </div>

      {/* Pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1rem' }}>
        {[{ cat: 'all', label: 'All Topics' }, ...cats].map(({ cat, label }) => (
          <button key={cat} onClick={() => setActiveCat(cat)}
            style={{ fontSize: 11, padding: '4px 11px', borderRadius: 99, border: '0.5px solid', cursor: 'pointer',
              borderColor: activeCat === cat ? accent : 'var(--color-border)',
              background: activeCat === cat ? activeCourse.accentBg : 'var(--color-bg2)',
              color: activeCat === cat ? activeCourse.accentFg : 'var(--color-text2)',
              fontFamily: 'inherit' }}>
            {label}
          </button>
        ))}
      </div>

      {/* Sections */}
      {filtered.map(section => (
        <div key={section.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text3)', margin: '1.4rem 0 0.5rem', paddingBottom: 5, borderBottom: '0.5px solid var(--color-border)' }}>
            <span style={{ flex: 1 }}>{section.label}</span>
            <button onClick={() => setEditSection({ section, order: section.order })}
              style={{ fontSize: 11, padding: '2px 8px', borderRadius: 5, border: '0.5px solid var(--color-border)', background: 'transparent', color: 'var(--color-text3)', cursor: 'pointer', fontFamily: 'inherit' }}>
              Edit section
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 9 }}>
            {section.cards.map(card => (
              card.type === 'widget'
                ? <div key={card.id} style={{ gridColumn: '1 / -1', background: 'var(--color-surface)', border: '0.5px solid var(--color-border)', borderRadius: 12, padding: '12px 14px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 99, background: card.tagBg, color: card.tagColor }}>{card.tag}</span>
                      <span style={{ fontSize: 13, fontWeight: 500 }}>{card.title}</span>
                    </div>
                    <InterestTable />
                  </div>
                : <FormulaCard key={card.id} card={card} onEdit={() => setEditCard({ card, section })} />
            ))}
            {/* Add card button */}
            <button onClick={() => setEditCard({ section })}
              style={{ minHeight: 80, border: '1.5px dashed var(--color-border2)', borderRadius: 12, background: 'transparent', color: 'var(--color-text3)', cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontFamily: 'inherit' }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>+</span> Add card
            </button>
          </div>
        </div>
      ))}

      {/* Add section */}
      <button onClick={() => setEditSection({ order: sections.length })}
        style={{ marginTop: '2rem', width: '100%', padding: '12px', border: '1.5px dashed var(--color-border2)', borderRadius: 12, background: 'transparent', color: 'var(--color-text3)', cursor: 'pointer', fontSize: 13, fontFamily: 'inherit' }}>
        + Add section
      </button>

      {filtered.length === 0 && !editCard && (
        <div style={{ textAlign: 'center', color: 'var(--color-text3)', fontSize: 14, padding: '3rem' }}>No matching formulas.</div>
      )}

      {/* Modals */}
      {editCard && (
        <CardEditor courseId={activeCourse.id} section={editCard.section} card={editCard.card} onClose={() => setEditCard(null)} />
      )}
      {editSection && (
        <SectionEditor courseId={activeCourse.id} section={editSection.section} order={editSection.order} onClose={() => setEditSection(null)} />
      )}
    </div>
  )
}
