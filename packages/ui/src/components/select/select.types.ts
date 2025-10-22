import { SelectHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './select.styles.js';

type Variants = VariantProps<typeof styles>;

export type SelectProps = {
  /**
   * Whether to set the title for the select to the currently selected option for use with truncation.
   * Optional for accessibility reasons as it should only be enabled when required. Will not be read by screen readers.
   * @default false
   */
  enableTooltip?: boolean;
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
