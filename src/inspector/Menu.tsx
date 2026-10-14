import { useEffect, useRef, useState, useCallback, type ReactNode, type Ref } from 'react'

export interface TriggerProps {
  ref: Ref<HTMLButtonElement>
  onClick: () => void
  'aria-expanded': boolean
  'aria-haspopup': 'menu'
}

interface MenuProps {
  label: string
  trigger: (props: TriggerProps, open: boolean) => ReactNode
  align?: 'start' | 'end'
  /** Render as a bottom sheet (thumb-reachable on phones). */
  sheet?: boolean
  className?: string
  children: (close: () => void) => ReactNode
}

const ITEM_SELECTOR = '[role="menuitem"],[role="menuitemradio"],[role="menuitemcheckbox"]'

export function Menu({ label, trigger, align = 'start', sheet = false, className, children }: MenuProps) {
  const [open, setOpen] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      const panel = panelRef.current
      if (!panel) return
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); triggerRef.current?.focus(); return }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Home' || e.key === 'End') {
        const items = [...panel.querySelectorAll<HTMLElement>(ITEM_SELECTOR)]
        if (!items.length) return
        e.preventDefault()
        const i = items.indexOf(document.activeElement as HTMLElement)
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? items.length - 1
          : e.key === 'ArrowDown' ? (i + 1) % items.length : (i - 1 + items.length) % items.length
        items[next].focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    const raf = requestAnimationFrame(() => {
      const panel = panelRef.current
      const target = panel?.querySelector<HTMLElement>('[aria-checked="true"]') ?? panel?.querySelector<HTMLElement>(ITEM_SELECTOR)
      target?.focus({ preventScroll: true })
      if (target && panel) target.scrollIntoView({ block: 'nearest' })
    })
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
      cancelAnimationFrame(raf)
    }
  }, [open])

  return (
    <div ref={wrapRef} className={`sh-menu ${className ?? ''}`}>
      {trigger({ ref: triggerRef, onClick: () => setOpen(o => !o), 'aria-expanded': open, 'aria-haspopup': 'menu' }, open)}
      {open && (
        <>
          {sheet && <div className="sh-scrim" onClick={() => setOpen(false)} />}
          <div ref={panelRef} role="menu" aria-label={label}
            className={`sh-menu-panel ${sheet ? 'sh-menu-panel--sheet' : `sh-menu-panel--${align}`}`}>
            {sheet && <div className="sh-sheet-grip" aria-hidden="true" />}
            {children(close)}
          </div>
        </>
      )}
    </div>
  )
}

export function MenuHeading({ children }: { children: ReactNode }) {
  return <div className="sh-menu-heading" role="presentation">{children}</div>
}

export function MenuSep() {
  return <div className="sh-menu-sep" role="separator" />
}
