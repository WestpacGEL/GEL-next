import { HTMLAttributes, ReactNode } from 'react';

export type BodyProps = {
  /**
   * Table body content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLTableSectionElement>;
