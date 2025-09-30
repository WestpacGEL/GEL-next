import { Breakpoint } from '@westpac/style-config/constants';
import { ReactNode } from 'react';

import { PaginationItemProps } from './components/index.js';
import { PaginationPageProps } from './components/pagination-pages/pagination-pages.types.js';
import { PaginationTotalPagesProps } from './components/pagination-total-pages/pagination-total-pages.types.js';

export type PageProps = {
  href: string;
  text: ReactNode;
};

export type PaginationBase = {
  /**
   * Back aria label
   * @default Back
   */
  backAriaLabel?: string;
  /**
   * Back label
   * @default Back
   */
  backLabel?: ReactNode;
  /**
   * Defines the number of **always-visible page buttons** at the beginning and end of the pagination.
   * @default 1
   */
  boundaryCount?: number | Partial<Record<Breakpoint | 'initial', number>>;
  /**
   * Current page
   */
  current?: number;
  /**
   * Carousel feature
   * @default false
   */
  infinite?: boolean;
  /**
   * Link component to render
   */
  linkComponent?: PaginationItemProps['tag'];
  /**
   * Next aria label
   * @default Next
   */
  nextAriaLabel?: string;
  /**
   * Next label
   * @default Next
   */
  nextLabel?: ReactNode;
  /**
   * Defines the number of page buttons displayed adjacent to the current page.
   * @default 2
   */
  siblingCount?: number | Partial<Record<Breakpoint | 'initial', number>>;
  /**
   * Tag to render
   * @default nav
   */
  tag?: keyof JSX.IntrinsicElements;
};

export type PaginationHookProps = {
  defaultCurrent?: number;
  infinite?: boolean;
  pages: (Omit<PageProps, 'href'> & { href?: string })[];
};

export type PaginationProps = PaginationPageProps | PaginationTotalPagesProps;
