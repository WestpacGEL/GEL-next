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
   * boundaryCount
   * @default 1
   */
  boundaryCount?: number;
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
   * siblingCount
   * @default 1
   */
  siblingCount?: number;
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
