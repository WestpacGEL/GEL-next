import { type VariantProps } from 'class-variance-authority';
import { HTMLAttributes, ReactNode } from 'react';

import { styles } from './well.styles.js';

export type WellProps = {
  /**
   * Well's content
   */
  children: ReactNode;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element> &
  VariantProps<typeof styles>;
