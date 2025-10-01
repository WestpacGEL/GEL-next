'use client';

import { Grid, GridItem } from '@westpac/ui';

import { Container } from '@/app/design-system/components';

import { TableOfContents } from './components';

import { IntroProps } from '.';

export function Intro({ description, sectionNames }: IntroProps) {
  return (
    <section className="py-7 sm:pt-15 sm:pb-10">
      <Container>
        <Grid>
          <GridItem span={{ initial: 12, sm: 7 }}>
            <p className="typography-body-8 sm:typography-body-7 leading-normal font-light sm:leading-normal">
              {description}
            </p>
          </GridItem>
          {sectionNames.length > 0 && (
            <GridItem span={{ initial: 12, sm: 4 }} start={{ initial: 1, sm: 9 }}>
              <TableOfContents contents={sectionNames} />
            </GridItem>
          )}
        </Grid>
      </Container>
    </section>
  );
}
