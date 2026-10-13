import type { ReactNode, SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }

function Svg({ size = 16, children, ...rest }: P & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  )
}

export const IconChevronDown = (p: P) => <Svg {...p}><path d="M4 6l4 4 4-4" /></Svg>
export const IconSearch = (p: P) => <Svg {...p}><circle cx="7" cy="7" r="4.25" /><path d="M10.25 10.25L13.5 13.5" /></Svg>
export const IconClose = (p: P) => <Svg {...p}><path d="M4 4l8 8M12 4l-8 8" /></Svg>
export const IconMore = (p: P) => (
  <Svg {...p}><circle cx="3.5" cy="8" r=".6" fill="currentColor" /><circle cx="8" cy="8" r=".6" fill="currentColor" /><circle cx="12.5" cy="8" r=".6" fill="currentColor" /></Svg>
)
export const IconPencil = (p: P) => <Svg {...p}><path d="M10.5 3.5l2 2L6 12H4v-2l6.5-6.5z" /></Svg>
export const IconPlus = (p: P) => <Svg {...p}><path d="M8 3.5v9M3.5 8h9" /></Svg>
export const IconDownload = (p: P) => <Svg {...p}><path d="M8 2.5v8M4.75 7.25L8 10.5l3.25-3.25M3 13.5h10" /></Svg>
export const IconUpload = (p: P) => <Svg {...p}><path d="M8 10.5v-8M4.75 5.75L8 2.5l3.25 3.25M3 13.5h10" /></Svg>
export const IconPrint = (p: P) => <Svg {...p}><path d="M4.5 6V2.5h7V6M4.5 11.5h-2v-5h11v5h-2" /><path d="M4.5 9.5h7v4h-7z" /></Svg>
export const IconFile = (p: P) => <Svg {...p}><path d="M4 1.75h5L12 4.75v9.5H4z" /><path d="M9 1.75v3h3M6 8.5h4M6 11h4" /></Svg>
export const IconArrowUpRight = (p: P) => <Svg {...p}><path d="M5.5 10.5l5-5M6 5.5h4.5V10" /></Svg>
export const IconCheck = (p: P) => <Svg {...p}><path d="M3.5 8.5l3 3 6-7" /></Svg>
export const IconSettings = (p: P) => <Svg {...p}><path d="M2.5 4.5h6M11.5 4.5h2M2.5 11.5h2M7.5 11.5h6" /><circle cx="10" cy="4.5" r="1.5" /><circle cx="6" cy="11.5" r="1.5" /></Svg>

/** Density glyphs: tight rules vs airy rules. */
export const IconDensityCompact = (p: P) => <Svg {...p}><path d="M2.5 3.5h11M2.5 6.5h11M2.5 9.5h11M2.5 12.5h11" /></Svg>
export const IconDensityComfortable = (p: P) => <Svg {...p}><path d="M2.5 4h11M2.5 8h11M2.5 12h11" /></Svg>

/** Wordmark glyph: a ruled sheet with a dark header band. */
export const IconMark = (p: P) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 18 18" aria-hidden="true" focusable="false">
    <rect x="2.5" y="1.5" width="13" height="15" rx="1.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
    <rect x="2.5" y="1.5" width="13" height="4" rx="1.5" fill="currentColor" />
    <path d="M5.25 9h3M9.75 9h3M5.25 12h3M9.75 12h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
export const IconSun = (p: P) => <Svg {...p}><circle cx="8" cy="8" r="2.75" /><path d="M8 1.5v1.5M8 13v1.5M1.5 8H3M13 8h1.5M3.4 3.4l1.06 1.06M11.54 11.54l1.06 1.06M3.4 12.6l1.06-1.06M11.54 4.46l1.06-1.06" /></Svg>
export const IconMoon = (p: P) => <Svg {...p}><path d="M13.25 9.75A5.5 5.5 0 0 1 6.25 2.75a5.5 5.5 0 1 0 7 7z" /></Svg>
