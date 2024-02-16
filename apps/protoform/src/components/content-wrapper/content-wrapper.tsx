'use client';

import { Grid, GridContainer, GridItem } from '@westpac/ui';
import { clsx } from 'clsx';
import throttle from 'lodash.throttle';
import { ReactNode, useEffect, useState } from 'react';

import { useSidebar } from '../sidebar/context';

export function ContentWrapper({ children }: { children: ReactNode }) {
  const { open } = useSidebar();
  const [scrolled, setScrolled] = useState(false);

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
    <section
      className={clsx(
        'min-h-screen after:pointer-events-none after:fixed after:inset-x-0 after:top-[66px] after:z-10 after:block after:h-1 after:bg-gradient-to-b after:from-black/[.2] after:from-0% after:opacity-0 after:transition-all after:duration-200 after:will-change-[opacity] md:mt-11',
        {
          'md:mr-[300px]': open,
          'md:after:opacity-100': scrolled,
          'after:left-0 after:right-[300px]': scrolled && open,
        },
      )}
    >
      <GridContainer>
        <Grid>
          <GridItem span={{ initial: 12, sm: 8, md: 8, lg: 6 }} start={{ initial: 1, sm: 3, md: 3, lg: 4 }}>
            {children}
          </GridItem>
        </Grid>
      </GridContainer>
    </section>
  );
}
