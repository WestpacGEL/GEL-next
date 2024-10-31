'use client';

import { HamburgerMenuIcon } from '@westpac/ui/icon';
import React, { useEffect, useRef, useState } from 'react';

import { useSidebar } from '@/app/design-system/components/sidebar/sidebar.context';
import { BrandKey } from '@/app/types/brand.types';

import { styles as headerStyles } from './header.styles';

const FIXED_HEADER = 162; // 228 - 66 = height to stick

export function Header({ className, title, brand }: { brand: string; className?: string; title?: string }) {
  const [fixed, setFixed] = useState(false);
  const styles = headerStyles({ brand: brand.toLowerCase() as BrandKey, fixed, className });
  const headerRef = useRef<HTMLHeadingElement>(null);
  const { setOpen } = useSidebar();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = () => {
        const isFixed = window.scrollY >= FIXED_HEADER;
        setFixed(isFixed);
      };
      handleScroll();
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('load', handleScroll);

      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <header className={styles.base()}>
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
