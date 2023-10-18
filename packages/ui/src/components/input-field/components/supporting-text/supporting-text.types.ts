import { HTMLAttributes } from 'react';

export type SupportingTextProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
