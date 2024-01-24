'use client';

import { List, ListItem } from '@westpac/ui';
import { MouseEventHandler, useCallback } from 'react';

import { ArrowDownRightIcon } from '@/components/icons';

import { type TableOfContentsProps } from './table-of-contents.types';

export function TableOfContents({ contents = [] }: TableOfContentsProps) {
  return (
    <nav>
      <h2 className="typography-body-9 border-b border-border pb-2 font-medium">Page content</h2>
      <List icon={ArrowDownRightIcon} type="icon" look="primary" className="mt-3 [&_li]:my-[0.5625rem]">
        {contents.map(({ title }) => {
          const id = title
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .toLowerCase()
            .split(' ')
            .join('-');
          return (
            <ListItem key={id} className="pl-[1.075rem]">
              <Link href={`#${id}`}>{title}</Link>
            </ListItem>
          );
        })}
      </List>
    </nav>
  );
}

const HEADER_HEIGHT = {
  sm: 150,
  lg: 200,
};

const BREAKPOINT_MD = 768;

function Link({ href, children }: { children?: React.ReactNode; href?: string }) {
  const handleClick: MouseEventHandler<HTMLAnchorElement> = useCallback(
    ev => {
      ev.preventDefault();
      const viewport = window.innerWidth < BREAKPOINT_MD ? 'sm' : 'lg';
      const bodyRect = document.body.getBoundingClientRect(),
        elemRect = document?.querySelector(href || '')?.getBoundingClientRect(),
        offset = (elemRect?.top || 0) - bodyRect.top - HEADER_HEIGHT[viewport];

      window?.scrollTo({ top: offset, behavior: 'smooth' });
    },
    [href],
  );

  return (
    <a href={href} className="ml-1 block hover:underline focus-visible:focus-outline" onClick={handleClick}>
      {children}
    </a>
  );
}
