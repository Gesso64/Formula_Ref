import katex from 'katex'
import 'katex/dist/katex.min.css'

const cache = new Map<string, string>()

export function renderLatex(tex: string, display = false): string {
  const key = (display ? 'D' : 'I') + tex
  let html = cache.get(key)
  if (html === undefined) {
    try {
      html = katex.renderToString(tex, { throwOnError: false, displayMode: display })
    } catch {
      html = `<span style="color:#c00">${tex}</span>`
    }
    cache.set(key, html)
  }
  return html
}
