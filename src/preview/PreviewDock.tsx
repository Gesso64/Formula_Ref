import { useEffect, useState } from 'react'
import { useTheme } from '@/lib/theme'
import { VERSIONS, layoutHref } from './versions'
import './preview.css'

/** Dev-only tab on the left edge for hopping between UI versions while previewing. */
export function PreviewDock({ current }: { current: string | null }) {
  const [open, setOpen] = useState(false)
  const { theme, toggle } = useTheme()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.key === 'ArrowLeft') window.location.search = '?preview'
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="pv-dock" onMouseLeave={() => setOpen(false)}>
      {open ? (
        <nav className="pv-dock-menu" aria-label="UI versions">
          <div className="pv-dock-title">Preview version</div>
          {VERSIONS.map(v => (
            <a key={v.id ?? 'current'} href={layoutHref(v.id)} aria-current={v.id === current ? 'page' : undefined}>
              {v.name}
            </a>
          ))}
          <hr />
          <button onClick={toggle}>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
          <a href="?preview">All versions</a>
        </nav>
      ) : (
        <button className="pv-dock-tab" onClick={() => setOpen(true)} aria-label="Switch UI version">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            <path d="M4.5 2.5L8 6l-3.5 3.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  )
}
