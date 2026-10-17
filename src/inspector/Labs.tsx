import { memo, useState } from 'react'
import { renderMarkdown, renderMarkdownInline } from '@/lib/markdown'
import type { PracticeLab, PracticeProblem } from '@/types'
import { IconFile } from './icons'
import { assetUrl, labHeading } from './paneModel'

const Md = memo(function Md({ src, className }: { src: string; className?: string }) {
  return <div className={`sh-md ${className ?? ''}`} dangerouslySetInnerHTML={{ __html: renderMarkdown(src) }} />
})

/** One practice problem: label rail + statement, with the solution behind a reveal. The solution
 *  is only mounted once opened, so a lab's KaTeX cost is the statements until you ask for more. */
const Problem = memo(function Problem({ p, open, flash, onToggle }: {
  p: PracticeProblem; open: boolean; flash: boolean; onToggle: (id: string) => void
}) {
  return (
    <article id={`sh-prob-${p.id}`} data-prob={p.id} className={`sh-prob${open ? ' is-open' : ''}${flash ? ' sh-flash' : ''}`}
      aria-label={`Problem ${p.label}`}>
      <div className="sh-prob-label">{p.label}</div>
      <div className="sh-prob-body">
        <Md src={p.statement} className="sh-prob-q" />
        {p.figure && <img className="sh-prob-fig" src={assetUrl(p.figure)} alt={`Figure for problem ${p.label}`} loading="lazy" />}
        <button type="button" className="sh-prob-toggle" aria-expanded={open} aria-controls={`sh-sol-${p.id}`}
          onClick={() => onToggle(p.id)}>
          {open ? 'Hide solution' : 'Show solution'}
        </button>
        {open && (
          <section className="sh-prob-sol" id={`sh-sol-${p.id}`} aria-label="Solution">
            {p.method && <div className="sh-prob-method" dangerouslySetInnerHTML={{ __html: renderMarkdownInline(p.method) }} />}
            {p.solutionFigure && <img className="sh-prob-fig" src={assetUrl(p.solutionFigure)} alt={`Solution figure for problem ${p.label}`} loading="lazy" />}
            <Md src={p.solution} />
          </section>
        )}
      </div>
    </article>
  )
})

const METHODS_KEY = 'formula-ref:lab-methods-open'

/** Whether the key-methods dropdown is open, kept across labs (each LabView remounts per lab). */
function loadMethodsOpen(): boolean {
  try { return localStorage.getItem(METHODS_KEY) === '1' } catch { return false }
}
function saveMethodsOpen(v: boolean) {
  try { localStorage.setItem(METHODS_KEY, v ? '1' : '0') } catch { /* ignore */ }
}

/** A practice lab: header band, blurb with actions and prev/next nav, the key-methods dropdown, then its problems. */
export function LabView({ lab, flash, prev, next, onLab, pdfUrl }: {
  lab: PracticeLab
  flash: string | null
  prev: PracticeLab | null
  next: PracticeLab | null
  onLab: (n: number) => void
  pdfUrl: string | null
}) {
  const [open, setOpen] = useState<Set<string>>(() => new Set())
  const toggle = (id: string) => setOpen(s => {
    const n = new Set(s)
    if (!n.delete(id)) n.add(id)
    return n
  })
  const allOpen = lab.problems.every(p => open.has(p.id))
  const [methodsOpen, setMethodsOpenState] = useState(loadMethodsOpen)
  const setMethodsOpen = (v: boolean) => { setMethodsOpenState(v); saveMethodsOpen(v) }

  return (
    <div className="sh-lab">
      <header className="sh-band sh-band--lab">
        <span className="sh-band-num">{labHeading(lab)}</span>
        <h2 className="sh-band-title">{lab.title}</h2>
        <span className="sh-band-ref">{lab.ref}</span>
      </header>
      <div className="sh-lab-sub">
        <p className="sh-lab-blurb" dangerouslySetInnerHTML={{ __html: renderMarkdownInline(lab.blurb) }} />
        <div className="sh-lab-actions">
          <button type="button" className="sh-textbtn"
            onClick={() => setOpen(allOpen ? new Set() : new Set(lab.problems.map(p => p.id)))}>
            {allOpen ? 'Hide all solutions' : 'Show all solutions'}
          </button>
          {pdfUrl && (
            <a className="sh-textbtn" href={pdfUrl} target="_blank" rel="noopener noreferrer"
              title="Printable version: each problem on its own page, solution on the next">
              <IconFile size={14} />PDF
            </a>
          )}
        </div>
        <nav className="sh-lab-nav" aria-label="Other labs">
          {prev && (
            <button type="button" className="sh-lab-navbtn" onClick={() => onLab(prev.number)}>
              <span>← {labHeading(prev)}</span>{prev.title}
            </button>
          )}
          {next && (
            <button type="button" className="sh-lab-navbtn sh-lab-navbtn--next" onClick={() => onLab(next.number)}>
              <span>{labHeading(next)} →</span>{next.title}
            </button>
          )}
        </nav>
      </div>

      <div className={`sh-lab-grid${methodsOpen ? '' : ' is-collapsed'}`}>
        <details className="sh-lab-intro" open={methodsOpen}
          onToggle={e => setMethodsOpen(e.currentTarget.open)}>
          <summary className="sh-ex-label sh-lab-intro-sum">Key methods</summary>
          <Md src={lab.intro} />
        </details>
        <div className="sh-lab-probs">
          {lab.problems.map(p => (
            <Problem key={p.id} p={p} open={open.has(p.id)} flash={flash === p.id} onToggle={toggle} />
          ))}
        </div>
      </div>

    </div>
  )
}
