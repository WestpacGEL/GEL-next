import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactElement } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './pagination-item.styles.js';

export type PaginationItemProps = {
  /**
   * Link component to render
   */
  tag?: 'a' | 'button' | ((...args: any[]) => ReactElement | null);
} & VariantProps<typeof styles> &
  (AnchorHTMLAttributes<HTMLAnchorElement> | ButtonHTMLAttributes<HTMLButtonElement>);
