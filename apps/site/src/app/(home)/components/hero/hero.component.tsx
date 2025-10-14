'use client';

import { Grid, GridContainer } from '@westpac/ui';

import { GELHeroLogo } from './components/gel-hero-logo';

export function Hero() {
  return (
    <div className="bg-gel-primary">
      <GridContainer fixed className="lg:!max-w-gel-lg-container lg:px-10">
        <Grid className="xsl:gap-y-6 xsl:pt-7 gap-y-5 pt-5 sm:gap-y-7 sm:pt-9 md:gap-y-10 md:pt-10 lg:pt-11">
          <div className="xsl:col-span-9 col-span-11 row-end-[span_1]">
            <GELHeroLogo />
          </div>
          <div className="xsl:col-span-9 xsl:col-start-3 xsl:mb-9 col-span-10 col-start-2 row-start-2 row-end-[span_1] mb-7 sm:mb-14 md:mb-15 lg:mb-16">
            <p className="font-gel-serif text-text-mono text-[1.125rem] leading-[1.33] antialiased sm:text-[1.5rem] sm:leading-[1.38]">
              The Global Experience Language is our single source of truth communicating how we design for the digital
              channel. It provides tools and guidelines to create and deliver consistent, coherent customer experiences
              across our entire digital landscape faster, and with less effort.
            </p>
          </div>
        </Grid>
      </GridContainer>
    </div>
  );
}
