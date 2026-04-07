import { openDB, type IDBPDatabase } from 'idb'
import type { Course, AppMeta } from '@/types'

const DB_NAME = 'formula-ref'
const DB_VERSION = 1

let _db: IDBPDatabase | null = null

async function getDB() {
  if (_db) return _db
  _db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('courses')) {
        db.createObjectStore('courses', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('meta')) {
        db.createObjectStore('meta', { keyPath: 'key' })
      }
    },
  })
  return _db
}

export const storage = {
  async getCourses(): Promise<Course[]> {
    const db = await getDB()
    const all = await db.getAll('courses') as Course[]
    return all.sort((a, b) => {
      // defaults first, then by creation date
      if (a.isDefault && !b.isDefault) return -1
      if (!a.isDefault && b.isDefault) return 1
      return a.createdAt.localeCompare(b.createdAt)
    })
  },

  async upsertCourse(course: Course): Promise<void> {
    const db = await getDB()
    await db.put('courses', { ...course, updatedAt: new Date().toISOString() })
  },

  async deleteCourse(id: string): Promise<void> {
    const db = await getDB()
    await db.delete('courses', id)
  },

  async getMeta(): Promise<AppMeta> {
    const db = await getDB()
    const rec = await db.get('meta', 'app')
    return rec?.value ?? { activeCourseId: null }
  },

  async setMeta(meta: AppMeta): Promise<void> {
    const db = await getDB()
    await db.put('meta', { key: 'app', value: meta })
  },

  async exportAll(): Promise<{ version: number; exportedAt: string; courses: Course[] }> {
    const courses = await this.getCourses()
    return { version: 1, exportedAt: new Date().toISOString(), courses }
  },

  async importAll(data: { courses: Course[] }): Promise<void> {
    const db = await getDB()
    const tx = db.transaction('courses', 'readwrite')
    for (const course of data.courses) {
      await tx.store.put(course)
    }
    await tx.done
  },
}
