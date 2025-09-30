import { HTMLAttributes, SelectHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

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
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * Width of select
   * @default auto
   */
  width?: ResponsiveVariants<Variants['width']>;
  /**
   * Width of select
   * @default auto
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>;
