import { HTMLAttributes } from 'react';

export type HeadingProps = {
  /**
   * The tag of the heading element for semantic reasons
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & HTMLAttributes<Element>;
