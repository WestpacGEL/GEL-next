import { Breakpoint } from '@westpac/style-config/constants';
import { HTMLAttributes, ReactNode } from 'react';

import { PaginationItemProps } from './components/index.js';

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

export type PaginationAsLinkProps = {
  /**
   * on page change
   */
  onChange?: never;
  /**
   * Pages items
   */
  onPageItemProps?: (page: number) => Omit<PageToRenderHref, 'page'>;
};

export type PaginationAsButtonProps = {
  /**
   * on page change
   */
  onChange: (page: number) => unknown;
  /**
   * Pages items
   */
  onPageItemProps?: (page: number) => Omit<PageToRenderBase, 'page'>;
};

export type PaginationProps = {
  /**
   * total of pages
   */
  totalPages: number;
} & PaginationBase &
  (PaginationAsLinkProps | PaginationAsButtonProps) &
  Omit<HTMLAttributes<Element>, 'onChange'>;

export type PageToRenderBase = {
  'aria-label'?: string;
  page: number;
  text: React.ReactNode;
};
export type PageToRenderHref = PageToRenderBase & {
  href: string;
};

// Hooks props

export type PaginationHookProps = {
  defaultCurrent?: number;
  infinite?: boolean;
  totalPages: number;
};
