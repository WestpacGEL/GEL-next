'use client';

import { RAMSLogoIcon, WBCLogoIcon, WBGLogoIcon } from '@westpac/ui/icon';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Key, useCallback, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { BackToGelSvg } from './components/back-to-gel-svg';
import { List } from './components/list';
import { Logo } from './components/logo';
import { SidebarSelect } from './components/sidebar-select';
import { useSidebar } from './sidebar.context';

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
};
export function Sidebar({ navItems }: SidebarProps) {
  const { open, setOpen } = useSidebar();

  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand')?.toLowerCase() ?? 'wbc';

  const handleChange = useCallback(
    async (key: Key) => {
      router.push(`${pathname}?brand=${key}`);
    },
    [router, pathname],
  );

  return (
    <div
      className={clsx(
        'fixed top-0 z-[60] flex h-full w-[300px] grow-0 flex-col border-r-0 bg-white text-text shadow-2xl transition-transform ease-in-out lg:bottom-0 lg:h-auto lg:-translate-x-0 lg:border-r lg:border-r-border lg:shadow-none',
        {
          '-translate-x-full': !open, //hide sidebar to the left when closed
        },
      )}
      ref={ref}
    >
      <Link href="/" className="flex h-15 items-center px-3" aria-label="GEL home">
        <Logo brand={brand} />
      </Link>
      <div className="border-b border-b-border">
        <SidebarSelect selectedKey={brand} onSelectionChange={handleChange} aria-label="Change brand">
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
      <nav className="flex-1 overflow-auto pb-4">
        <Link href="/" className="block" aria-label="Back to GEL">
          <BackToGelSvg />
        </Link>
        <List items={navItems} brand={brand} />
      </nav>
    </div>
  );
}
