import { type HTMLAttributes, type ReactNode } from 'react';

import type { ResponsiveVariants } from '../../../../types/responsive-variants.types.js';

export type FlexiCellAdornmentProps = {
  /**
   * Define the alignment of content
   */
  align?: ResponsiveVariants<'center' | 'top' | 'bottom'>;
  /**
   * Children attribute
   */
  children?: ReactNode;
  /**
   * Component's tag
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<HTMLOrSVGElement>;
