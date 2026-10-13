// Pinned entries for the Workspace layout's “My sheet”, kept in this browser.
export interface Pin { courseId: string; cardId: string }

const KEY = 'formula-ref:pins'

export function loadPins(): Pin[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    return Array.isArray(v) ? v.filter(p => p && typeof p.courseId === 'string' && typeof p.cardId === 'string') : []
  } catch {
    return []
  }
}

export function savePins(pins: Pin[]) {
  try { localStorage.setItem(KEY, JSON.stringify(pins)) } catch { /* ignore */ }
}
