import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import type { Course, FormulaSheet } from '@/types'
import type { LoadedSheet, PDFPageProxy } from './pdf'
import { sheetKey, sheetUrl } from './paneModel'
import { IconArrowUpRight, IconClose, IconDownload, IconMinus, IconPlus } from './icons'
import './viewer.css'

const CSS_UNITS = 96 / 72                 // pdf.js scale 1 = 1 PDF point; "100%" means actual size
const ZOOMS = [0.5, 0.67, 0.8, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 4]
const MAX_FIT_W = 1100                    // fit-to-width never makes a page wider than this
const PIXEL_BUDGET = 12_000_000           // max canvas pixels per page (memory on phones)

type Zoom = 'fit' | number

interface Props {
  course: Course
  sheet: FormulaSheet
  mobile: boolean
  onSelect: (sheet: FormulaSheet) => void
  onClose: () => void
}

/** Full-screen, in-site view of a course's printable formula sheet (PDF rendered with pdf.js). */
export function SheetViewer({ course, sheet, mobile, onSelect, onClose }: Props) {
  const url = sheetUrl(sheet)
  const sheets = course.sheets ?? []
  const [loaded, setLoaded] = useState<{ url: string; doc: LoadedSheet } | null>(null)
  const [failed, setFailed] = useState<string | null>(null)
  const [zoom, setZoom] = useState<Zoom>('fit')
  const [availW, setAvailW] = useState(0)
  const [pageNo, setPageNo] = useState(1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const doc = loaded?.url === url ? loaded.doc : null
  const error = failed === url

  useEffect(() => {
    let cancelled = false
    import('./pdf').then(m => m.loadSheet(url)).then(
      d => { if (!cancelled) setLoaded({ url, doc: d }) },
      () => { if (!cancelled) setFailed(url) },
    )
    return () => { cancelled = true }
  }, [url])

  /* Focus the close button while open, give focus back afterwards, and stop the page behind from scrolling. */
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const root = document.documentElement
    const prevOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    return () => { root.style.overflow = prevOverflow; prevFocus?.focus?.() }
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setAvailW(el.clientWidth))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const maxW = doc ? Math.max(...doc.sizes.map(s => s.w)) : 612
  const pad = mobile ? 12 : 24   // horizontal padding around the pages (matches viewer.css)
  const fitScale = Math.max(0.2, Math.min((availW || 800) - pad * 2, MAX_FIT_W) / maxW)
  const scale = zoom === 'fit' ? fitScale : zoom * CSS_UNITS
  const percent = Math.round((scale / CSS_UNITS) * 100)

  const step = useCallback((dir: 1 | -1) => {
    const cur = scale / CSS_UNITS
    const next = dir > 0 ? ZOOMS.find(z => z > cur + 0.01) : [...ZOOMS].reverse().find(z => z < cur - 0.01)
    if (next) setZoom(next)
  }, [scale])

  /* Keep the point at the centre of the view in place when zooming. */
  const prevScale = useRef(scale)
  useLayoutEffect(() => {
    const el = scrollRef.current
    const ratio = scale / prevScale.current
    prevScale.current = scale
    if (!el || ratio === 1) return
    el.scrollTop = (el.scrollTop + el.clientHeight / 2) * ratio - el.clientHeight / 2
    el.scrollLeft = (el.scrollLeft + el.clientWidth / 2) * ratio - el.clientWidth / 2
  }, [scale])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || document.querySelector('.ix-pal')) return
      if (e.key === 'Escape') { e.preventDefault(); onClose() }
      else if (e.key === '+' || e.key === '=') { e.preventDefault(); step(1) }
      else if (e.key === '-') { e.preventDefault(); step(-1) }
      else if (e.key === '0') { e.preventDefault(); setZoom('fit') }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, step])

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const mid = el.scrollTop + el.clientHeight / 3
    let n = 1
    el.querySelectorAll<HTMLElement>('.sv-page').forEach((p, i) => { if (p.offsetTop <= mid) n = i + 1 })
    setPageNo(n)
  }

  const short = (s: FormulaSheet) => s.label.replace(/\s*sheet\s*$/i, '')
  const total = doc?.pages.length ?? 0

  return (
    <div className="sv-root" role="dialog" aria-modal="true" aria-label={`${course.code} ${sheet.label}`}>
      <header className="sv-bar">
        <button ref={closeRef} type="button" className="sv-btn" onClick={onClose} aria-label="Close sheet" title="Close (Esc)">
          <IconClose size={16} />
        </button>
        <div className="sv-title">
          <span className="sv-code">{course.code}</span>
          {!mobile && <span className="sv-name">{sheet.label}</span>}
        </div>
        {sheets.length > 1 && (
          <div className="sh-seg sv-seg" role="group" aria-label="Formula sheet">
            {sheets.map(s => (
              <button key={s.file} type="button" aria-pressed={sheetKey(s) === sheetKey(sheet)} onClick={() => onSelect(s)}>
                {short(s)}
              </button>
            ))}
          </div>
        )}
        <div className="sv-spacer" />
        {!mobile && total > 0 && <span className="sv-pageno" aria-live="polite">Page {pageNo} / {total}</span>}
        <div className="sv-zoom" role="group" aria-label="Zoom">
          <button type="button" className="sv-btn" onClick={() => step(-1)} aria-label="Zoom out" title="Zoom out (−)"
            disabled={scale / CSS_UNITS <= ZOOMS[0] + 0.01}><IconMinus size={15} /></button>
          {!mobile && (
            <button type="button" className="sv-zoom-val" onClick={() => setZoom('fit')} title="Fit to width (0)"
              aria-label={zoom === 'fit' ? `Fit to width, ${percent}%` : `${percent}%, fit to width`}>
              {zoom === 'fit' ? 'Fit' : `${percent}%`}
            </button>
          )}
          <button type="button" className="sv-btn" onClick={() => step(1)} aria-label="Zoom in" title="Zoom in (+)"
            disabled={scale / CSS_UNITS >= ZOOMS[ZOOMS.length - 1] - 0.01}><IconPlus size={15} /></button>
        </div>
        {!mobile && (
          <a className="sv-btn" href={url} target="_blank" rel="noopener noreferrer" title="Open in a new tab (browser PDF viewer)"
            aria-label="Open PDF in a new tab"><IconArrowUpRight size={15} /></a>
        )}
        <a className="sv-btn sv-btn--solid" href={url} download={sheet.file} title={`Download ${sheet.file}`}
          aria-label={`Download ${sheet.label} (PDF)`}>
          <IconDownload size={15} />{!mobile && <span>Download</span>}
        </a>
      </header>

      <div className="sv-scroll" ref={scrollRef} onScroll={onScroll}>
        {error ? (
          <div className="sv-msg">
            <p>This sheet couldn’t be shown here.</p>
            <p><a href={url} download={sheet.file}>Download the PDF</a> or <a href={url} target="_blank" rel="noopener noreferrer">open it in a new tab</a>.</p>
          </div>
        ) : !doc ? (
          <div className="sv-msg" aria-live="polite">Loading {sheet.label.toLowerCase()}…</div>
        ) : (
          <div className="sv-pages" style={{ width: maxW * scale }}>
            {doc.pages.map((pg, i) => (
              <PdfPage key={`${url}#${i}`} page={pg} scale={scale} w={doc.sizes[i].w} h={doc.sizes[i].h}
                label={`Page ${i + 1} of ${total}`} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/** One page: renders into a fresh canvas and swaps it in when done, so zooming never flashes blank. */
function PdfPage({ page, scale, w, h, label }: { page: PDFPageProxy; scale: number; w: number; h: number; label: string }) {
  const boxRef = useRef<HTMLDivElement>(null)
  const cssW = w * scale
  const cssH = h * scale

  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const coarse = window.matchMedia?.('(pointer: coarse)').matches
    // Extra resolution on touch screens keeps text sharp under pinch-zoom; capped by a pixel budget.
    const want = (window.devicePixelRatio || 1) * (coarse ? 1.5 : 1)
    const ratio = Math.min(want, Math.sqrt(PIXEL_BUDGET / (cssW * cssH)))
    const viewport = page.getViewport({ scale: scale * ratio })
    const canvas = document.createElement('canvas')
    canvas.width = Math.floor(viewport.width)
    canvas.height = Math.floor(viewport.height)
    const task = page.render({ canvas, viewport })
    let done = false
    task.promise.then(() => { done = true; box.replaceChildren(canvas) }, () => { /* cancelled or failed */ })
    return () => { if (!done) task.cancel() }
  }, [page, scale, cssW, cssH])

  return <div ref={boxRef} className="sv-page" role="img" aria-label={label} style={{ width: cssW, height: cssH }} />
}
