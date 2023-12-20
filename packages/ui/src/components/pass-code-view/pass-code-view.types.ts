import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { PassCodeProps } from '../pass-code/pass-code.types.js';

import { styles } from './pass-code-view.styles.js';

export type PassCodeViewProps = {
  /**
   * description text
   */
  description?: ReactNode;
  /**
   * error message
   */
  errorMessage?: ReactNode;
  /**
   * header text
   */
  header?: ReactNode;
  /**
   * icon on the header
   */
  headerIcon?: React.ElementType;
  /**
   * boolean to show skeleton
   */
  loading?: boolean;
  /**
   * callback when the value is completely typed
   */
  onComplete?: PassCodeProps['onComplete'];
  /**
   * on click the resend button
   */
  onResend?: () => any;
  /**
   * on click the update button
   */
  onUpdate?: () => any;
  /**
   * length of the passcode
   */
  passCodeLength?: number;
  /**
   * label for resend button
   */
  resendButtonLabel?: ReactNode;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * label for update button
   */
  updateButtonLabel?: ReactNode;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
