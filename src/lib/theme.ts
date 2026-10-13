import { useSyncExternalStore } from 'react'

// Light/dark theme shared by every layout. The resolved theme is always written to
// <html data-theme="light|dark"> (index.html sets it before first paint), so stylesheets
// key dark styles off `:root[data-theme="dark"]` instead of a prefers-color-scheme query.

export type ThemePref = 'system' | 'light' | 'dark'
export type Theme = 'light' | 'dark'

const KEY = 'formula-ref:theme'
const listeners = new Set<() => void>()
const media = window.matchMedia('(prefers-color-scheme: dark)')

function readPref(): ThemePref {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'light' || v === 'dark' ? v : 'system'
  } catch {
    return 'system'
  }
}

let pref: ThemePref = readPref()

function resolve(p: ThemePref): Theme {
  return p === 'system' ? (media.matches ? 'dark' : 'light') : p
}

function apply() {
  const theme = resolve(pref)
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  listeners.forEach(fn => fn())
}

media.addEventListener('change', () => { if (pref === 'system') apply() })
apply()

export function setThemePref(next: ThemePref) {
  pref = next
  try {
    if (next === 'system') localStorage.removeItem(KEY); else localStorage.setItem(KEY, next)
  } catch { /* ignore */ }
  apply()
}

/** Flip between light and dark (pins an explicit preference). */
export function toggleTheme() {
  setThemePref(resolve(pref) === 'dark' ? 'light' : 'dark')
}

function subscribe(fn: () => void) {
  listeners.add(fn)
  return () => { listeners.delete(fn) }
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, () => resolve(pref))
  const preference = useSyncExternalStore(subscribe, () => pref)
  return { theme, preference, setPreference: setThemePref, toggle: toggleTheme }
}
