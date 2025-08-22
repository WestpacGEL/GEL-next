import { HTMLAttributes, ReactNode } from 'react';

import { PaginationBase } from '../../pagination.types.js';

export type PageProps = {
  href: string;
  text: ReactNode;
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

export type PaginationTotalPagesProps = {
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
