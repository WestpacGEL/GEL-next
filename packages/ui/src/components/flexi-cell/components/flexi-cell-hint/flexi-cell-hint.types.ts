import { type HTMLAttributes, type ReactNode } from 'react';

export type FlexiCellHintProps = {
  /**
   * Children
   */
  children: ReactNode;
  /**
   * HTML tag that will be rendered
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Define if it is going to truncate the text
   */
  truncateText?: boolean;
} & HTMLAttributes<HTMLOrSVGElement>;
