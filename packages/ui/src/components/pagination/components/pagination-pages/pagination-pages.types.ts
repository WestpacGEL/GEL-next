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
  pages: PageProps[];
};

export type PaginationAsButtonProps = {
  /**
   * on page change
   */
  onChange: (page: number) => unknown;
  /**
   * Pages items
   */
  pages: Omit<PageProps, 'href'>[];
};

export type PaginationPageProps = PaginationBase &
  (PaginationAsLinkProps | PaginationAsButtonProps) &
  Omit<HTMLAttributes<Element>, 'onChange'>;

export type PageToRender =
  | {
      href: string;
      page: number;
      text: React.ReactNode;
    }
  | {
      page: number;
      text: React.ReactNode;
    }
  | null;
