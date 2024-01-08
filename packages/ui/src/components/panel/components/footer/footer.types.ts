import { HTMLAttributes, ReactNode } from 'react';

export type FooterProps = {
  /**
   * footer content
   */
  children: ReactNode;
} & HTMLAttributes<Element>;
