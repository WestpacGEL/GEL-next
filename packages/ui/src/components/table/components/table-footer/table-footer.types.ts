import { HTMLAttributes, ReactNode } from 'react';

export type TableFooterProps = {
  /**
   * Table footer content
   */
  children?: ReactNode;
  /**
   * Span for footer, should be same length as amount of columns in table
   */
  colspan: number;
} & HTMLAttributes<HTMLTableSectionElement>;
