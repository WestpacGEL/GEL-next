import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './grid-item.styles.js';

type Variants = VariantProps<typeof styles>;

export type GridItemProps = {
  /**
   * Controls height of item based on amount of grid spaces to cover
   */
  rowSpan?: Variants['rowSpan'];
  /**
   * Controls width of item based on amount of grid spaces to cover
   */
  span?: Variants['span'];
  /**
   * Position item should start in grid
   */
  start?: Variants['start'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
