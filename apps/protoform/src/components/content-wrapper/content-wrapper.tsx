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
        'before:pointer-events-none before:fixed before:inset-x-auto before:top-[66px] before:block before:h-1 before:bg-gradient-to-b before:from-black/[.2] before:from-0% before:opacity-0 before:transition-[opacity] before:duration-200 before:will-change-[opacity]',
        {
          'md:mr-[300px] before:right-[300px]': open,
          'md:before:opacity-0': scrolled,
          'before:left-0 ': scrolled && open,
        },
      )}
      id="content-wrapper"
    >
      <GridContainer>
        <Grid className="h-fit min-h-[90vh]">
          <GridItem span={{ initial: 12, sm: 8, md: 8, lg: 6 }} start={{ initial: 1, sm: 3, md: 3, lg: 4 }}>
            <div className="md:h-10 overscroll-x-none"></div>
            {children}
          </GridItem>
        </Grid>
      </GridContainer>
    </section>
  );
}
