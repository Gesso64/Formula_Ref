import { useState, useMemo } from 'react'
import { useCourses } from '@/hooks/useCourses'
import { ExampleCard } from './ExampleCard'

export function ExamplesView() {
  const { activeCourse } = useCourses()
  const [search, setSearch] = useState('')
  const [activeTopic, setActiveTopic] = useState('all')

  const examples = activeCourse?.examples ?? []

  const topics = useMemo(() => {
    const seen = new Set<string>()
    const out: string[] = []
    examples.forEach(ex => {
      ex.topics.forEach(t => {
        if (!seen.has(t)) { seen.add(t); out.push(t) }
      })
    })
    return out
  }, [examples])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    return examples.filter(ex => {
      const matchesTopic = activeTopic === 'all' || ex.topics.includes(activeTopic)
      const matchesSearch = !q || [ex.title, ex.source, ...ex.topics, ...ex.given].join(' ').toLowerCase().includes(q)
      return matchesTopic && matchesSearch
    })
  }, [examples, activeTopic, search])

  if (!activeCourse) return null

  const accent = activeCourse.accent
  const accentBg = activeCourse.accentBg
  const accentFg = activeCourse.accentFg

  if (examples.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: 'var(--color-text3)', fontSize: 14, padding: '4rem 2rem' }}>
        No worked examples yet for this course.
      </div>
    )
  }

  return (
    <div>
      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 300, margin: '1rem 0 0.5rem' }}>
        <span style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', fontSize: 13, color: 'var(--color-text3)', pointerEvents: 'none' }}>⌕</span>
        <input
          value={search}
          onChange={e => { setSearch(e.target.value); setActiveTopic('all') }}
          placeholder="Search examples…"
          style={{ width: '100%', fontSize: 12.5, padding: '6px 12px 6px 30px', borderRadius: 99, border: '0.5px solid var(--color-border2)', background: 'var(--color-surface)', color: 'var(--color-text)', outline: 'none' }}
        />
      </div>

      {/* Topic pills */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: '1rem' }}>
        {[{ id: 'all', label: 'All Topics' }, ...topics.map(t => ({ id: t, label: t }))].map(({ id, label }) => (
          <button key={id} onClick={() => setActiveTopic(id)}
            style={{
              fontSize: 11, padding: '4px 11px', borderRadius: 99, border: '0.5px solid', cursor: 'pointer',
              borderColor: activeTopic === id ? accent : 'var(--color-border)',
              background: activeTopic === id ? accentBg : 'var(--color-bg2)',
              color: activeTopic === id ? accentFg : 'var(--color-text2)',
              fontFamily: 'inherit',
            }}>
            {label}
          </button>
        ))}
      </div>

      {/* Source grouping header */}
      {filtered.length > 0 && (
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text3)', marginBottom: 8, paddingBottom: 5, borderBottom: '0.5px solid var(--color-border)' }}>
          {filtered[0].source} · {filtered.length} question{filtered.length !== 1 ? 's' : ''}
        </div>
      )}

      {/* Example cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(ex => (
          <ExampleCard key={ex.id} example={ex} accent={accent} accentBg={accentBg} accentFg={accentFg} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', color: 'var(--color-text3)', fontSize: 14, padding: '3rem' }}>
          No matching examples.
        </div>
      )}
    </div>
  )
}
