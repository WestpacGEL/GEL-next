'use client';

import { Button, Header } from '@westpac/ui';
import { BREAKPOINTS } from '@westpac/ui/themes-constants';
import clsx from 'clsx';
import throttle from 'lodash.throttle';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSidebar } from '../sidebar/context';

export function CustomHeader() {
  const router = useRouter();
  const [, setIsMobile] = useState(true);
  const { open } = useSidebar();
  const [scrolled, setScrolled] = useState(false);

  const updateSize = () => {
    setIsMobile(window.innerWidth < parseInt(BREAKPOINTS.md));
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < parseInt(BREAKPOINTS.md));
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleScroll = throttle(() => {
    let hasScrolled = false;
    if (window.scrollY > 5) {
      hasScrolled = true;
    }
    setScrolled(hasScrolled);
  }, 10);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <Header
      brand="wbc"
      leftIcon={'arrow'}
      leftOnClick={() => router.back()}
      logoLink="/"
      className={clsx(
        'z-[100] m-auto w-full max-w-[1921px] before:pointer-events-none before:absolute before:inset-x-auto before:top-[66px] before:z-10 before:h-1 before:bg-gradient-to-b before:from-black/[.2] before:from-0% before:opacity-0 before:transition-opacity before:duration-200 before:will-change-[opacity] md:fixed md:top-0',
        {
          'before:right-[302px]': open,
          'md:before:opacity-100': scrolled,
          'before:left-0 ': scrolled && open,
        },
      )}
    >
      <Button look="faint" size={{ initial: 'small', sm: 'medium' }} soft>
        Sign Out
      </Button>
    </Header>
  );
}
