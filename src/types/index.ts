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
  exampleIds?: string[];  // IDs of WorkedExample objects linked from this card
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
  _defaultHash?: string;
  createdAt: string;
  updatedAt: string;
  examples?: WorkedExample[];
}

export interface AppMeta {
  activeCourseId: string | null;
}

export interface ExampleStep {
  text?: string;
  latex?: string;
  displayMode?: boolean;
}

export interface WorkedExample {
  id: string;
  number: number;
  title: string;
  source: string;
  topics: string[];
  given: string[];
  steps: ExampleStep[];
  answer: string;
  interpretation?: string;
}
