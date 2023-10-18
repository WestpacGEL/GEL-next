import { HTMLAttributes } from 'react';

export type GridProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
