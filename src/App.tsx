import { CoursesProvider } from '@/hooks/useCourses'
import { useCourses } from '@/hooks/courseModel'
import InspectorLayout from '@/inspector/InspectorLayout'
import '@/index.css'

function Inner() {
  const { loading } = useCourses()
  return loading ? null : <InspectorLayout />
}

export default function App() {
  return (
    <CoursesProvider>
      <Inner />
    </CoursesProvider>
  )
}
