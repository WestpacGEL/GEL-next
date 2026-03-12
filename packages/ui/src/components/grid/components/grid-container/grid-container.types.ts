import { HTMLAttributes } from 'react';

import { ResponsiveVariants } from '../../../../types/responsive-variants.types.js';

export type GridContainerProps = {
  /**
   * Enable fixed width container mode. In this mode the container width is fixed at each breakpoint.
   */
  fixed?: ResponsiveVariants<boolean>;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
