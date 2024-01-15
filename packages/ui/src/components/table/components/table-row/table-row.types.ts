import { HTMLAttributes, ReactNode } from 'react';

export type TableRowProps = {
  /**
   * Table row content
   */
  children?: ReactNode;
  /**
   * Should be `true` if entire row should be highlighted
   * Can pass array of cell positions to highlight multiple cells without adding props manually to cells
   * See docs for examples how to use array
   */
  highlighted?: boolean | unknown[];
} & HTMLAttributes<HTMLTableRowElement>;
