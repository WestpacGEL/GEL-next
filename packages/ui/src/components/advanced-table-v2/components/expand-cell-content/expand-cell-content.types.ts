import { ReactNode } from 'react';

export type ExpandCellContentProps = {
  /** Nesting depth of the row (`row.depth`) — drives the left-indent. */
  depth: number;
  /** Whether an expand control renders for this row (`row.getCanExpand()`). */
  showExpandControl: boolean;
  /** Current expanded state of the row. */
  isExpanded: boolean;
  /** Toggles the row's expanded state (`row.getToggleExpandedHandler()`). */
  onToggleExpanded: () => void;
  /** The column's own rendered cell content, shown after the expand control. */
  children: ReactNode;
  'aria-controls'?: string;
  'aria-expanded': boolean;
  'aria-label': string;
};
