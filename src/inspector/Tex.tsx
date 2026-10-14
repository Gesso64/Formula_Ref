import { memo, useMemo } from 'react'
import { renderLatex } from '@/lib/katex'

interface Props { tex: string; display?: boolean; className?: string }

/** Memoised KaTeX span — every formula in this layout goes through renderLatex. */
export const Tex = memo(function Tex({ tex, display = false, className }: Props) {
  const html = useMemo(() => renderLatex(tex, display), [tex, display])
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />
})
