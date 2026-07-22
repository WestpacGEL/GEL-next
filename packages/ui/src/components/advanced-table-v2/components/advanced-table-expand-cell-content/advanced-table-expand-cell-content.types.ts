import { ReactNode } from 'react';

export type AdvancedTableExpandCellContentProps = {
  'aria-controls'?: string;
  'aria-expanded': boolean;
  'aria-label': string;
  /** The column's own rendered cell content, shown after the expand control. */
  children: ReactNode;
  /** Nesting depth of the row (`row.depth`) — drives the left-indent. */
  depth: number;
  /** Current expanded state of the row. */
  isExpanded: boolean;
  /** Toggles the row's expanded state (`row.getToggleExpandedHandler()`). */
  onToggleExpanded: () => void;
  /** Whether an expand control renders for this row (`row.getCanExpand()`). */
  showExpandControl: boolean;
};
