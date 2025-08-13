'use client';

import { Grid, GridContainer, GridItem } from '@westpac/ui';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

import { useSidebar } from '../sidebar/context';

export function ContentWrapper({ children }: { children: ReactNode }) {
  const { open } = useSidebar();

  return (
    <section
      className={clsx('min-h-[90vh]', {
        'md:mr-[300px]': open,
      })}
      id="content-wrapper"
    >
      <GridContainer>
        <Grid>
          <GridItem span={{ initial: 12, sm: 8, md: 8, lg: 6 }} start={{ initial: 1, sm: 3, md: 3, lg: 4 }}>
            <div className="overscroll-x-none md:h-10"></div>
            {children}
          </GridItem>
        </Grid>
      </GridContainer>
    </section>
  );
}
