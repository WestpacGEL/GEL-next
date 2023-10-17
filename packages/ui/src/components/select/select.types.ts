import { SelectHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './select.styles.js';

type Variants = VariantProps<typeof styles>;

export type SelectProps = {
  /**
   * Whether select is invalid
   */
  invalid?: Variants['invalid'];
  /**
   * Size of select
   */
  size?: Variants['size'];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;
