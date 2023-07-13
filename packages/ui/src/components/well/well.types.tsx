import { HTMLAttributes, ReactNode } from 'react';

export type WellProps = {
  /**
   * background color class
   */
  bgClass?: string;
  /**
   * Well's content
   */
  children: ReactNode;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<Element>;
