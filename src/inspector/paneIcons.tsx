import type { ReactNode } from 'react'

interface IconProps { size?: number; className?: string; strokeWidth?: number }

function make(paths: ReactNode, displayName: string) {
  function Icon({ size = 16, className, strokeWidth = 1.6 }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
        className={className} aria-hidden="true" focusable="false">
        {paths}
      </svg>
    )
  }
  Icon.displayName = displayName
  return Icon
}

export const SearchIcon = make(<><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></>, 'SearchIcon')
export const ChevronDown = make(<path d="m6 9 6 6 6-6" />, 'ChevronDown')
export const ChevronUp = make(<path d="m6 15 6-6 6 6" />, 'ChevronUp')
export const ArrowLeft = make(<><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>, 'ArrowLeft')
export const ArrowRight = make(<><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>, 'ArrowRight')
export const FileIcon = make(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 13h6M9 17h4" /></>, 'FileIcon')
export const PencilIcon = make(<><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></>, 'PencilIcon')
export const LinkIcon = make(<><path d="M10 14a4.5 4.5 0 0 0 6.4 0l3-3a4.5 4.5 0 0 0-6.4-6.4l-1 1" /><path d="M14 10a4.5 4.5 0 0 0-6.4 0l-3 3a4.5 4.5 0 0 0 6.4 6.4l1-1" /></>, 'LinkIcon')
export const CheckIcon = make(<path d="m5 12.5 4.5 4.5L19 7.5" />, 'CheckIcon')
export const CloseIcon = make(<path d="M6 6l12 12M18 6 6 18" />, 'CloseIcon')
export const BookIcon = make(<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" /><path d="M4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5" /></>, 'BookIcon')
export const FunctionIcon = make(<><path d="M14.5 4.5c-1.8-.6-3.3.2-3.8 2.2L8.3 18c-.5 2-2 2.8-3.8 2.2" /><path d="M7 10h7" /><path d="m15 13 5 5M20 13l-5 5" /></>, 'FunctionIcon')
export const PracticeIcon = make(<><path d="M10 6h10M10 12h10M10 18h10" /><path d="m3.5 6 1.5 1.5 2.5-3" /><path d="m3.5 12 1.5 1.5 2.5-3" /><path d="M4 18h3" /></>, 'PracticeIcon')
export const LayersIcon = make(<><path d="m12 3 9 5-9 5-9-5z" /><path d="m3 13 9 5 9-5" /></>, 'LayersIcon')
export const CourseIcon = make(<><path d="M3 8.5 12 4l9 4.5-9 4.5z" /><path d="M7 10.5V15c0 1.5 2.2 3 5 3s5-1.5 5-3v-4.5" /></>, 'CourseIcon')
export const EnterIcon = make(<><path d="M20 5v6a3 3 0 0 1-3 3H5" /><path d="m9 10-4 4 4 4" /></>, 'EnterIcon')
export const CopyIcon = make(<><rect x="8.5" y="8.5" width="11.5" height="11.5" rx="2" /><path d="M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5" /></>, 'CopyIcon')
