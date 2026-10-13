import { useTheme } from '@/lib/theme'
import { VERSIONS, layoutHref } from './versions'
import './preview.css'

const STATUS_LABEL = { current: 'Live', shortlisted: 'Shortlisted', new: 'New', archived: 'Archived' } as const

/** Local preview index (?preview): links to every UI version. */
export default function Gallery() {
  const { theme, toggle } = useTheme()
  return (
    <div className="pv-root">
      <div className="pv-wrap">
        <header className="pv-head">
          <div>
            <h1>Formula Reference — UI versions</h1>
            <p>Each version runs on the same course data. Use the tab on the left edge of any version to jump between them,
              or press <kbd>Alt</kbd> + <kbd>←</kbd> to come back here.</p>
          </div>
          <button className="pv-theme" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </header>
        <ul className="pv-list">
          {VERSIONS.map(v => (
            <li key={v.id ?? 'current'} className="pv-item">
              <a className="pv-link" href={layoutHref(v.id)}>
                <span className="pv-name">{v.name} <span className="pv-badge" data-status={v.status}>{STATUS_LABEL[v.status]}</span></span>
                <span className="pv-summary">{v.summary}</span>
                <svg className="pv-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                  <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </li>
          ))}
        </ul>
        <p className="pv-foot">Light/dark choice is shared by every version and remembered in this browser.
          Edits you make in one version are saved to the same local database and show up in all of them.</p>
      </div>
    </div>
  )
}
