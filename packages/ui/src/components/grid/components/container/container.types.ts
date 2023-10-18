import { HTMLAttributes } from 'react';

export type ContainerProps = {
  /**
   * Enable fixed width container mode. In this mode the container width is fixed at each breakpoint.
   */
  fixed?: boolean;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
