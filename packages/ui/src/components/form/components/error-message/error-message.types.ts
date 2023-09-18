import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './error-message.styles.js';

export type ErrorMessageProps = {
  /**
   * Icon
   */
  icon?: (...args: unknown[]) => JSX.Element;
  /**
   * Message or messages
   */
  message?: ReactNode | ReactNode[];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
