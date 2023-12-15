import { HTMLAttributes, ReactNode } from 'react';

export type FilterProps = {
  /**
   * Should contain `Filter.Input` and `Filter.Buttons` components
   */
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;
