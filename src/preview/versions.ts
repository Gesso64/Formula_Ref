// Every UI version that can be previewed with ?layout=<id>. `null` is the current UI.
export interface Version {
  id: string | null
  name: string
  summary: string
  status: 'current' | 'shortlisted' | 'new' | 'archived'
}

export const VERSIONS: Version[] = [
  { id: 'inspector', name: 'Sheet + Inspector', status: 'new',
    summary: 'The dense Sheet, with the Index detail pane as an inspector. Click any entry to open it large; ⌘K searches every course.' },
  { id: 'workspace', name: 'Workspace', status: 'new',
    summary: 'Index-style course rail around a Sheet body, a focus mode to step through formulas, and a pinned “My sheet” built from any course.' },
  { id: 'sheet', name: 'Sheet', status: 'shortlisted',
    summary: 'A live version of the printed formula sheets: section bands, label-rail entries, balanced columns.' },
  { id: 'index', name: 'Index', status: 'shortlisted',
    summary: 'Search-first lookup tool: course column, formula list with previews, large detail pane, ⌘K palette.' },
  { id: 'handbook', name: 'Handbook', status: 'archived',
    summary: 'Docs-style three-pane reference with an “On this page” outline.' },
  { id: null, name: 'Current site', status: 'current',
    summary: 'The live UI, for comparison.' },
]

export function layoutHref(id: string | null) {
  return id ? `?layout=${id}` : '?layout=current'
}
