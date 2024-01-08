import { HTMLAttributes, ReactNode } from 'react';

export type FooterProps = {
  /**
   * Table footer content
   */
  children?: ReactNode;
  /**
   * Span for footer, should be same length as amount of columns in table
   */
  colspan: number;
} & HTMLAttributes<HTMLTableSectionElement>;
