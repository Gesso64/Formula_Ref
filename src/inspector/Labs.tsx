import { memo, useState } from 'react'
import { renderMarkdown, renderMarkdownInline } from '@/lib/markdown'
import type { PracticeLab, PracticeProblem } from '@/types'
import { IconFile } from './icons'

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
        <button type="button" className="sh-prob-toggle" aria-expanded={open} aria-controls={`sh-sol-${p.id}`}
          onClick={() => onToggle(p.id)}>
          {open ? 'Hide solution' : 'Show solution'}
        </button>
        {open && (
          <section className="sh-prob-sol" id={`sh-sol-${p.id}`} aria-label="Solution">
            {p.method && <div className="sh-prob-method" dangerouslySetInnerHTML={{ __html: renderMarkdownInline(p.method) }} />}
            <Md src={p.solution} />
          </section>
        )}
      </div>
    </article>
  )
})

/** A practice lab: header band, the key-methods recap, then its problems. */
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

  return (
    <div className="sh-lab">
      <header className="sh-band sh-band--lab">
        <span className="sh-band-num">Lab {lab.number}</span>
        <h2 className="sh-band-title">{lab.title}</h2>
        <span className="sh-band-ref">Zill {lab.ref}</span>
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
      </div>

      <div className="sh-lab-grid">
        <aside className="sh-lab-intro" aria-label="Key methods">
          <h3 className="sh-ex-label">Key methods</h3>
          <Md src={lab.intro} />
        </aside>
        <div className="sh-lab-probs">
          {lab.problems.map(p => (
            <Problem key={p.id} p={p} open={open.has(p.id)} flash={flash === p.id} onToggle={toggle} />
          ))}
        </div>
      </div>

      <nav className="sh-lab-nav" aria-label="Other labs">
        {prev ? (
          <button type="button" className="sh-lab-navbtn" onClick={() => onLab(prev.number)}>
            <span>← Lab {prev.number}</span>{prev.title}
          </button>
        ) : <span />}
        {next && (
          <button type="button" className="sh-lab-navbtn sh-lab-navbtn--next" onClick={() => onLab(next.number)}>
            <span>Lab {next.number} →</span>{next.title}
          </button>
        )}
      </nav>
    </div>
  )
}
