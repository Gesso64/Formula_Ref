import { useState } from 'react'

const RATES = [0.5,1,1.5,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,25,30,40,50]
const NS_FULL = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
const NS_SHORT = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35]

function compute(rate: number, N: number) {
  const r = rate / 100
  const fp = Math.pow(1 + r, N)
  return {
    fp, pf: 1/fp,
    af: r/(fp-1), fa: (fp-1)/r,
    ap: r*fp/(fp-1), pa: (fp-1)/(r*fp),
    ag: (fp - r*N - 1)/(r*(fp-1))
  }
}

function fmt(v: number) {
  if (!isFinite(v) || isNaN(v)) return '—'
  if (Math.abs(v) >= 1e6) return v.toExponential(3)
  if (Math.abs(v) >= 100) return v.toFixed(2)
  if (Math.abs(v) >= 10)  return v.toFixed(3)
  if (Math.abs(v) >= 1)   return v.toFixed(4)
  return v.toFixed(5)
}

export function InterestTable() {
  const [rate, setRate] = useState(10)
  const [jumpN, setJumpN] = useState('')

  const ns = rate >= 20 ? NS_SHORT : NS_FULL
  const highlightN = parseInt(jumpN) || null
  const extraRow = highlightN && !ns.includes(highlightN) && highlightN > 0 ? highlightN : null
  const displayNs = extraRow ? [...ns, extraRow].sort((a,b) => a-b) : ns

  const th: React.CSSProperties = { padding: '6px 10px', textAlign: 'right', fontWeight: 600, color: 'var(--color-text2)', borderBottom: '1px solid var(--color-border2)', whiteSpace: 'nowrap', fontSize: 10.5, letterSpacing: '0.03em', background: 'var(--color-bg2)' }
  const td = (hi: boolean): React.CSSProperties => ({ padding: '5px 8px', textAlign: 'right', color: hi ? 'var(--color-text)' : 'var(--color-text2)', fontVariantNumeric: 'tabular-nums', fontSize: 11.5, background: hi ? 'var(--color-bg2)' : undefined, fontWeight: hi ? 600 : undefined })

  return (
    <div>
      {/* Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 11.5, color: 'var(--color-text2)' }}>Rate <em>i</em></label>
          <select
            value={rate}
            onChange={e => setRate(parseFloat(e.target.value))}
            style={{ fontSize: 12, padding: '5px 10px', borderRadius: 6, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text)', outline: 'none', cursor: 'pointer' }}
          >
            {RATES.map(r => <option key={r} value={r}>{r}%</option>)}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <label style={{ fontSize: 11.5, color: 'var(--color-text2)' }}>Jump to <em>N</em></label>
          <input
            type="number" min={1} max={200} placeholder="N"
            value={jumpN}
            onChange={e => setJumpN(e.target.value)}
            style={{ fontSize: 12, padding: '5px 8px', borderRadius: 6, width: 64, border: '0.5px solid var(--color-border2)', background: 'var(--color-bg2)', color: 'var(--color-text)', outline: 'none', textAlign: 'center' }}
          />
        </div>
        {extraRow && (
          <div style={{ fontSize: 10.5, padding: '3px 10px', borderRadius: 99, background: 'var(--color-bg2)', color: 'var(--color-text)', border: '0.5px solid var(--color-border2)' }}>
            ✦ N={extraRow} computed (not in standard table)
          </div>
        )}
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto', borderRadius: 8, border: '0.5px solid var(--color-border)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
          <thead>
            <tr>
              {['N','(F/P,i,N)','(P/F,i,N)','(A/F,i,N)','(F/A,i,N)','(A/P,i,N)','(P/A,i,N)','(A/G,i,N)'].map((h,i) => (
                <th key={h} style={{ ...th, textAlign: i === 0 ? 'center' : 'right' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayNs.map(N => {
              const f = compute(rate, N)
              const hi = N === highlightN
              const isExtra = N === extraRow
              return (
                <tr key={N} id={`itbl-${N}`} style={{ background: hi ? 'var(--color-bg2)' : undefined, borderTop: isExtra ? '1px dashed var(--color-border2)' : undefined }}>
                  <td style={{ ...td(hi), textAlign: 'center', fontWeight: 600, color: hi ? 'var(--color-text)' : 'var(--color-text2)' }}>{N}</td>
                  <td style={td(hi)}>{fmt(f.fp)}</td>
                  <td style={td(hi)}>{fmt(f.pf)}</td>
                  <td style={td(hi)}>{fmt(f.af)}</td>
                  <td style={td(hi)}>{fmt(f.fa)}</td>
                  <td style={td(hi)}>{fmt(f.ap)}</td>
                  <td style={td(hi)}>{fmt(f.pa)}</td>
                  <td style={td(hi)}>{fmt(f.ag)}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
