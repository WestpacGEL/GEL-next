import { HTMLAttributes, ReactNode } from 'react';

export type TableHeaderRowProps = {
  /**
   * Table header row content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLTableRowElement>;
