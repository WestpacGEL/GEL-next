import { HTMLAttributes } from 'react';

export type VisuallyHiddenProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
