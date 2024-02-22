'use client';

import { Button, Header } from '@westpac/ui';
import { BREAKPOINTS } from '@westpac/ui/themes-constants';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function CustomHeader() {
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
      leftIcon={isMobile ? 'arrow' : undefined}
      leftOnClick={() => router.back()}
      logoLink="/"
      className="z-[100] m-auto max-w-[1922px] md:sticky md:top-0"
    >
      <Button look="faint" size={{ initial: 'small', sm: 'medium' }} soft>
        Sign Out
      </Button>
    </Header>
  );
}
