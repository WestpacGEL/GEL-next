import { HTMLAttributes, ReactNode } from 'react';

export type DialogBodyProps = {
  /**
   * Dialog Body content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;
