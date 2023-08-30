import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './item.styles.js';

export type ItemProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
