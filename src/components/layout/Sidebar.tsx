import { useState } from 'react'
import { useCourses } from '@/hooks/useCourses'
import { CourseEditor } from '@/components/courses/CourseEditor'
import type { Course } from '@/types'

export function Sidebar() {
  const { courses, activeCourse, setActiveCourseId, exportAll, importAll } = useCourses()
  const [newCourse, setNewCourse] = useState(false)
  const [editCourse, setEditCourse] = useState<Course | null>(null)

  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'; input.accept = '.json'
    input.onchange = async () => { if (input.files?.[0]) await importAll(input.files[0]) }
    input.click()
  }

  return (
    <nav style={{ width: 200, minWidth: 200, flexShrink: 0, background: 'var(--color-surface)', borderRight: '0.5px solid var(--color-border2)', position: 'sticky', top: 0, height: '100dvh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px 14px 10px', borderBottom: '0.5px solid var(--color-border)' }}>
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-text3)', marginBottom: 10 }}>
          TMU · Winter 2026
        </div>
        {courses.map(c => (
          <CourseTab key={c.id} course={c} active={c.id === activeCourse?.id}
            onClick={() => setActiveCourseId(c.id)}
            onEdit={() => setEditCourse(c)} />
        ))}
        <button onClick={() => setNewCourse(true)}
          style={{ width: '100%', padding: '6px 10px', borderRadius: 7, border: '0.5px dashed var(--color-border2)', background: 'transparent', cursor: 'pointer', fontSize: 11.5, color: 'var(--color-text3)', textAlign: 'left', fontFamily: 'inherit' }}>
          + New course
        </button>
      </div>

      <div style={{ flex: 1 }} />

      <div style={{ padding: '10px 14px 16px', borderTop: '0.5px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: 5 }}>
        <button onClick={exportAll} style={actionBtn}>↑ Export JSON</button>
        <button onClick={handleImport} style={actionBtn}>↓ Import JSON</button>
      </div>

      {newCourse && <CourseEditor onClose={() => setNewCourse(false)} />}
      {editCourse && <CourseEditor course={editCourse} onClose={() => setEditCourse(null)} />}
    </nav>
  )
}

function CourseTab({ course, active, onClick, onEdit }: { course: Course; active: boolean; onClick: () => void; onEdit: () => void }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{ position: 'relative', marginBottom: 5 }} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <button onClick={onClick}
        style={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%', padding: '8px 10px', borderRadius: 7, border: `0.5px solid ${active ? course.accent : 'var(--color-border)'}`, background: active ? course.accentBg : 'transparent', cursor: 'pointer', textAlign: 'left', transition: 'all .15s', color: active ? course.accentFg : 'var(--color-text2)', fontFamily: 'inherit' }}>
        <span style={{ fontSize: 12.5, fontWeight: 700 }}>{course.code}</span>
        <span style={{ fontSize: 10, lineHeight: 1.3, opacity: 0.75 }}>{course.name}</span>
      </button>
      {hover && (
        <button onClick={e => { e.stopPropagation(); onEdit() }}
          style={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)', fontSize: 11, padding: '2px 6px', borderRadius: 4, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text3)', cursor: 'pointer' }}>
          ✎
        </button>
      )}
    </div>
  )
}

const actionBtn: React.CSSProperties = { fontSize: 11.5, padding: '5px 8px', borderRadius: 6, border: '0.5px solid var(--color-border)', background: 'transparent', color: 'var(--color-text2)', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }
