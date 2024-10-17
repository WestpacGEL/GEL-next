'use client';
import { List, ListItem } from '@westpac/ui';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { MouseEventHandler, useCallback, useEffect, useState } from 'react';

import { ArrowDownRightIcon } from '@/components/icons';

import { type TableOfContentsProps } from './table-of-contents.types';

export function TableOfContents({ contents = [] }: TableOfContentsProps) {
  return (
    <nav>
      <h2 className="typography-body-9 border-b border-border pb-2 font-medium">Page content</h2>
      <List icon={ArrowDownRightIcon} type="icon" look="primary" className="mt-3 [&_li]:my-1.5">
        {contents.map(({ title }) => {
          const id = title
            .replace(/[^a-zA-Z0-9\s]/g, '')
            .toLowerCase()
            .split(' ')
            .join('-');
          return (
            <ListItem key={id} className="pl-[1.075rem]">
              <NavLink href={`#${id}`}>{title}</NavLink>
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

function NavLink({ href, children }: { children?: React.ReactNode; href: string }) {
  const [path, hash] = href.split('#');
  const DELAY_TIME_TO_SCROLL = 100;

  const handleClick: MouseEventHandler<HTMLAnchorElement> = () => {
    setTimeout(() => {
      const viewport = window.innerWidth < BREAKPOINT_MD ? 'sm' : 'lg';
      const bodyRect = document.body.getBoundingClientRect();
      const elemRect = document?.querySelector(`#${hash}`)?.getBoundingClientRect();
      const offset = (elemRect?.top || 0) - bodyRect.top - HEADER_HEIGHT[viewport];

      window?.scrollTo({ top: offset, behavior: 'smooth' });
      window.history.pushState(null, '', `#${hash}`);
    }, DELAY_TIME_TO_SCROLL);
  };

  return (
    <Link className="ml-1 block hover:underline focus-visible:focus-outline" href={path} onClick={handleClick}>
      {children}
    </Link>
  );
}
