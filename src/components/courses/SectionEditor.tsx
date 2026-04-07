import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useCourses } from '@/hooks/useCourses'
import { Overlay, ModalHeader } from '@/components/cards/CardEditor'
import type { Section } from '@/types'

interface Props { courseId: string; section?: Section; order: number; onClose: () => void }

export function SectionEditor({ courseId, section, order, onClose }: Props) {
  const { upsertSection, deleteSection } = useCourses()
  const [label, setLabel] = useState(section?.label ?? '')
  const [saving, setSaving] = useState(false)

  const save = async () => {
    if (!label.trim()) return
    setSaving(true)
    await upsertSection(courseId, { id: section?.id ?? uuid(), label, cat: section?.cat ?? uuid().slice(0, 8), cards: section?.cards ?? [], order: section?.order ?? order })
    setSaving(false)
    onClose()
  }

  const del = async () => {
    if (section && confirm('Delete section and all its cards?')) {
      await deleteSection(courseId, section.id)
      onClose()
    }
  }

  const inp: React.CSSProperties = { width: '100%', fontSize: 13, padding: '7px 10px', borderRadius: 7, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text)', outline: 'none', fontFamily: 'inherit' }

  return (
    <Overlay onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <ModalHeader title={section ? 'Edit Section' : 'New Section'} onClose={onClose} />
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5, fontSize: 11, color: 'var(--color-text3)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Section label
          <input style={inp} value={label} onChange={e => setLabel(e.target.value)} placeholder="e.g. Thermodynamics (Ch. 19)" autoFocus />
        </label>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          {section && <button onClick={del} style={{ fontSize: 13, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, background: '#fee2e2', color: '#7f1d1d', marginRight: 'auto', fontFamily: 'inherit' }}>Delete</button>}
          <button onClick={onClose} style={{ fontSize: 13, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', background: 'var(--color-bg2)', color: 'var(--color-text2)', fontFamily: 'inherit' }}>Cancel</button>
          <button onClick={save} disabled={!label.trim() || saving} style={{ fontSize: 13, padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontWeight: 500, background: 'var(--color-text)', color: 'var(--color-bg)', opacity: !label.trim() || saving ? 0.5 : 1, fontFamily: 'inherit' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
    </Overlay>
  )
}
