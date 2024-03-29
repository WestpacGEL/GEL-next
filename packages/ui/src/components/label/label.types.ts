import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './label.styles.js';

type Variants = VariantProps<typeof styles>;

export type LabelProps = {
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
   * label size
   */
  size?: Variants['size'];
  /**
   * Spacing
   */
  spacing?: Variants['spacing'];
  /**
   * Enable ‘screen reader only’ mode
   */
  srOnly?: boolean;
  /**
   * Component tag
   */
  tag?: 'label' | 'legend';
} & HTMLAttributes<Element>;
