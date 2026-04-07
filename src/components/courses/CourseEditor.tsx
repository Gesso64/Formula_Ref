import { useState } from 'react'
import { useCourses, newCourse } from '@/hooks/useCourses'
import { Overlay, ModalHeader } from '@/components/cards/CardEditor'
import type { Course } from '@/types'

const ACCENTS = [
  { accent:'#1d4ed8', accentBg:'#dbeafe', accentFg:'#1e3a8a', accentBgDark:'#1e3a5f', accentFgDark:'#93c5fd' },
  { accent:'#7c3aed', accentBg:'#ede9fe', accentFg:'#4c1d95', accentBgDark:'#2e1065', accentFgDark:'#c4b5fd' },
  { accent:'#b45309', accentBg:'#fef3c7', accentFg:'#78350f', accentBgDark:'#451a03', accentFgDark:'#fcd34d' },
  { accent:'#059669', accentBg:'#d1fae5', accentFg:'#064e3b', accentBgDark:'#022c22', accentFgDark:'#6ee7b7' },
  { accent:'#dc2626', accentBg:'#fee2e2', accentFg:'#7f1d1d', accentBgDark:'#450a0a', accentFgDark:'#fca5a5' },
  { accent:'#d97706', accentBg:'#fef3c7', accentFg:'#92400e', accentBgDark:'#451a03', accentFgDark:'#fcd34d' },
  { accent:'#0891b2', accentBg:'#cffafe', accentFg:'#164e63', accentBgDark:'#082f49', accentFgDark:'#67e8f9' },
  { accent:'#be185d', accentBg:'#fce7f3', accentFg:'#831843', accentBgDark:'#500724', accentFgDark:'#f9a8d4' },
  { accent:'#4f46e5', accentBg:'#e0e7ff', accentFg:'#3730a3', accentBgDark:'#1e1b4b', accentFgDark:'#a5b4fc' },
  { accent:'#374151', accentBg:'#f3f4f6', accentFg:'#111827', accentBgDark:'#111827', accentFgDark:'#d1d5db' },
]

interface Props { course?: Course; onClose: () => void }

export function CourseEditor({ course, onClose }: Props) {
  const { upsertCourse, deleteCourse, setActiveCourseId } = useCourses()
  const [code, setCode] = useState(course?.code ?? '')
  const [name, setName] = useState(course?.name ?? '')
  const [desc, setDesc] = useState(course?.description ?? '')
  const [accent, setAccent] = useState(course ? { accent: course.accent, accentBg: course.accentBg, accentFg: course.accentFg, accentBgDark: course.accentBgDark, accentFgDark: course.accentFgDark } : ACCENTS[0])
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (!code.trim() || !name.trim()) return
    setSaving(true)
    const updated = course
      ? { ...course, code, name, description: desc, ...accent }
      : newCourse({ code, name, description: desc, ...accent })
    await upsertCourse(updated)
    if (!course) setActiveCourseId(updated.id)
    setSaving(false)
    onClose()
  }

  const del = async () => {
    if (course && confirm(`Delete "${course.code}"? This removes all its cards permanently.`)) {
      await deleteCourse(course.id)
      onClose()
    }
  }

  const inp: React.CSSProperties = { width: '100%', fontSize: 13, padding: '7px 10px', borderRadius: 7, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text)', outline: 'none', fontFamily: 'inherit' }
  const lbl: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: 5, fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ModalHeader title={course ? 'Edit Course' : 'New Course'} onClose={onClose} />

        {/* Preview tab */}
        <div style={{ display: 'inline-flex', flexDirection: 'column', padding: '8px 12px', borderRadius: 8, border: `1.5px solid ${accent.accent}`, background: accent.accentBg, alignSelf: 'flex-start', minWidth: 120 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: accent.accentFg }}>{code || 'CODE'}</span>
          <span style={{ fontSize: 10, color: accent.accentFg, opacity: 0.75, lineHeight: 1.3 }}>{name || 'Course name'}</span>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <label style={{ ...lbl, width: 110 }}>Code
            <input style={inp} value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="AER222" maxLength={10} />
          </label>
          <label style={{ ...lbl, flex: 1 }}>Course name
            <input style={inp} value={name} onChange={e => setName(e.target.value)} placeholder="Intro to Aerospace Engineering" />
          </label>
        </div>

        <label style={lbl}>Description / subtitle
          <input style={inp} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Textbook, chapters, semester…" />
        </label>

        <div>
          <div style={{ fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>Accent colour</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {ACCENTS.map(a => (
              <button key={a.accent} onClick={() => setAccent(a)}
                style={{ width: 26, height: 26, borderRadius: 99, background: a.accent, border: accent.accent === a.accent ? '3px solid var(--color-text)' : '2px solid transparent', cursor: 'pointer' }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', paddingTop: 4 }}>
          {course && (
            <button onClick={del} style={{ fontSize: 13, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, background: '#fee2e2', color: '#7f1d1d', marginRight: 'auto', fontFamily: 'inherit' }}>
              Delete course
            </button>
          )}
          <button onClick={onClose} style={{ fontSize: 13, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, background: 'var(--color-bg2)', color: 'var(--color-text2)', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={save} disabled={!code.trim() || !name.trim() || saving}
            style={{ fontSize: 13, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, background: 'var(--color-text)', color: 'var(--color-bg)', opacity: !code.trim() || !name.trim() || saving ? 0.5 : 1, fontFamily: 'inherit' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </Overlay>
  )
}
