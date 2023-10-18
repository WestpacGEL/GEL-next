import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './badge.styles.js';

type Variants = VariantProps<typeof styles>;

export type BadgeProps = {
  /**
   * Color of badge
   */
  color?: Variants['color'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Type of badge
   */
  type?: Variants['type'];
} & Omit<HTMLAttributes<Element>, 'color' | 'type'>;
