export interface SubFormula {
  latex: string;
  displayMode?: boolean;
}

export interface TableRow {
  symbol: string;
  value: string;
  quantity: string;
}

export type CardType = 'standard' | 'widget';

export interface Card {
  id: string;
  title: string;
  tag: string;
  tagColor: string;   // e.g. '#3C3489'
  tagBg: string;      // e.g. '#EEEDFE'
  formula?: string;   // LaTeX string
  formulaDisplay?: boolean;
  subs?: SubFormula[];
  notes?: string;     // HTML string
  tableRows?: TableRow[];
  type?: CardType;
  order: number;
}

export interface Section {
  id: string;
  label: string;
  cat: string;
  cards: Card[];
  order: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  accent: string;
  accentBg: string;
  accentFg: string;
  accentBgDark: string;
  accentFgDark: string;
  sections: Section[];
  isDefault: boolean;
  defaultVersion?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AppMeta {
  activeCourseId: string | null;
}
