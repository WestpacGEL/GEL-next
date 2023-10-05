'use client';

import { HamburgerMenuIcon } from '@westpac/ui/icon';
import { useParams, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

import { BrandKey } from '@/app/types/brand.types';
import { formatComponentSlug } from '@/utils/format';

import { useSidebar } from '../../../components/sidebar/sidebar.context';

import { styles as headerStyles } from './header.styles';

const FIXED_HEADER = 162; // 228 - 66 = height to stick

export function Header({ className }: { className?: string }) {
  const [fixed, setFixed] = useState(false);
  const searchParams = useSearchParams();
  const brand = searchParams.get('brand')?.toLowerCase();
  const params = useParams();
  const component = formatComponentSlug(params?.component.at(-1) ?? '');
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
      <h2 className={styles.title()}>{component}</h2>
    </header>
  );
}
