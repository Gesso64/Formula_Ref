const PATHS = {
  search: <><circle cx="7" cy="7" r="4.5" /><path d="m10.5 10.5 3 3" /></>,
  chevronRight: <path d="m6 3.5 4.5 4.5L6 12.5" />,
  chevronDown: <path d="m3.5 6 4.5 4.5L12.5 6" />,
  menu: <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />,
  close: <path d="m4 4 8 8M12 4l-8 8" />,
  file: <><path d="M4 1.75h5.25L12.5 5v9.25h-8.5z" /><path d="M9 1.75V5.25h3.5" /><path d="M6.25 8.5h4M6.25 11h4" /></>,
  pencil: <path d="m10.25 2.75 3 3-7.5 7.5H2.75v-3z" />,
  plus: <path d="M8 3v10M3 8h10" />,
  download: <><path d="M8 2.5v8M4.75 7.5 8 10.75l3.25-3.25" /><path d="M2.75 13.25h10.5" /></>,
  upload: <><path d="M8 11V3M4.75 6 8 2.75 11.25 6" /><path d="M2.75 13.25h10.5" /></>,
  arrowRight: <path d="M3 8h9.5M9 4.5 12.5 8 9 11.5" />,
  arrowUpRight: <path d="M5 11 11 5M6 4.75h5.25V10" />,
  cornerUpLeft: <path d="M6 3.5 2.75 6.75 6 10M3 6.75h6.5a3.75 3.75 0 0 1 3.75 3.75v2" />,
  list: <path d="M5.5 4.5h8M5.5 8h8M5.5 11.5h8M2.5 4.5h.5M2.5 8h.5M2.5 11.5h.5" />,
  settings: <><circle cx="8" cy="8" r="2" /><path d="M8 1.75v1.5M8 12.75v1.5M1.75 8h1.5M12.75 8h1.5M3.6 3.6l1.05 1.05M11.35 11.35l1.05 1.05M3.6 12.4l1.05-1.05M11.35 4.65l1.05-1.05" /></>,
} as const

export type IconName = keyof typeof PATHS

export function Icon({ name, size = 16 }: { name: IconName; size?: number }) {
  return (
    <svg className="hb-icon" width={size} height={size} viewBox="0 0 16 16" fill="none" stroke="currentColor"
      strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[name]}
    </svg>
  )
}
