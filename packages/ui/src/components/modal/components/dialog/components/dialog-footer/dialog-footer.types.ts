import { HTMLAttributes, ReactNode } from 'react';

export type DialogFooterProps = {
  /**
   * Footer content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;
