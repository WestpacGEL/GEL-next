import { HTMLAttributes, ReactNode } from 'react';

export type ModalDialogBodyProps = {
  /**
   * Dialog Body content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLElement>;
