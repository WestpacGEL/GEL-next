import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './form-label.styles.js';

type Variants = VariantProps<typeof styles>;

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
   * Spacing
   */
  spacing?: Variants['spacing'];
  /**
   * Enable ‘screen reader only’ mode
   */
  srOnly?: boolean;
  /**
   * Sub-label mode (smaller label text size)
   */
  subLabel?: Variants['subLabel'];
  /**
   * Component tag
   */
  tag?: 'label' | 'legend';
} & HTMLAttributes<Element>;
