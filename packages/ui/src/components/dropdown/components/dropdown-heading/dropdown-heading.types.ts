import { HTMLAttributes, ReactNode } from 'react';

export type DropdownHeadingProps = {
  /**
   * DropdownHeading content
   */
  children?: ReactNode;
  /**
   * The tag of the heading element for semantic reasons
   * @default h1
   */
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & HTMLAttributes<Element>;
