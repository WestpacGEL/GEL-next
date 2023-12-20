import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './heading.styles.js';

type Variants = VariantProps<typeof styles>;

export type HeadingProps = {
  /**
   * Whether it should be a brand heading
   */
  brandHeading?: boolean;
  /**
   * Size of heading
   */
  size: Variants['size'];
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
