import { AnchorHTMLAttributes, ReactNode } from 'react';

export type BreadcrumbItemProps = {
  /**
   * BreadCrumbItem body content
   */
  children?: ReactNode;
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
