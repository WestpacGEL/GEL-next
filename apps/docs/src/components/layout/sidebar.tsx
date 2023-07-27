import { Select } from '@westpac/ui';
import { clsx } from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useCallback, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { DEFAULT_NAV_ITEMS } from './navItems';

// Credits: https://github.com/jmarioste/next-responsive-sidebar-tailwind

// define a NavItem prop
export type NavItem = {
  href: string;
  icon?: React.ReactNode;
  label: string;
};
// add NavItem prop to component prop
type SidebarProps = {
  brand: string;
  navItems?: NavItem[];
  open: boolean;
  setOpen(open: boolean): void;
};
export function Sidebar({ open, navItems = DEFAULT_NAV_ITEMS, setOpen, brand }: SidebarProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const router = useRouter();
  const handleChange = useCallback(
    async (ev: ChangeEvent<HTMLSelectElement>) => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          brand: ev.target.value,
        },
      });
    },
    [router],
  );

  return (
    <div
      className={clsx({
        'flex flex-col justify-between': true, // layout
        'bg-white text-text border-r-none md:border-r md:border-r-border': true, // colors
        'md:top-16 md:bottom-0 top-0 z-20 fixed': true, // positioning
        'w-[250px] grow-0 h-full md:h-auto': true, // for height and width
        'transition-transform .3s ease-in-out md:-translate-x-0': true, //animations
        '-translate-x-full': !open, //hide sidebar to the left when closed
        'shadow-2xl md:shadow-none': true, //shadow
      })}
      ref={ref}
    >
      <nav>
        {/* nav items */}
        <ul className="flex flex-col gap-0 divide-y divide-border py-2">
          {navItems.map((item, index) => {
            return (
              <li key={index}>
                <Link
                  href={brand ? `${item.href}?brand=${brand}` : item.href}
                  className={clsx({
                    'text-link focus:outline-focus': true, //colors
                    'flex gap-4 items-center ': true, //layout
                    'transition-colors duration-300': true, //animation
                    'rounded-md p-2': true, //self style
                  })}
                >
                  {!!item.icon && item.icon} {item.label}{' '}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="border-t border-t-border p-4">
        <label className="my-0">
          Change brand
          <Select onChange={handleChange} value={brand} className="block w-full">
            <option value="wbc">Westpac</option>
            <option value="stg">St. George</option>
            <option value="bom">Bank of Melbourne</option>
            <option value="bsa">Bank of SA</option>
            <option value="wbg">Westpac Group</option>
            <option value="rams">RAMS</option>
          </Select>
        </label>
      </div>
    </div>
  );
}
