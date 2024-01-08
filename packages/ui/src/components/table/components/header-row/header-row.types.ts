import { HTMLAttributes, ReactNode } from 'react';

export type HeaderRowProps = {
  /**
   * Table header row content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLTableRowElement>;
