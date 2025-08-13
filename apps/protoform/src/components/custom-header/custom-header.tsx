'use client';

import { Button, Header } from '@westpac/ui';
import { BREAKPOINTS } from '@westpac/ui/themes-constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useSidebar } from '../sidebar/context';

export function CustomHeader() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const { sidebarScrolled } = useSidebar();

  const updateSize = () => {
    setIsMobile(window.innerWidth < parseInt(BREAKPOINTS.md));
  };

  useEffect(() => {
    setIsMobile(window.innerWidth < parseInt(BREAKPOINTS.md));
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Header
      brand="wbc"
      leftIcon={'arrow'}
      leftOnClick={() => router.back()}
      logoLink="/"
      fixed={!isMobile}
      isScrolled={sidebarScrolled}
      className={'z-[100] m-auto w-full max-w-[1921px]'}
    >
      <Button look="faint" size={{ initial: 'small', sm: 'medium' }} soft>
        Sign Out
      </Button>
    </Header>
  );
}
