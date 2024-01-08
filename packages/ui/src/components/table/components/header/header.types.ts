import { HTMLAttributes, ReactNode } from 'react';

export type HeaderProps = {
  /**
   * header content
   */
  children: ReactNode;
} & HTMLAttributes<HTMLTableSectionElement>;
