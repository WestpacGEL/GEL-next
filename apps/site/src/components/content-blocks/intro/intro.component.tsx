'use client';

import { Container, Grid, Item } from '@westpac/ui';

import { Section } from '../section';

import { TableOfContents } from './components';

export function Intro() {
  return (
    <>
      <Section paddingTop="large">
        <Container>
          <Grid>
            <Item span={{ initial: 12, sm: 7 }}>
              <p className="typography-body-8 font-light leading-[1.5] sm:typography-body-7 sm:leading-[1.5]">
                Alerts use a cross-brand palette of reserved, contextual colours providing a flexible, consistent
                message system for common user interactions.
              </p>
            </Item>
            <Item span={{ initial: 12, sm: 4 }} start={{ initial: 1, sm: 9 }}>
              <TableOfContents />
            </Item>
          </Grid>
        </Container>
      </Section>
    </>
  );
}
