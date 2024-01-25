'use client';

import { HamburgerMenuIcon } from '@westpac/ui/icon';
import React, { useEffect, useRef, useState } from 'react';

import { useSidebar } from '@/app/design-system/components/sidebar/sidebar.context';
import { BrandKey } from '@/app/types/brand.types';

import { styles as headerStyles } from './header.styles';

const FIXED_HEADER = 162; // 228 - 66 = height to stick

export function Header({ className, title, brand }: { brand: string; className?: string; title?: string }) {
  const [fixed, setFixed] = useState(typeof window !== 'undefined' ? window.scrollY >= FIXED_HEADER : false);
  const styles = headerStyles({ brand: brand.toLowerCase() as BrandKey, fixed, className });
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { setOpen } = useSidebar();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const isFixed = window.scrollY >= FIXED_HEADER;
        setFixed(isFixed);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header className={styles.base()}>
      <div className={styles.gridButtonWrapper()}>
        <span className="sr-only">Active breakpoint:</span>
        <span className="hidden font-bold sm:block md:hidden">SM</span>
        <span className="hidden font-bold md:block lg:hidden">MD</span>
        <span className="hidden font-bold lg:block">LG</span>
        <button
          aria-hidden="true"
          className={styles.gridButton()}
          onClick={() => {
            return;
          }}
        >
          {new Array(4).fill(null).map((_, index) => {
            return <span className="w-[0.25rem] items-stretch bg-white/30" key={index} />;
          })}
        </button>
      </div>
      {/* The tab order on the original site was the grid button before wrapper when coming from the browser bar */}
      <button className={styles.hamburgerButton()} onClick={() => setOpen(open => !open)}>
        <HamburgerMenuIcon color="white" className="mx-auto" />
      </button>

      <h2 className={styles.title()} ref={headerRef} id="header" aria-hidden tabIndex={-1}>
        {title}
      </h2>
    </header>
  );
}
