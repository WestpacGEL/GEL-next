import { HTMLAttributes, ReactNode } from 'react';

export type ModalDialogFooterProps = {
  /**
   * Footer content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;
