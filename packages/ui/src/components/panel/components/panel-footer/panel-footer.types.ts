import { HTMLAttributes, ReactNode } from 'react';

export type PanelFooterProps = {
  /**
   * footer content
   */
  children: ReactNode;
} & HTMLAttributes<Element>;
