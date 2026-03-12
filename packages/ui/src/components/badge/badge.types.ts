import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from '../../types/responsive-variants.types.js';

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
  color?: ResponsiveVariants<Variants['color']>;
  /**
   * Removes background colour and adjusts text colour.
   * @default false
   */
  soft?: ResponsiveVariants<Variants['soft']>;
  /**
   * Tag to render
   * @default div
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Type of badge
   * @default default
   */
  type?: ResponsiveVariants<Variants['type']>;
} & Omit<HTMLAttributes<Element>, 'color' | 'type'>;
