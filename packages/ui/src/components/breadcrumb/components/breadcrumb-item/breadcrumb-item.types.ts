import { AnchorHTMLAttributes } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './breadcrumb-item.styles.js';

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
} & VariantProps<typeof styles> &
  AnchorHTMLAttributes<Element>;
