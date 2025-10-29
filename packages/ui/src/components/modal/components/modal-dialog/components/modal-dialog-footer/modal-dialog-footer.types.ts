import { HTMLMotionProps } from 'motion/react';
import { ReactNode } from 'react';

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
} & HTMLMotionProps<'div'>;
