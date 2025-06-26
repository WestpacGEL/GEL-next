import { HTMLAttributes, ReactNode } from 'react';

import { type PaginationItemProps } from './components/index.js';

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

export type PaginationHookProps = {
  defaultCurrent?: number;
  infinite?: boolean;
  pages: (Omit<PageProps, 'href'> & { href?: string })[];
};

export type PaginationProps = {
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
} & (PaginationAsLinkProps | PaginationAsButtonProps) &
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
