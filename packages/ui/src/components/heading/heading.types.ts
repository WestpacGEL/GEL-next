import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from '../../types/responsive-variants.types.js';

import { styles } from './heading.styles.js';

type Variants = VariantProps<typeof styles>;

export type HeadingProps = {
  /**
   * Whether it should be a brand heading
   */
  brandHeading?: ResponsiveVariants<Variants['brandHeading']>;
  /**
   * Heading text
   */
  children?: ReactNode;
  /**
   * Size of heading
   */
  size: ResponsiveVariants<Variants['size']>;
  /**
   * Semantic tag, will be determined by size if not provided.
   * Will default to 'h6' if using responsive size.
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Whether heading should be uppercase
   */
  uppercase?: boolean;
} & HTMLAttributes<HTMLDivElement>;
