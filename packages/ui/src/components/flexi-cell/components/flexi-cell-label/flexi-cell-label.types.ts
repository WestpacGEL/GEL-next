import { CSSProperties, type HTMLAttributes, type ReactNode } from 'react';

export type FlexiCellLabelProps = {
  /**
   * Children attribute
   */
  children: ReactNode;
  /**
   * Label's font weight
   */
  fontWeight?: CSSProperties['fontWeight'];
  /**
   * Component tag
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Define if it is going to truncate the text
   */
  truncateText?: boolean;
} & HTMLAttributes<HTMLOrSVGElement>;
