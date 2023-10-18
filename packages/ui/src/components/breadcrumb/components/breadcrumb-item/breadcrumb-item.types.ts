import { AnchorHTMLAttributes } from 'react';

export type BreadcrumbItemProps = {
  /**
   * isCurrent flag
   */
  isCurrent?: boolean;
  /**
   * isDisabled flag
   */
  isDisabled?: boolean;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & AnchorHTMLAttributes<Element>;
