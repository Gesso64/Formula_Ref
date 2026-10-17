import { renderLatex } from './katex'

/* A small Markdown renderer for the practice-lab text: paragraphs, **bold**, *italic*, `code`,
   "-" and "1." lists, pipe tables, and $…$ / $$…$$ math through KaTeX. Math is pulled out
   into placeholders before anything else is parsed, so "|", "*" and "_" inside a formula
   never split a table row or start emphasis. Inline math becomes @@i<n>@@ and display
   math a block of its own, @@d<n>@@ ("@@" never appears in the source). */

const MATH = /\$\$([\s\S]+?)\$\$|\$((?:\\.|[^$\\])+?)\$/g

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function inline(s: string): string {
  return s
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*\w])\*(?!\s)([\s\S]+?)\*(?!\w)/g, '$1<em>$2</em>')
}

const isTable = (l: string) => l.trimStart().startsWith('|')
const listItem = (l: string) => l.match(/^\s*(?:([-*])|(\d+)\.)\s+(.*)$/)
const isDisplay = (l: string) => /^@@d\d+@@$/.test(l.trim())

function cells(row: string): string[] {
  return row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())
}

function table(rows: string[]): string {
  const [head, ...rest] = rows.filter(r => !/^\s*\|?\s*:?-{2,}/.test(r))
  const tr = (r: string, tag: 'th' | 'td') => `<tr>${cells(r).map(c => `<${tag}>${inline(c)}</${tag}>`).join('')}</tr>`
  return `<div class="sh-md-table"><table><thead>${tr(head, 'th')}</thead><tbody>${rest.map(r => tr(r, 'td')).join('')}</tbody></table></div>`
}

function blocks(text: string): string {
  const lines = text.split('\n')
  const out: string[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) { i++; continue }
    if (isDisplay(line)) { out.push(line.trim()); i++; continue }
    if (isTable(line)) {
      const rows: string[] = []
      while (i < lines.length && isTable(lines[i])) rows.push(lines[i++])
      out.push(table(rows))
      continue
    }
    const first = listItem(line)
    if (first) {
      const bullet = !!first[1]
      const items: string[] = []
      while (i < lines.length) {
        const m = listItem(lines[i])
        if (m && !!m[1] === bullet) { items.push(m[3]); i++; continue }
        if (!lines[i].trim()) {   // a blank line ends the list unless another item follows
          const next = lines.slice(i).find(l => l.trim())
          const nm = next && listItem(next)
          if (nm && !!nm[1] === bullet) { i++; continue }
          break
        }
        if (m || isTable(lines[i]) || isDisplay(lines[i])) break
        items[items.length - 1] += ' ' + lines[i++].trim()   // continuation line
      }
      const tag = bullet ? 'ul' : 'ol'
      out.push(`<${tag}>${items.map(it => `<li>${inline(it)}</li>`).join('')}</${tag}>`)
      continue
    }
    const para: string[] = []
    while (i < lines.length && lines[i].trim() && !isTable(lines[i]) && !isDisplay(lines[i]) && !listItem(lines[i])) {
      para.push(lines[i++].trim())
    }
    out.push(`<p>${inline(para.join(' '))}</p>`)
  }
  return out.join('')
}

const cache = new Map<string, string>()

/** Markdown (with KaTeX math) → HTML. Memoised, like renderLatex. */
export function renderMarkdown(src: string): string {
  let html = cache.get(src)
  if (html !== undefined) return html
  const math: { tex: string; display: boolean }[] = []
  const text = escapeHtml(src.replace(MATH, (_, d: string | undefined, t: string | undefined) => {
    math.push({ tex: d ?? t!, display: d != null })
    const n = math.length - 1
    return d != null ? `\n\n@@d${n}@@\n\n` : `@@i${n}@@`
  }))
  html = blocks(text)
    .replace(/@@d(\d+)@@/g, (_, n: string) => `<div class="sh-md-math">${renderLatex(math[+n].tex, true)}</div>`)
    .replace(/@@i(\d+)@@/g, (_, n: string) => renderLatex(math[+n].tex, false))
  cache.set(src, html)
  return html
}

/** A one-paragraph snippet rendered without its <p> wrapper, for headings and captions. */
export function renderMarkdownInline(src: string): string {
  return renderMarkdown(src).replace(/^<p>([\s\S]*)<\/p>$/, '$1')
}

/** Markdown → plain text for the search index (math kept as its TeX source). */
export function markdownText(src: string): string {
  return src.replace(/[*`|#]/g, ' ').replace(/\s+/g, ' ').trim()
}
