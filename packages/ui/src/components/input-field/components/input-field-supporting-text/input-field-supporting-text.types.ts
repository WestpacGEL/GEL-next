import { HTMLAttributes } from 'react';

export type InputFieldSupportingTextProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
