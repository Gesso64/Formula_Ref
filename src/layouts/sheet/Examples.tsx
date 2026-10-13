import { memo, useMemo } from 'react'
import { renderLatex } from '@/lib/katex'
import type { WorkedExample } from '@/types'

interface StepGroup { text?: string; latex: { tex: string; display?: boolean }[] }

function groupSteps(ex: WorkedExample): StepGroup[] {
  const out: StepGroup[] = []
  for (const s of ex.steps) {
    if (s.text || out.length === 0) out.push({ text: s.text, latex: [] })
    if (s.latex) out[out.length - 1].latex.push({ tex: s.latex, display: s.displayMode })
  }
  return out
}

/** A worked example set in the sheet language: dark band (Q-number + title + source),
 *  then Given | Solution side by side and a shaded Answer row. */
export const ExampleBlock = memo(function ExampleBlock({ ex, flash }: { ex: WorkedExample; flash: boolean }) {
  const groups = useMemo(() => groupSteps(ex).map(g => ({
    text: g.text,
    html: g.latex.map(l => renderLatex(l.tex, l.display)),
  })), [ex])

  return (
    <article id={`sh-ex-${ex.id}`} data-ex={ex.id} className={`sh-ex${flash ? ' sh-flash' : ''}`}
      aria-labelledby={`sh-ex-${ex.id}-t`}>
      <header className="sh-band sh-band--ex">
        <span className="sh-band-num">Q{ex.number}</span>
        <h2 className="sh-band-title" id={`sh-ex-${ex.id}-t`}>{ex.title}</h2>
        <span className="sh-band-ref">{ex.topics.join(' · ')}</span>
      </header>

      <div className="sh-ex-grid">
        <section className="sh-ex-given" aria-label="Given">
          <h3 className="sh-ex-label">Given</h3>
          <ul>
            {ex.given.map((g, i) => <li key={i}>{g}</li>)}
          </ul>
          <div className="sh-ex-source">{ex.source}</div>
        </section>

        <section className="sh-ex-steps" aria-label="Solution">
          <h3 className="sh-ex-label">Solution</h3>
          <ol>
            {groups.map((g, i) => (
              <li key={i}>
                <span className="sh-step-n" aria-hidden="true">{i + 1}</span>
                <div className="sh-step-body">
                  {g.text && <p>{g.text}</p>}
                  {g.html.map((h, k) => <div key={k} className="sh-f" dangerouslySetInnerHTML={{ __html: h }} />)}
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <div className="sh-ex-answer">
        <span className="sh-ex-label">Answer</span>
        <div>
          <div className="sh-ex-answer-text">{ex.answer}</div>
          {ex.interpretation && <p className="sh-note">{ex.interpretation}</p>}
        </div>
      </div>
    </article>
  )
})
