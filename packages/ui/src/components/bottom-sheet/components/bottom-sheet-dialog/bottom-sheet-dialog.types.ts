import { HTMLAttributes, ReactNode } from 'react';
import { AriaDialogProps } from 'react-aria';

export type DialogProps = AriaDialogProps & {
  children: ReactNode;
  onClose?: () => unknown;
  /**
   * Label for primary button
   */
  primaryLabel?: string;
  /**
   * onClick for primary button
   */
  primaryOnClick?: () => void;
  /**
   * Label for secondary button
   */
  secondaryLabel?: string;
  /**
   * onClick for secondary button
   */
  secondaryOnClick?: () => void;
  title?: string;
} & HTMLAttributes<HTMLDivElement>;
