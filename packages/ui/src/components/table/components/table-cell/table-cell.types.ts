import { ReactNode, TdHTMLAttributes } from 'react';

export type TableCellProps = {
  /**
   * Table cell content
   */
  children?: ReactNode;
  /**
   * Should be `true` if cell is start of highlight
   */
  highlightStart?: boolean;
  /**
   * Should be `true` if cell should be highlighted
   * If cell is first cell in a highlight block highlightStart should also be `true`
   * If multiple cells need to be highlighted it may be easier to pass array of cells through Row
   */
  highlighted?: boolean;
} & TdHTMLAttributes<HTMLTableCellElement>;
