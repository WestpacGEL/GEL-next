import { AnchorHTMLAttributes } from 'react';

export type BreadcrumbItemProps = {
  /**
   * isCurrent flag
   * @default false
   */
  isCurrent?: boolean;
  /**
   * isDisabled flag
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Tag to render
   * @default span
   */
  tag?: keyof JSX.IntrinsicElements;
} & AnchorHTMLAttributes<Element>;
