import { HTMLAttributes } from 'react';

import { type PaginationItemProps } from '../../components/index.js';
import { PaginationBase } from '../../pagination.types.js';

export type PageToRender =
  | {
      'aria-label'?: string;
      href: string;
      page: number;
      text: React.ReactNode;
    }
  | {
      'aria-label'?: string;
      page: number;
      text: React.ReactNode;
    }
  | null;

export type PaginationPresentationalProps = PaginationBase & {
  /**
   * on page change
   */
  onChange?: (page: number) => unknown;
  /**
   * Pages to render where the null value is rendered as [...]
   */
  pagesToRender: PageToRender[];
  /**
   * Props to back button
   */

  paginationBackProps?: PaginationItemProps;
  /**
   * Props to back button
   */
  paginationNextProps?: PaginationItemProps;
  /**
   * siblingCount
   * @default 1
   */
  siblingCount?: number;
  /**
   * Tag to render
   * @default nav
   */
  tag?: keyof JSX.IntrinsicElements;
} & Omit<HTMLAttributes<Element>, 'onChange'>;
