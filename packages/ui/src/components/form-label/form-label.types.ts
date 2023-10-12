import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './form-label.styles.js';

export type FormLabelProps = {
  /**
   * Children
   */
  children?: ReactNode;

  /**
   * Label `for` attribute.
   *
   */
  htmlFor?: string;
  /**
   * Enable ‘screen reader only’ mode
   */
  srOnly?: boolean;
  /**
   * Sub-label mode (smaller label text size)
   */
  subLabel?: boolean;
  /**
   * Component tag
   */
  tag?: 'label' | 'legend';
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
