import { type HTMLAttributes, type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './flexi-cell-adornment.styles.js';

export type FlexiCellAdornmentProps = {
  /**
   * Define the alignment of content
   */
  align?: 'center' | 'top' | 'bottom';
  /**
   * Children attribute
   */
  children: ReactNode;
  /**
   * Component's tag
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<HTMLOrSVGElement> &
  VariantProps<typeof styles>;
