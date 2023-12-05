'use client';

import { HamburgerMenuIcon } from '@westpac/ui/icon';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { BrandKey } from '@/app/types/brand.types';

import { useSidebar } from '../../../components/sidebar/sidebar.context';

import { styles as headerStyles } from './header.styles';

const FIXED_HEADER = 162; // 228 - 66 = height to stick

export function Header({ className, title }: { className?: string; title?: string }) {
  const [fixed, setFixed] = useState(false);
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand')?.toLowerCase();
  const styles = headerStyles({ brand: brand as BrandKey, fixed, className });
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
      <button className={styles.hamburgerButton()} onClick={() => setOpen(open => !open)}>
        <HamburgerMenuIcon color="white" className="mx-auto" />
      </button>

      <div className={styles.gridButtonWrapper()}>
        <span className="hidden font-bold sm:block md:hidden">SM</span>
        <span className="hidden font-bold md:block lg:hidden">MD</span>
        <span className="hidden font-bold lg:block">LG</span>
        <button
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

      <h2 className={styles.title()}>{title}</h2>
    </header>
  );
}
