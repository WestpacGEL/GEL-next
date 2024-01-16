import { HTMLAttributes } from 'react';

export type InputGroupSupportingTextProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
