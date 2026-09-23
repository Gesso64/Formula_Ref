import type { Course } from '@/types'

export const UNGROUPED = 'My Courses'
const COLLAPSED_KEY = 'formula-ref:collapsed-groups'

export function loadCollapsed(): Set<string> {
  try {
    const raw = localStorage.getItem(COLLAPSED_KEY)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

export function saveCollapsed(set: Set<string>) {
  try { localStorage.setItem(COLLAPSED_KEY, JSON.stringify([...set])) } catch { /* ignore */ }
}

export function groupCourses(courses: Course[]): { term: string; courses: Course[] }[] {
  const order: string[] = []
  const map = new Map<string, Course[]>()
  for (const c of courses) {
    const key = c.term ?? UNGROUPED
    if (!map.has(key)) { map.set(key, []); order.push(key) }
    map.get(key)!.push(c)
  }
  return order.map(term => ({ term, courses: map.get(term)! }))
}
