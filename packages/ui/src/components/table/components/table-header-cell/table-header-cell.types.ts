import { ReactNode, ThHTMLAttributes } from 'react';

export type TableHeaderCellProps = {
  /**
   * Table Header Cell content
   */
  children?: ReactNode;
} & ThHTMLAttributes<HTMLTableCellElement>;
