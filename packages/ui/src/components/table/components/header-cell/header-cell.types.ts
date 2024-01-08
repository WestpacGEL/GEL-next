import { ReactNode, ThHTMLAttributes } from 'react';

export type HeaderCellProps = {
  /**
   * Table Header Cell content
   */
  children?: ReactNode;
} & ThHTMLAttributes<HTMLTableCellElement>;
