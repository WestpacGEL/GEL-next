import { RAMSLogoIcon, WBCLogoIcon, WBGLogoIcon } from '@westpac/ui/icon';
import { clsx } from 'clsx';
import { useRouter } from 'next/router';
import React, { Key, useCallback, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { List } from '../list';
import { Logo } from '../logo';
import { SidebarSelect } from '../sidebar-select';

const BANK_OPTIONS = [
  {
    key: 'wbc',
    label: 'Westpac',
    icon: <WBCLogoIcon className="h-3 w-7" />,
  },
  {
    key: 'stg',
    label: 'St. George',
    icon: <WBCLogoIcon className="h-3 w-7" />,
  },
  {
    key: 'bom',
    label: 'Bank of Melbourne',
    icon: <WBCLogoIcon className="h-3 w-7" />,
  },
  {
    key: 'bsa',
    label: 'Bank of SA',
    icon: <WBCLogoIcon className="h-3 w-7" />,
  },
  {
    key: 'wbg',
    label: 'Westpac Group',
    icon: <WBGLogoIcon className="h-3 w-7" />,
  },
  {
    key: 'rams',
    label: 'RAMS',
    icon: <RAMSLogoIcon className="h-3 w-7" />,
  },
];

// Credits: https://github.com/jmarioste/next-responsive-sidebar-tailwind

// define a NavItem prop
export type NavItem = {
  children?: NavItem[];
  href?: string;
  icon?: React.ReactNode;
  label: string;
};
// add NavItem prop to component prop
type SidebarProps = {
  brand: string;
  navItems: NavItem[];
  open: boolean;
  setOpen(open: boolean): void;
};
export function Sidebar({ open, navItems, setOpen, brand }: SidebarProps) {
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const router = useRouter();
  const handleChange = useCallback(
    async (key: Key) => {
      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          brand: key,
        },
      });
    },
    [router],
  );

  return (
    <div
      className={clsx(
        'fixed top-0 z-[60] flex h-full w-[250px] grow-0 flex-col border-r-0 bg-white text-text shadow-2xl transition-transform ease-in-out md:bottom-0 md:h-auto md:-translate-x-0 md:border-r md:border-r-border md:shadow-none',
        {
          '-translate-x-full': !open, //hide sidebar to the left when closed
        },
      )}
      ref={ref}
    >
      <div className="p-3">
        <Logo brand={brand} className="h-6 w-2/3" />
      </div>
      <div className="border-b border-b-border">
        <SidebarSelect selectedKey={brand} onSelectionChange={handleChange}>
          {BANK_OPTIONS.map(({ icon, key, label }) => (
            <SidebarSelect.Option key={key} textValue={label}>
              <div className="flex w-full items-center justify-between">
                <span className="typography-body-10">{label}</span>
                {icon}
              </div>
            </SidebarSelect.Option>
          ))}
        </SidebarSelect>
      </div>
      <nav className="flex-1 overflow-auto">
        <List items={navItems} brand={brand} />
      </nav>
    </div>
  );
}
