import { type HTMLAttributes, type ReactNode } from 'react';

export type FlexiCellLabelProps = {
  /**
   * Children attribute
   */
  children: ReactNode;
  /**
   * Styles to match a label that gets rendered on the right of the flexicell i.e. Amount/Balance/Label
   * - Can be used for a label that doesn't have hover effect in dualAction
   */
  rightLabel?: boolean;
  /**
   * Component tag
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Define if it is going to truncate the text
   */
  truncateText?: boolean;
} & HTMLAttributes<HTMLOrSVGElement>;
