import { HTMLAttributes } from 'react';

import { ResponsiveVariants } from '../../../../types/responsive-variants.types.js';

export type GridItemProps = {
  /**
   * Controls height of item based on amount of grid spaces to cover
   */
  rowSpan?: ResponsiveVariants<1 | 2 | 3 | 4 | 5 | 6>;
  /**
   * Controls width of item based on amount of grid spaces to cover
   */
  span?: ResponsiveVariants<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>;
  /**
   * Position item should start in grid
   */
  start?: ResponsiveVariants<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'auto'>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
