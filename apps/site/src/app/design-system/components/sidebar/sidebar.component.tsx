'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { Key, useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { BrandKey } from '@/app/types/brand.types';
import { CloseIcon } from '@/components/code/code.inject-components';
import { BANK_OPTIONS } from '@/constants/bank-options';

import { BackToGelSvg, Logo, Navigation, SidebarSelect } from './components';
import { useSidebar } from './sidebar.context';
import { SidebarProps } from './sidebar.types';

// Credits: https://github.com/jmarioste/next-responsive-sidebar-tailwind

export function Sidebar({ items }: SidebarProps) {
  const { open, setOpen } = useSidebar();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const outsideRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLButtonElement>(null);

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

  useEffect(() => {
    if (open) {
      focusRef.current?.focus();
    }
  }, [open]);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const brand = (searchParams.get('brand')?.toLowerCase() ?? 'wbc') as BrandKey;

  const handleChange = useCallback(
    async (key: Key) => {
      router.push(`${pathname}?brand=${key}`, { scroll: false });
    },
    [router, pathname],
  );

  return (
    <>
      <div
        className={clsx(
          'fixed top-0 z-[60] flex h-full w-[18.75rem] grow-0 flex-col overflow-x-hidden border-r-0 bg-white text-text transition-transform ease-in-out lg:bottom-0 lg:h-auto lg:translate-x-0 lg:border-r lg:border-r-border',
          {
            '-translate-x-full': !open, //hide sidebar to the left when closed
          },
        )}
        ref={outsideRef}
      >
        {/* Below div required to hide so the transform still happens while still hiding the sidebar below large, otherwise users could tab into it when closed */}
        <div
          className={clsx({
            'max-lg:hidden': !open,
          })}
        >
          <div
            className={clsx({
              'shadow-[rgba(0,0,0,0.26)_0_2px_5px]': scrolled,
            })}
          >
            <button
              className="absolute right-1 top-1 block h-6 w-6 p-1 outline-focus lg:hidden"
              onClick={() => setOpen(false)}
              ref={focusRef}
            >
              <CloseIcon className="block text-muted" />
            </button>
            <Link
              href="/"
              className="flex h-15 items-center px-3 outline-offset-[-1px] outline-focus"
              aria-label="GEL home"
            >
              <Logo brand={brand} />
            </Link>
            <div className="border-b border-b-border">
              <SidebarSelect selectedKey={brand} onSelectionChange={handleChange} aria-label="Change brand">
                {BANK_OPTIONS.map(({ icon: Icon, designSystemPageClasses, key, label }) => (
                  <SidebarSelect.Option key={key} textValue={label}>
                    <div className="flex w-full items-center justify-between">
                      <span className="typography-body-10">{label}</span>
                      {<Icon className={designSystemPageClasses} />}
                    </div>
                  </SidebarSelect.Option>
                ))}
              </SidebarSelect>
            </div>
          </div>
          <nav ref={listRef} className="flex-1 overflow-y-auto overflow-x-hidden pb-4 transition-all">
            <Link href="/" className="block outline-offset-[-1px] outline-focus" aria-label="Back to GEL">
              <BackToGelSvg />
            </Link>
            <Navigation items={items} brand={brand} />
          </nav>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={clsx({
          'max-lg:before:bg-black/40 z-[59] before:top-0 before:left-0 before:right-0 before:bottom-0 before:fixed':
            open,
        })}
      />
    </>
  );
}
