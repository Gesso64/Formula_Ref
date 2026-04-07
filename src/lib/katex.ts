import katex from 'katex'
import 'katex/dist/katex.min.css'

export function renderLatex(tex: string, display = false): string {
  try {
    return katex.renderToString(tex, { throwOnError: false, displayMode: display })
  } catch {
    return `<span style="color:#c00">${tex}</span>`
  }
}
