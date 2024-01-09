import { HTMLAttributes, ReactNode } from 'react';

export type TableBodyBodyProps = {
  /**
   * Table body content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLTableSectionElement>;
