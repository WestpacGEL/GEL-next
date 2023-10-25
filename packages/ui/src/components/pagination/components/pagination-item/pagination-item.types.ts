import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactElement } from 'react';
import { VariantProps } from 'tailwind-variants';

import { styles } from './pagination-item.styles.js';

type Variants = VariantProps<typeof styles>;

export type PaginationItemProps = {
  /**
   * Whether item is active
   */
  active?: Variants['active'];
  /**
   * Whether item is disabled
   */
  disabled?: Variants['disabled'];
  /**
   * Whether it is the first item
   */
  firstItem?: Variants['firstItem'];
  /**
   * Whether it is the last item
   */
  lastItem?: Variants['lastItem'];
  /**
   * Link component to render
   */
  tag?: 'a' | 'button' | ((...args: any[]) => ReactElement | null);
} & (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>);
