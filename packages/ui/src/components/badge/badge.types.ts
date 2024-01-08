import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './badge.styles.js';

type Variants = VariantProps<typeof styles>;

export type BadgeProps = {
  /**
   * Badge body content
   */
  children?: ReactNode;
  /**
   * Color of badge
   * @default hero
   */
  color?: Variants['color'];
  /**
   * Tag to render
   * @default div
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Type of badge
   * @default default
   */
  type?: Variants['type'];
} & Omit<HTMLAttributes<Element>, 'color' | 'type'>;
