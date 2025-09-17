'use client';

import { Button, Header } from '@westpac/ui';
import { BREAKPOINTS } from '@westpac/ui/themes-constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function CustomHeader({ isSidebarScrolled }: { isSidebarScrolled?: boolean }) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);

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
      logoLink="/"
      fixed={!isMobile}
      isScrolled={isSidebarScrolled}
      fixedMaxWidth="1921px"
      className={'z-[100] m-auto w-full'}
    />
  );
}
