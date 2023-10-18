import { HTMLAttributes, ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './well.styles.js';

type Variants = VariantProps<typeof styles>;

export type WellProps = {
  /**
   * Well's content
   */
  children: ReactNode;
  /**
   * Color of well
   */
  color?: Variants['color'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
