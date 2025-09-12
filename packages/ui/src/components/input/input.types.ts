import { InputHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './input.styles.js';
import type { ResponsiveVariants } from '../../types/responsive-variants.types.js';

type Variants = VariantProps<typeof styles>;

export type InputProps = {
  /**
   * Whether the input is invalid
   * @default false
   */
  invalid?: boolean;
  /**
   * Size of input
   * @default medium
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * width of input
   * @default full
   */
  width?: ResponsiveVariants<Variants['width']>;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'>;
