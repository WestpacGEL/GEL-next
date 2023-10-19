'use client';

import { Container, Grid } from '@westpac/ui';

import { GELHeroLogo } from './components/gel-hero-logo';

export function Hero() {
  return (
    <div className="bg-gel-primary">
      <Container>
        <Grid className="gap-y-0 xsl:gap-y-0">
          <div className="col-span-11 row-end-[span_1] xsl:col-span-9">
            <div className="mb-4 mt-5 xsl:mb-5 xsl:mt-7 sm:mb-6 sm:mt-9 md:mb-9 md:mt-10 lg:mt-11">
              <GELHeroLogo />
            </div>
          </div>
          <div className="col-span-10 col-start-2 row-start-2 row-end-[span_1] mb-7 xsl:col-span-9 xsl:col-start-3 xsl:mb-9 sm:mb-14 md:mb-15 lg:mb-16">
            <p className="font-gel-serif text-[1.125rem] text-white antialiased sm:text-[1.5rem]">
              The Global Experience Language is our single source of truth, providing everything you need to deliver our
              brand promises and create consistent, coherent customer experiences across our entire digital landscape
              faster, and with less effort.
            </p>
          </div>
        </Grid>
      </Container>
    </div>
  );
}
