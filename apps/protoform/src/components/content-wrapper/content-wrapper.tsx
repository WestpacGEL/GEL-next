'use client';

import { Grid, GridContainer, GridItem } from '@westpac/ui';
import { clsx } from 'clsx';
import { ReactNode } from 'react';

export function ContentWrapper({ children, isSidebarOpen }: { children: ReactNode; isSidebarOpen?: boolean }) {
  return (
    <section
      className={clsx('flex-1 pb-10', {
        'md:mr-[300px]': isSidebarOpen,
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
