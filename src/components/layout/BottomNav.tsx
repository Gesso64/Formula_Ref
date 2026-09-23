import { useState } from 'react'
import { useCourses } from '@/hooks/courseModel'
import { CourseEditor } from '@/components/courses/CourseEditor'
import { groupCourses, loadCollapsed, saveCollapsed } from '@/lib/courseGroups'
import type { Course } from '@/types'

interface Props { onAddCard?: () => void }

export function BottomNav({ onAddCard }: Props) {
  const { courses, activeCourse, setActiveCourseId, exportAll, importAll } = useCourses()
  const [open, setOpen] = useState(false)
  const [newCourse, setNewCourse] = useState(false)
  const [editCourse, setEditCourse] = useState<Course | null>(null)
  const [collapsed, setCollapsed] = useState<Set<string>>(loadCollapsed)

  const toggleGroup = (term: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(term)) next.delete(term); else next.add(term)
      saveCollapsed(next)
      return next
    })
  }

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'; input.accept = '.json'
    input.onchange = async () => { if (input.files?.[0]) { await importAll(input.files[0]); setOpen(false) } }
    input.click()
  }

  const groups = groupCourses(courses)

  return (
    <>
      {/* Drawer */}
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 90 }}>
          <div onClick={e => e.stopPropagation()}
            style={{ position: 'absolute', bottom: 60, left: 0, right: 0, maxHeight: '75vh', overflowY: 'auto', background: 'var(--color-surface)', borderRadius: '16px 16px 0 0', padding: '16px 16px 8px', boxShadow: '0 -8px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text3)', marginBottom: 10 }}>Courses</div>
            {groups.map(({ term, courses: groupCourses }) => (
              <div key={term} style={{ marginBottom: 8 }}>
                <button onClick={() => toggleGroup(term)}
                  style={{ display: 'flex', alignItems: 'center', gap: 5, width: '100%', padding: '4px 4px', marginBottom: 4, border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <span style={{ fontSize: 9, color: 'var(--color-text3)', transform: collapsed.has(term) ? 'none' : 'rotate(90deg)', transition: 'transform .15s', display: 'inline-block', width: 10 }}>
                    ▸
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text3)' }}>
                    {term}
                  </span>
                </button>
                {!collapsed.has(term) && groupCourses.map(c => (
                  <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                    <button onClick={() => { setActiveCourseId(c.id); setOpen(false) }}
                      style={{ flex: 1, textAlign: 'left', padding: '8px 12px', borderRadius: 8, border: `0.5px solid ${c.id === activeCourse?.id ? c.accent : 'var(--color-border)'}`, background: c.id === activeCourse?.id ? c.accentBg : 'var(--color-bg2)', color: c.id === activeCourse?.id ? c.accentFg : 'var(--color-text)', cursor: 'pointer', fontFamily: 'inherit', fontSize: 13, fontWeight: 600 }}>
                      {c.code} <span style={{ fontWeight: 400, fontSize: 11, opacity: 0.7 }}>{c.name}</span>
                    </button>
                    <button onClick={() => { setEditCourse(c); setOpen(false) }}
                      style={{ fontSize: 14, padding: '6px 8px', borderRadius: 7, border: '0.5px solid var(--color-border)', background: 'var(--color-bg2)', color: 'var(--color-text3)', cursor: 'pointer' }}>✎</button>
                  </div>
                ))}
              </div>
            ))}
            <button onClick={() => { setNewCourse(true); setOpen(false) }}
              style={{ width: '100%', padding: '8px', borderRadius: 8, border: '0.5px dashed var(--color-border2)', background: 'transparent', color: 'var(--color-text3)', cursor: 'pointer', fontSize: 13, marginTop: 4, fontFamily: 'inherit' }}>
              + New course
            </button>
            <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
              <button onClick={() => { exportAll(); setOpen(false) }} style={{ ...mobileBtn, flex: 1 }}>↑ Export</button>
              <button onClick={handleImport} style={{ ...mobileBtn, flex: 1 }}>↓ Import</button>
            </div>
          </div>
        </div>
      )}

      {/* Bar */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 56, background: 'var(--color-surface)', borderTop: '0.5px solid var(--color-border2)', display: 'flex', alignItems: 'center', zIndex: 80, paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <NavBtn label="📚 Courses" onClick={() => setOpen(o => !o)} active={open} />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
          <button onClick={onAddCard}
            style={{ width: 44, height: 44, borderRadius: 99, background: 'var(--color-text)', color: 'var(--color-bg)', border: 'none', fontSize: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.18)' }}>
            +
          </button>
        </div>
        <NavBtn label={`✎ Edit`} onClick={() => setEditCourse(activeCourse ?? null)} active={false} />
      </div>

      {newCourse && <CourseEditor onClose={() => setNewCourse(false)} />}
      {editCourse && <CourseEditor course={editCourse} onClose={() => setEditCourse(null)} />}
    </>
  )
}

function NavBtn({ label, onClick, active }: { label: string; onClick: () => void; active: boolean }) {
  return (
    <button onClick={onClick}
      style={{ flex: 1, height: '100%', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 12, color: active ? 'var(--color-text)' : 'var(--color-text3)', fontWeight: active ? 600 : 400, fontFamily: 'inherit' }}>
      {label}
    </button>
  )
}

const mobileBtn: React.CSSProperties = { padding: '8px', borderRadius: 8, border: '0.5px solid var(--color-border)', background: 'var(--color-bg2)', color: 'var(--color-text2)', cursor: 'pointer', fontSize: 12, fontFamily: 'inherit' }
