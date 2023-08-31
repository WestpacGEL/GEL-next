import { HTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './container.styles.js';

export type ContainerProps = {
  /**
   * Enable fixed width container mode. In this mode the container width is fixed at each breakpoint.
   */
  fixed?: boolean;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
