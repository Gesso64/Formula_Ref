// pdf.js, loaded on demand by SheetViewer (dynamic import keeps it out of the main bundle).
// The legacy build runs on older mobile Safari too.
import { getDocument, GlobalWorkerOptions, type PDFPageProxy } from 'pdfjs-dist/legacy/build/pdf.mjs'
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'

GlobalWorkerOptions.workerSrc = workerUrl

export type { PDFPageProxy }

export interface LoadedSheet {
  pages: PDFPageProxy[]
  sizes: { w: number; h: number }[]   // page sizes at scale 1 (PDF points)
}

const cache = new Map<string, Promise<LoadedSheet>>()

/** Load a PDF and all its pages (formula sheets are a few pages); cached so switching sheets is instant. */
export function loadSheet(url: string): Promise<LoadedSheet> {
  let p = cache.get(url)
  if (!p) {
    p = (async () => {
      const pdf = await getDocument({ url }).promise
      const pages = await Promise.all(Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1)))
      const sizes = pages.map(pg => { const v = pg.getViewport({ scale: 1 }); return { w: v.width, h: v.height } })
      return { pages, sizes }
    })()
    cache.set(url, p)
    p.catch(() => cache.delete(url))
  }
  return p
}
