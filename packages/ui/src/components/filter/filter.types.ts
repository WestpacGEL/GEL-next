import { HTMLAttributes, ReactNode } from 'react';

export type FilterProps = {
  /**
   * Should contain `FilterInput` and `Filter.Buttons` components
   */
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
