'use client';

import { BOMShieldLogo, BSAStackedLogo, RAMSLogo, STGDragonLogo, WBCLogo, WBGLogo } from '@westpac/ui/symbol';
import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Key, useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { BrandKey } from '@/app/types/brand.types';

import { BackToGelSvg, Logo, Navigation, SidebarSelect } from './components';
import { useSidebar } from './sidebar.context';
import { SidebarProps } from './sidebar.types';

const BANK_OPTIONS = [
  {
    key: 'wbc',
    label: 'Westpac',
    icon: <WBCLogo className="h-3 w-[2.75rem]" />,
  },
  {
    key: 'stg',
    label: 'St. George',
    icon: <STGDragonLogo className="-mr-2 h-[2.375rem] w-9" />,
  },
  {
    key: 'bom',
    label: 'Bank of Melbourne',
    icon: <BOMShieldLogo className="mr-[0.5625rem] h-[2.4375rem] w-[1.625rem]" />,
  },
  {
    key: 'bsa',
    label: 'Bank of SA',
    icon: <BSAStackedLogo className="mr-[0.5rem] h-[2.875rem] w-[1.6875rem]" />,
  },
  {
    key: 'wbg',
    label: 'Westpac Group',
    icon: <WBGLogo className="mr-[-0.5rem] h-[0.5625rem] w-[4.375rem]" />,
  },
  {
    key: 'rams',
    label: 'RAMS',
    icon: <RAMSLogo className="mr-[-0.5rem] h-6 w-[4.375rem]" />,
  },
];

// Credits: https://github.com/jmarioste/next-responsive-sidebar-tailwind

export function Sidebar({ items }: SidebarProps) {
  const { open, setOpen } = useSidebar();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const outsideRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(outsideRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    const listener = () => {
      const y = listRef.current?.scrollTop || 0;
      setScrolled(y > 0);
    };
    listRef.current.addEventListener('scroll', listener);
    return () => {
      listRef.current?.removeEventListener('scroll', listener);
    };
  }, [listRef]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = (searchParams.get('brand')?.toLowerCase() ?? 'wbc') as BrandKey;

  const handleChange = useCallback(
    async (key: Key) => {
      router.push(`${pathname}?brand=${key}`);
    },
    [router, pathname],
  );

  return (
    <div
      className={clsx(
        'fixed top-0 z-[60] flex h-full w-[18.75rem] grow-0 flex-col border-r-0 bg-white text-text shadow-2xl transition-transform ease-in-out lg:bottom-0 lg:h-auto lg:-translate-x-0 lg:border-r lg:border-r-border lg:shadow-none',
        {
          '-translate-x-full': !open, //hide sidebar to the left when closed
        },
      )}
      ref={outsideRef}
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
      <nav
        ref={listRef}
        className={clsx('flex-1 overflow-y-auto overflow-x-hidden pb-4 transition-all', {
          'shadow-[inset_rgba(0,0,0,0.26)_0_2px_5px]': scrolled,
        })}
      >
        <Link href="/" className="block" aria-label="Back to GEL">
          <BackToGelSvg />
        </Link>
        <Navigation items={items} brand={brand} />
      </nav>
    </div>
  );
}
