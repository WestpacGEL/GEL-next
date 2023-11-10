'use client';

import { Container, Grid, Item } from '@westpac/ui';

import { TableOfContents } from './components';

import { IntroProps } from '.';

export function Intro({ description, sectionNames }: IntroProps) {
  return (
    <section className="py-7 sm:pb-10 sm:pt-15">
      <Container>
        <Grid>
          <Item span={{ initial: 12, sm: 7 }}>
            <p className="typography-body-8 font-light leading-[1.5] sm:typography-body-7 sm:leading-[1.5]">
              {description}
            </p>
          </Item>
          {sectionNames.length > 0 && (
            <Item span={{ initial: 12, sm: 4 }} start={{ initial: 1, sm: 9 }}>
              <TableOfContents contents={sectionNames} />
            </Item>
          )}
        </Grid>
      </Container>
    </section>
  );
}
