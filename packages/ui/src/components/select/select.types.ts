import { SelectHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './select.styles.js';

type Variants = VariantProps<typeof styles>;

export type SelectProps = {
  /**
   * Whether select is invalid
   * @default false
   */
  invalid?: Variants['invalid'];
  /**
   * Size of select
   * @default medium
   */
  size?: Variants['size'];
  /**
   * Width of select
   * @default auto
   */
  width?: Variants['width'];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;
