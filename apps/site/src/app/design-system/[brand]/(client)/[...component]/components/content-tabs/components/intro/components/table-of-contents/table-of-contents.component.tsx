'use client';
import { List, ListItem } from '@westpac/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

import { ArrowDownRightIcon } from '@/components/icons';

import { type TableOfContentsProps } from './table-of-contents.types';

export function TableOfContents({ contents = [] }: TableOfContentsProps) {
  return (
    <nav>
      <h2 className="typography-body-9 border-border-muted-soft border-b pb-2 font-medium">Page content</h2>
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

function NavLink({ href, children }: { children?: ReactNode; href: string }) {
  const pathname = usePathname();

  return (
    <Link className="focus-visible:focus-outline ml-1 block hover:underline" href={`${pathname}${href}`} replace scroll>
      {children}
    </Link>
  );
}
