import { HTMLAttributes, ReactNode } from 'react';

export type PanelBodyProps = {
  /**
   * body content
   */
  children: ReactNode;
} & HTMLAttributes<Element>;
