// disabling for deprecated react aria stuff that will be/is fixed in 1.0
/* eslint-disable sonarjs/deprecation */
'use client';

import { clsx } from 'clsx';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

import { CloseIcon } from '@/components/code/code.inject-components';
import { BANK_OPTIONS } from '@/constants/bank-options';

import { BackToGelSvg, Logo, Navigation, SidebarSelect } from './components';
import { useSidebar } from './sidebar.context';
import { SidebarProps } from './sidebar.types';

// Credits: https://github.com/jmarioste/next-responsive-sidebar-tailwind

export function Sidebar({ items, brand }: SidebarProps) {
  const { open, setOpen } = useSidebar();
  const [scrolled, setScrolled] = useState<boolean>(false);

  const outsideRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLButtonElement>(null);

  useOnClickOutside(outsideRef, () => {
    setOpen(false);
  });

  useEffect(() => {
    if (!outsideRef.current) {
      return;
    }
    const listener = () => {
      const y = outsideRef.current?.scrollTop || 0;
      setScrolled(y > 0);
    };
    outsideRef.current.addEventListener('scroll', listener);
    return () => {
      outsideRef.current?.removeEventListener('scroll', listener);
    };
  }, []);

  useEffect(() => {
    if (open) {
      focusRef.current?.focus();
    }
  }, [open]);

  const router = useRouter();
  const params = useParams();

  const handleChange = useCallback(
    (key: string | number | null) => {
      if (params.component) {
        const componentPath = Array.isArray(params.component) ? params.component.join('/') : params.component;
        router.push(`/design-system/${key}/${componentPath}`, { scroll: false });
      } else {
        // on home page
        router.push(`/design-system/${key}`, { scroll: false });
      }
    },
    [router, params],
  );

  return (
    <>
      <div
        className={clsx(
          'fixed top-0 z-[1010] flex h-full w-[18.75rem] grow-0 flex-col overflow-x-hidden border-r-0 bg-white text-text transition-transform ease-in-out lg:bottom-0 lg:h-auto lg:translate-x-0 lg:border-r lg:border-r-border',
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
            className={clsx('sticky top-0 bg-white transition-shadow delay-0 duration-200 ease-[ease]', {
              'shadow-[0_2px_5px_rgba(0,0,0,0.3)]': scrolled,
            })}
          >
            <button
              className="absolute right-1 top-1 block size-6 p-1 outline-focus lg:hidden"
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
          'max-lg:before:bg-black/40 z-[1009] before:top-0 before:left-0 before:right-0 before:bottom-0 before:fixed':
            open,
        })}
      />
    </>
  );
}
