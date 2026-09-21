import { createContext } from 'react'
import type { Course, Section, Card } from '@/types'

export interface CoursesCtx {
  courses: Course[]
  activeCourse: Course | null
  activeCourseId: string | null
  setActiveCourseId: (id: string) => void
  upsertCourse: (course: Course) => Promise<void>
  deleteCourse: (id: string) => Promise<void>
  upsertSection: (courseId: string, section: Section) => Promise<void>
  deleteSection: (courseId: string, sectionId: string) => Promise<void>
  upsertCard: (courseId: string, sectionId: string, card: Card) => Promise<void>
  deleteCard: (courseId: string, sectionId: string, cardId: string) => Promise<void>
  exportAll: () => Promise<void>
  importAll: (file: File) => Promise<void>
  loading: boolean
}

export const CoursesContext = createContext<CoursesCtx | null>(null)
