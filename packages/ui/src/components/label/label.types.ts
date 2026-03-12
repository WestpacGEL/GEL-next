import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from '../../types/responsive-variants.types.js';

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
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * Spacing
   */
  spacing?: ResponsiveVariants<Variants['spacing']>;
  /**
   * Enable ‘screen reader only’ mode
   */
  srOnly?: boolean;
  /**
   * Component tag
   */
  tag?: 'label' | 'legend';
} & HTMLAttributes<Element>;
