import { InputHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './input.styles.js';

type Variants = VariantProps<typeof styles>;

export type InputProps = {
  /**
   * Whether the input is invalid
   */
  invalid?: boolean;
  /**
   * Size of input
   */
  size?: Variants['size'];
  /**
   * width of input
   */
  width?: Variants['width'];
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'width'>;
