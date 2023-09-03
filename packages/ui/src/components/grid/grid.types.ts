import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './grid.styles.js';

export type GridProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
