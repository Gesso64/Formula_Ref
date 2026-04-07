import { useState, useEffect } from 'react'
import { CoursesProvider, useCourses } from '@/hooks/useCourses'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { CardGrid } from '@/components/cards/CardGrid'
import { CardEditor } from '@/components/cards/CardEditor'
import '@/index.css'

function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return mobile
}

function Inner() {
  const isMobile = useIsMobile()
  const { loading, activeCourse } = useCourses()
  const [quickAdd, setQuickAdd] = useState(false)

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100dvh', color: 'var(--color-text3)', fontSize: 14 }}>
      Loading…
    </div>
  )

  return (
    <div style={{ display: 'flex', minHeight: '100dvh' }}>
      {!isMobile && <Sidebar />}
      <main style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', paddingBottom: isMobile ? 70 : 0 }}>
        <CardGrid />
      </main>
      {isMobile && <BottomNav onAddCard={() => setQuickAdd(true)} />}
      {quickAdd && activeCourse && activeCourse.sections.length > 0 && (
        <CardEditor courseId={activeCourse.id} section={activeCourse.sections[0]} onClose={() => setQuickAdd(false)} />
      )}
    </div>
  )
}

export default function App() {
  return (
    <CoursesProvider>
      <Inner />
    </CoursesProvider>
  )
}
