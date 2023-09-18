'use client';

import { AddIcon, RemoveIcon } from '@westpac/ui/icon';
import { AnimatePresence, LazyMotion, m } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { formatComponentSlug } from '@/utils/format';

import { itemStyles } from './navigation.styles';

const loadAnimations = () => import('./navigation.utils.ts').then(res => res.default);

export function Navigation({ items, brand }) {
  const path = usePathname();
  const currPath = path.split('/');
  return (
    <ul className="typography-body-10 text-text">
      <Item label="Home" level={0} path="" currPath={currPath} brand={brand} />
      <List items={items} currPath={currPath} brand={brand} />
    </ul>
  );
}

function List({ items, level = 0, currPath, brand }) {
  return items.map(item => {
    if (item.children) {
      return (
        <Group key={item.label} label={item.label} level={level} currPath={currPath}>
          <List items={item.children} level={level + 1} currPath={currPath} brand={brand} />
        </Group>
      );
    } else {
      return (
        <Item key={item.label} label={item.label} path={item.path} level={level} currPath={currPath} brand={brand} />
      );
    }
  });
}

function Group({ label, level, currPath, children, ...props }) {
  const [open, setOpen] = useState(currPath.includes(label));
  return (
    <li {...props}>
      <button
        className={itemStyles({ level, type: 'button', nested: level > 0 })}
        onClick={() => setOpen(open => !open)}
      >
        <span>{formatComponentSlug(label)}</span>
        {open ? <RemoveIcon size="small" color="muted" /> : <AddIcon size="small" color="muted" />}
      </button>
      <LazyMotion features={loadAnimations}>
        <AnimatePresence initial={false}>
          {open && (
            <m.div
              initial={{
                height: 0,
                opacity: 0,
              }}
              animate={{
                height: 'auto',
                opacity: 1,
              }}
              exit={{
                height: 0,
                opacity: 0,
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

function Item({ label, path, level, currPath, brand, ...props }) {
  const href = `/design-system/${path}?brand=${brand}`;
  const active = currPath[currPath.length - 1] === label;
  return (
    <li {...props}>
      <Link href={href} className={itemStyles({ level, type: 'link', nested: level > 0, active })}>
        {formatComponentSlug(label)}
      </Link>
    </li>
  );
}
