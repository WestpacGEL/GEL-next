import { ReactNode } from 'react';
import { AriaDialogProps, AriaOverlayProps } from 'react-aria';

export type DialogProps = {
  /**
   * Children to render
   */
  children: ReactNode;
  /**
   * Heading of dialog
   */
  heading?: ReactNode;
  /**
   * Tag to render
   */
  tag?: keyof Pick<JSX.IntrinsicElements, 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;
} & AriaDialogProps &
  Pick<AriaOverlayProps, 'shouldCloseOnInteractOutside'>;
