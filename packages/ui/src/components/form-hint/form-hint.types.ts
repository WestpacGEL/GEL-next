import { HTMLAttributes } from 'react';

export type FormHintProps = {
  /**
   * spacing
   */
  spacing?: 'medium' | 'large';
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
