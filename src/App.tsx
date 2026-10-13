import { useState, useEffect, lazy, Suspense } from 'react'
import { CoursesProvider } from '@/hooks/useCourses'
import { useCourses } from '@/hooks/courseModel'
import { Sidebar } from '@/components/layout/Sidebar'
import { BottomNav } from '@/components/layout/BottomNav'
import { CardGrid } from '@/components/cards/CardGrid'
import { CardEditor } from '@/components/cards/CardEditor'
import { PreviewDock } from '@/preview/PreviewDock'
import '@/index.css'

// Alternative layouts, selected with ?layout=<name> (see src/preview/versions.ts). Lazy-loaded
// so each layout's stylesheet is only injected when that layout is in use.
const LAYOUTS = {
  handbook: lazy(() => import('@/layouts/handbook/HandbookLayout')),
  sheet: lazy(() => import('@/layouts/sheet/SheetLayout')),
  index: lazy(() => import('@/layouts/index/IndexLayout')),
  inspector: lazy(() => import('@/layouts/inspector/InspectorLayout')),
  workspace: lazy(() => import('@/layouts/workspace/WorkspaceLayout')),
}
type LayoutName = keyof typeof LAYOUTS

const Gallery = lazy(() => import('@/preview/Gallery'))

const params = new URLSearchParams(window.location.search)
const isGallery = params.has('preview')

function selectedLayout(): LayoutName | null {
  const name = params.get('layout')
  return name && name in LAYOUTS ? (name as LayoutName) : null
}

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

function LayoutInner({ name }: { name: LayoutName }) {
  const { loading } = useCourses()
  const Layout = LAYOUTS[name]
  if (loading) return null
  return <Suspense fallback={null}><Layout /></Suspense>
}

export default function App() {
  if (isGallery) return <Suspense fallback={null}><Gallery /></Suspense>
  const layout = selectedLayout()
  return (
    <CoursesProvider>
      {layout ? <LayoutInner name={layout} /> : <Inner />}
      {import.meta.env.DEV && <PreviewDock current={layout} />}
    </CoursesProvider>
  )
}
