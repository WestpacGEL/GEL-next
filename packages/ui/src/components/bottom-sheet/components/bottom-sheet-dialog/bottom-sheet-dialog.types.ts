import { HTMLAttributes, ReactNode } from 'react';
import { AriaDialogProps } from 'react-aria';

export type DialogProps = AriaDialogProps & {
  /**
   * Content displayed in the body of the bottom sheet dialog.
   */
  children: ReactNode;
  /**
   * Called when the close button is pressed.
   */
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
  /**
   * Heading displayed at the top of the bottom-sheet dialog
  */
  title?: string;
} & HTMLAttributes<HTMLDivElement>;
