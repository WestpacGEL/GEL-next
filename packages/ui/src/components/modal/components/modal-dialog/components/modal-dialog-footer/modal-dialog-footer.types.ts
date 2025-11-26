import { HTMLAttributes, ReactNode } from 'react';

export type ModalDialogFooterProps = {
  /**
   * Footer content
   */
  children?: ReactNode;
  /**
   * Label for primary button
   */
  primaryLabel: string;
  /**
   * onClick for primary button
   */
  primaryOnClick: () => void;
  /**
   * Label for secondary button
   */
  secondaryLabel?: string;
  /**
   * onClick for secondary button
   */
  secondaryOnClick?: () => void;
} & HTMLAttributes<HTMLElement>;
