import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { v4 as uuid } from 'uuid'
import { storage } from '@/lib/storage'
import { DEFAULT_COURSES } from '@/data/defaultCourses'
import type { Course, Section, Card } from '@/types'

interface CoursesCtx {
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

const Ctx = createContext<CoursesCtx | null>(null)

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([])
  const [activeCourseId, setActiveCourseIdState] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function init() {
      // Sync default courses only when their defaultVersion is higher than what
      // is stored, so user edits to default cards are preserved between reloads.
      // Custom courses (isDefault: false, random UUIDs) are never touched.
      const stored = await storage.getCourses()
      const storedById = Object.fromEntries(stored.map(c => [c.id, c]))
      for (const c of DEFAULT_COURSES) {
        const storedVersion = storedById[c.id]?.defaultVersion ?? 0
        if ((c.defaultVersion ?? 0) > storedVersion) {
          await storage.upsertCourse(c)
        }
      }
      const synced = await storage.getCourses()
      const meta = await storage.getMeta()
      setCourses(synced)
      setActiveCourseIdState(meta.activeCourseId ?? synced[0]?.id ?? null)
      setLoading(false)
    }
    init()
  }, [])

  const setActiveCourseId = useCallback(async (id: string) => {
    setActiveCourseIdState(id)
    await storage.setMeta({ activeCourseId: id })
  }, [])

  const upsertCourse = useCallback(async (course: Course) => {
    await storage.upsertCourse(course)
    setCourses(await storage.getCourses())
  }, [])

  const deleteCourse = useCallback(async (id: string) => {
    await storage.deleteCourse(id)
    const remaining = await storage.getCourses()
    setCourses(remaining)
    if (activeCourseId === id) {
      const next = remaining[0]?.id ?? null
      setActiveCourseIdState(next)
      await storage.setMeta({ activeCourseId: next })
    }
  }, [activeCourseId])

  const upsertSection = useCallback(async (courseId: string, section: Section) => {
    const all = await storage.getCourses()
    const course = all.find(c => c.id === courseId)
    if (!course) return
    const idx = course.sections.findIndex(s => s.id === section.id)
    const sections = idx >= 0
      ? course.sections.map(s => s.id === section.id ? section : s)
      : [...course.sections, section]
    await upsertCourse({ ...course, sections })
  }, [upsertCourse])

  const deleteSection = useCallback(async (courseId: string, sectionId: string) => {
    const all = await storage.getCourses()
    const course = all.find(c => c.id === courseId)
    if (!course) return
    await upsertCourse({ ...course, sections: course.sections.filter(s => s.id !== sectionId) })
  }, [upsertCourse])

  const upsertCard = useCallback(async (courseId: string, sectionId: string, card: Card) => {
    const all = await storage.getCourses()
    const course = all.find(c => c.id === courseId)
    if (!course) return
    const sections = course.sections.map(s => {
      if (s.id !== sectionId) return s
      const idx = s.cards.findIndex(c => c.id === card.id)
      const cards = idx >= 0 ? s.cards.map(c => c.id === card.id ? card : c) : [...s.cards, card]
      return { ...s, cards }
    })
    await upsertCourse({ ...course, sections })
  }, [upsertCourse])

  const deleteCard = useCallback(async (courseId: string, sectionId: string, cardId: string) => {
    const all = await storage.getCourses()
    const course = all.find(c => c.id === courseId)
    if (!course) return
    const sections = course.sections.map(s =>
      s.id !== sectionId ? s : { ...s, cards: s.cards.filter(c => c.id !== cardId) }
    )
    await upsertCourse({ ...course, sections })
  }, [upsertCourse])

  const exportAll = useCallback(async () => {
    const data = await storage.exportAll()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `tmu-ref-backup-${new Date().toISOString().slice(0, 10)}.json`
    a.click()
  }, [])

  const importAll = useCallback(async (file: File) => {
    try {
      const text = await file.text()
      const data = JSON.parse(text)
      if (!Array.isArray(data?.courses)) throw new Error('Invalid backup: missing "courses" array.')
      await storage.importAll(data)
      setCourses(await storage.getCourses())
    } catch (err) {
      alert(`Import failed: ${err instanceof Error ? err.message : String(err)}`)
    }
  }, [])

  const activeCourse = courses.find(c => c.id === activeCourseId) ?? courses[0] ?? null

  return (
    <Ctx.Provider value={{
      courses, activeCourse, activeCourseId, setActiveCourseId,
      upsertCourse, deleteCourse, upsertSection, deleteSection,
      upsertCard, deleteCard, exportAll, importAll, loading
    }}>
      {children}
    </Ctx.Provider>
  )
}

export function useCourses() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useCourses must be used inside CoursesProvider')
  return ctx
}

export function newCourse(overrides: Partial<Course> = {}): Course {
  return {
    id: uuid(), code: '', name: '', description: '',
    accent: '#6366f1', accentBg: '#e0e7ff', accentFg: '#3730a3',
    accentBgDark: '#1e1b4b', accentFgDark: '#a5b4fc',
    sections: [], isDefault: false,
    createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    ...overrides,
  }
}

export function newSection(overrides: Partial<Section> = {}): Section {
  return { id: uuid(), label: '', cat: uuid().slice(0, 8), cards: [], order: 0, ...overrides }
}

export function newCard(order = 0, overrides: Partial<Card> = {}): Card {
  return {
    id: uuid(), title: '', tag: '', tagColor: '#374151', tagBg: '#F3F4F6',
    formula: '', formulaDisplay: true, subs: [], notes: '', tableRows: [],
    order, ...overrides,
  }
}
