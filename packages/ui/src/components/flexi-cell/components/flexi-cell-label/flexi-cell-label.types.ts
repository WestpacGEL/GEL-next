import { type HTMLAttributes, type ReactNode } from 'react';

export type FlexiCellLabelProps = {
  /**
   * Children attribute
   */
  children: ReactNode;
  /**
   * Styles to match a label that gets rendered on the right of the flexicell i.e. Amount/Balance/Label
   */
  rightLabel?: boolean;
  /**
   * Styles to match a promo tile brand label
   */
  subLabel?: boolean;
  /**
   * Component tag
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Define if it is going to truncate the text
   */
  truncateText?: boolean;
} & HTMLAttributes<HTMLOrSVGElement>;
