import { HTMLAttributes, ReactNode } from 'react';

export type BodyProps = {
  /**
   * body content
   */
  children: ReactNode;
} & HTMLAttributes<Element>;
