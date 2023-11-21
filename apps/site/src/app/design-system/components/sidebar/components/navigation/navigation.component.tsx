'use client';

import { AddIcon, RemoveIcon } from '@westpac/ui/icon';
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { formatComponentSlug } from '@/utils/format';

import { itemStyles } from './navigation.styles';
import { GroupProps, ItemProps, Level, ListProps, NavigationProps } from './navigation.types';

const loadAnimations = () => import('./navigation.utils').then(res => res.default);

export function Navigation({ items, brand }: NavigationProps) {
  const path = usePathname();
  const crumbs = path.split('/');
  return (
    <ul className="typography-body-10 text-text">
      <Item label="Home" level={0} path="" crumbs={crumbs} brand={brand} />
      <List items={items} crumbs={crumbs} brand={brand} />
    </ul>
  );
}

function List({ items, level = 0, crumbs, brand }: ListProps) {
  return items.map(item => {
    if (item.children) {
      return (
        <Group key={item.label} label={item.label} level={level} crumbs={crumbs}>
          <List items={item.children} level={level + 1} crumbs={crumbs} brand={brand} />
        </Group>
      );
    } else {
      return <Item key={item.label} label={item.label} path={item.path} level={level} crumbs={crumbs} brand={brand} />;
    }
  });
}

function Group({ label, level, crumbs, children, ...props }: GroupProps) {
  const [open, setOpen] = useState<boolean>(crumbs.includes(label));
  return (
    <li {...props}>
      <button
        className={itemStyles({ level: level.toString() as Level, type: 'button', nested: level > 0 })}
        onClick={() => setOpen(open => !open)}
      >
        <span>{formatComponentSlug(label)}</span>
        {open ? <RemoveIcon size="small" color="muted" /> : <AddIcon size="small" color="muted" />}
      </button>
      <LazyMotion features={loadAnimations}>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              className="overflow-hidden"
              initial={{
                height: 0,
                opacity: 1,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <ul>{children}</ul>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </li>
  );
}

function Item({ label, path, level, crumbs, brand, ...props }: ItemProps) {
  const href = `/design-system/${path}?brand=${brand}`;
  const page = path?.split('/').pop();
  const active = crumbs[crumbs.length - 1] === page;
  return (
    <li {...props}>
      <Link
        href={href}
        className={itemStyles({ level: level.toString() as Level, type: 'link', nested: level > 0, active })}
      >
        {formatComponentSlug(label)}
      </Link>
    </li>
  );
}
