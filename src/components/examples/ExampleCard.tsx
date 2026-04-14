import { useState, useEffect } from 'react'
import { renderLatex } from '@/lib/katex'
import type { WorkedExample } from '@/types'

interface Props {
  example: WorkedExample
  accent: string
  accentBg: string
  accentFg: string
  forceOpen?: boolean
}

export function ExampleCard({ example, accent, accentBg, accentFg, forceOpen }: Props) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (forceOpen) setOpen(true)
  }, [forceOpen])

  return (
    <div
      id={`ex-${example.id}`}
      style={{
        background: 'var(--color-surface)',
        border: `0.5px solid ${open ? accent : 'var(--color-border)'}`,
        borderRadius: 12,
        overflow: 'hidden',
        transition: 'border-color .15s',
      }}
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '12px 14px',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 10,
        }}
      >
        {/* Q# badge */}
        <span style={{
          fontSize: 10,
          fontWeight: 700,
          padding: '2px 8px',
          borderRadius: 99,
          whiteSpace: 'nowrap',
          flexShrink: 0,
          background: accentBg,
          color: accentFg,
          marginTop: 1,
        }}>
          Q{example.number}
        </span>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text)', lineHeight: 1.4 }}>
            {example.title}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginTop: 5 }}>
            {/* Source badge */}
            <span style={{
              fontSize: 10,
              padding: '1px 7px',
              borderRadius: 99,
              background: 'var(--color-bg2)',
              color: 'var(--color-text3)',
              border: '0.5px solid var(--color-border)',
            }}>
              {example.source}
            </span>
            {/* Topic tags */}
            {example.topics.map(t => (
              <span key={t} style={{
                fontSize: 10,
                padding: '1px 7px',
                borderRadius: 99,
                background: 'var(--color-bg2)',
                color: 'var(--color-text2)',
                border: '0.5px solid var(--color-border)',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Expand chevron */}
        <span style={{
          fontSize: 11,
          color: 'var(--color-text3)',
          flexShrink: 0,
          marginTop: 2,
          transform: open ? 'rotate(180deg)' : 'none',
          transition: 'transform .2s',
          display: 'inline-block',
        }}>
          ▾
        </span>
      </button>

      {/* Expanded body */}
      {open && (
        <div style={{ padding: '0 14px 14px' }}>
          <div style={{ height: 0.5, background: 'var(--color-border)', marginBottom: 12 }} />

          {/* Given */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-text3)', marginBottom: 5 }}>
              Given
            </div>
            <ul style={{ margin: 0, paddingLeft: 16, listStyle: 'disc' }}>
              {example.given.map((item, i) => (
                <li key={i} style={{ fontSize: 12.5, color: 'var(--color-text2)', lineHeight: 1.6 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Solution steps */}
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--color-text3)', marginBottom: 8 }}>
              Solution
            </div>
            {example.steps.map((step, i) => (
              <div key={i}>
                {step.text && (
                  <p style={{ fontSize: 12.5, color: 'var(--color-text2)', margin: '0 0 4px', lineHeight: 1.55 }}>
                    {step.text}
                  </p>
                )}
                {step.latex && (
                  <div
                    style={{
                      background: 'var(--color-bg2)',
                      borderRadius: 7,
                      padding: '7px 10px',
                      marginBottom: 6,
                      fontSize: 13,
                      overflowX: 'auto',
                    }}
                    dangerouslySetInnerHTML={{ __html: renderLatex(step.latex, step.displayMode) }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Answer */}
          <div style={{
            padding: '8px 12px',
            borderRadius: 8,
            background: accentBg,
            marginBottom: example.interpretation ? 10 : 0,
          }}>
            <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.09em', color: accentFg, marginRight: 8 }}>
              Answer
            </span>
            <span style={{ fontSize: 13, fontWeight: 500, color: accentFg }}>
              {example.answer}
            </span>
          </div>

          {/* Physical interpretation */}
          {example.interpretation && (
            <p style={{
              fontSize: 12,
              color: 'var(--color-text3)',
              fontStyle: 'italic',
              lineHeight: 1.6,
              margin: 0,
              borderLeft: `2px solid var(--color-border2)`,
              paddingLeft: 10,
            }}>
              {example.interpretation}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
