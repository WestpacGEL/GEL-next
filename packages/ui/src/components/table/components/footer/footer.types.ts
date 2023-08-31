import { HTMLAttributes } from 'react';

export type FooterProps = {
  /**
   * Span for footer, should be same length as amount of columns in table
   */
  colspan: number;
} & HTMLAttributes<HTMLTableSectionElement>;
