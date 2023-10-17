import { HTMLAttributes } from 'react';

export type FormGroupProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
