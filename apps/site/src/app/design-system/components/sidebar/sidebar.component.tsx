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
          'bg-background-white-pale text-text-body lg:border-r-border-muted-soft fixed top-0 z-[1010] flex h-full w-[18.75rem] grow-0 flex-col overflow-x-hidden border-r-0 transition-transform ease-in-out lg:bottom-0 lg:h-auto lg:translate-x-0 lg:border-r',
          {
            '-translate-x-full': !open, //hide sidebar to the left when closed
          },
        )}
        ref={outsideRef}
      >
        {/* Below div required to hide so the transform still happens while still hiding the sidebar below large, otherwise users could tab into it when closed */}
        <div
          className={clsx('flex flex-col overflow-hidden', {
            'max-lg:hidden': !open,
          })}
        >
          <div
            className={clsx(
              'bg-background-white-pale sticky flex-0 transition-shadow delay-0 duration-200 ease-[ease]',
              {
                'shadow-[0_2px_5px_rgba(0,0,0,0.3)]': scrolled,
              },
            )}
          >
            <button
              className="outline-focus absolute top-1 right-1 block size-6 p-1 lg:hidden"
              onClick={() => setOpen(false)}
              ref={focusRef}
            >
              <CloseIcon className="text-text-muted block" />
            </button>
            <Link
              href="/"
              className="focus-visible:focus-outline flex h-15 items-center px-3 !outline-offset-[-2px]"
              aria-label="GEL home"
            >
              <Logo brand={brand} />
            </Link>
            <div
              className={clsx('border-b', {
                'border-b-border-mono': scrolled,
                'border-b-border-muted-soft': !scrolled,
              })}
            >
              <SidebarSelect value={brand} onChange={handleChange} aria-label="Change brand">
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
          <nav ref={listRef} className="flex-1 overflow-x-hidden overflow-y-auto pb-4 transition-all">
            <Link
              href="/"
              className="focus-visible:focus-outline block !outline-offset-[-2px]"
              aria-label="Back to GEL"
            >
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
