import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './grid-item.styles.js';
import { ResponsiveVariants } from '../../../../types/responsive-variants.types.js';

type Variants = VariantProps<typeof styles>;

export type GridItemProps = {
  /**
   * Controls height of item based on amount of grid spaces to cover
   */
  rowSpan?: ResponsiveVariants<Variants['rowSpan']>;
  /**
   * Controls width of item based on amount of grid spaces to cover
   */
  span?: ResponsiveVariants<Variants['span']>;
  /**
   * Position item should start in grid
   */
  start?: ResponsiveVariants<Variants['start']>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
