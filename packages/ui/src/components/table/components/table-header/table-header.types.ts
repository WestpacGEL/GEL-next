import { HTMLAttributes, ReactNode } from 'react';

export type TableHeaderProps = {
  /**
   * header content
   */
  children: ReactNode;
} & HTMLAttributes<HTMLTableSectionElement>;
