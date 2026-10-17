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

export interface FormulaSheet {
  label: string;   // e.g. "Midterm Sheet"
  file: string;    // filename under public/formula-sheets/
}

export interface Course {
  id: string;
  code: string;
  name: string;
  description: string;
  term?: string;  // sidebar grouping label, e.g. "Year 1 · Winter 2026"
  sheets?: FormulaSheet[];  // condensed printable PDF sheets for this course
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
  labs?: PracticeLab[];  // practice problem sets, shown in the "Labs" view (MTH425)
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
  diagram?: string;  // registry key for optional SVG diagram
}

/* Practice labs: text fields are Markdown with $…$ / $$…$$ math (see src/lib/markdown.ts). */
export interface PracticeProblem {
  id: string;
  label: string;      // "P1" … "P8", or "B(a)" for Lab 4's set-up questions
  method: string;     // the solution's one-line approach (kept behind the reveal)
  statement: string;
  solution: string;
  figure?: string;    // image path under public/, shown below the statement
  solutionFigure?: string;  // image path under public/, shown at the top of the solution
}

/* A practice set in the Practice view: a lab's problem set, or test practice. */
export interface PracticeLab {
  id: string;
  number: number;     // sort order and the #<code>/lab/<n> hash
  heading?: string;   // display name; defaults to "Set <number>"
  short?: string;     // chip badge; defaults to the number
  title: string;
  ref: string;        // textbook sections, e.g. "§2.2, 2.3"
  blurb: string;      // what the set covers
  intro: string;      // key-methods recap shown above the problems
  pdf?: string;       // printable version, a path under public/
  problems: PracticeProblem[];
}
