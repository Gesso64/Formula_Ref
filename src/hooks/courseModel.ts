import { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { CoursesContext } from '@/hooks/coursesContext'
import type { Course, Section, Card } from '@/types'

export function useCourses() {
  const ctx = useContext(CoursesContext)
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
