import { toggleTheme } from '@/lib/theme'
import { MoonIcon, SunIcon } from './icons'

/** Light/dark toggle; CSS shows the icon for the theme you'd switch to. */
export function ThemeButton() {
  return (
    <button type="button" className="ix-icon-btn ix-theme-btn" aria-label="Toggle light/dark theme" title="Toggle light/dark theme" onClick={toggleTheme}>
      <span className="ix-theme-moon"><MoonIcon size={16} /></span>
      <span className="ix-theme-sun"><SunIcon size={16} /></span>
    </button>
  )
}
