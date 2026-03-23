import { Grid, GridItem } from '@westpac/ui';
import { GithubIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { BrandKey } from '@/app/types/brand.types';
import { FigmaLogo } from '@/components/logos';

import { Hero, Section, SectionHeading, SectionItem } from '../../components';

export default async function DesignSystemHomePage({ params }: { params: Promise<{ brand: string }> }) {
  const paramsBrand = await params;
  const brand = (paramsBrand.brand || 'wbc') as BrandKey;
  return (
    <div
      tabIndex={-1}
      id="content"
      className={`
        bg-background-white
        focus:outline-none
      `}
    >
      <Hero brand={brand} />
      <Section>
        <SectionHeading className="pb-4">GEL building blocks</SectionHeading>
        <Grid className="gap-y-6">
          <GridItem span={{ initial: 10, xsl: 6 }} start={{ initial: 2, md: 1, xsl: 'auto' }} className="text-left">
            <h3
              className={`
                typography-body-8
                font-bold
              `}
            >
              Brand foundations & tokens
            </h3>
            <br />
            <p className="font-bold">Shared styling that aligns customer and banker journeys</p>
            <br />
            <p>A single, token‑driven brand foundation that keeps experiences consistent across platforms.</p>
            <br />
            <p>
              This enables faster, safer brand and accessibility updates - reducing duplication and cost of change in
              design and code.
            </p>
            <br />
            <p className="font-bold">Every team can adopt GEL foundations to stay on‑brand and aligned.</p>
          </GridItem>
          <GridItem span={{ initial: 10, xsl: 6 }} start={{ initial: 2, xsl: 'auto' }} className="text-left">
            <h3
              className={`
                typography-body-8
                font-bold
              `}
            >
              Components & patterns
            </h3>
            <br />
            <p className="font-bold">Reusable design for all teams - faster builds for React 18+</p>
            <br />
            <p>
              Accessible, approved components and patterns that improve consistency and design efficiency across
              products and platforms.
            </p>
            <br />
            <p>
              For React 18+ teams, coded components keep design and code aligned for additional build speed and
              consistency.
            </p>
            <br />
            <p className="font-bold">Use the component and pattern designs anywhere.</p>
          </GridItem>
        </Grid>
      </Section>
      <Section background>
        <SectionHeading>Downloads &amp; links</SectionHeading>
        <Grid
          className={`
            mb-5
            sm:mb-9
          `}
        >
          <SectionItem className="flex flex-col gap-2">
            <p className="leading-[2]">Design on-brand with greater efficiency and accuracy using the Figma UI Kit.</p>
            <p className="leading-[2]">Visit GitHub to follow Westpac GEL Design System code updates and log issues.</p>
          </SectionItem>
        </Grid>
        <Grid
          className={`
            gap-y-4 text-left
            xsl:gap-x-5
            sm:gap-x-8
            md:gap-x-10
          `}
        >
          <GridItem span={{ initial: 10, xsl: 6, md: 5 }} start={{ initial: 2, md: 2, xsl: 'auto' }}>
            <h3
              className={`
                border-b border-border-muted-strong pb-3 typography-body-8
                font-bold
                sm:mb-2
              `}
            >
              Downloads
            </h3>
            <ul className="typography-body-10">
              <li className="border-b border-border-muted-soft">
                <Link
                  href="/articles/figma-libraries"
                  className={`
                    box-border flex min-h-[3.4375rem] items-center
                    justify-between py-[1rem] hover:text-text-primary
                    hover:underline focus-visible:focus-outline
                    sm:min-h-12 sm:py-1.5 sm:pr-1.5
                  `}
                >
                  Figma UI Kits
                  <FigmaLogo />
                </Link>
              </li>
            </ul>
          </GridItem>
          <GridItem span={{ initial: 10, xsl: 6, md: 5 }} start={{ initial: 2, xsl: 'auto' }}>
            <h3
              className={`
                border-b border-border-muted-strong pb-3 typography-body-8
                font-bold
                sm:mb-2
              `}
            >
              Links
            </h3>
            <ul className="typography-body-10">
              <li className="border-b border-border-muted-soft">
                <Link
                  href="https://github.com/WestpacGEL/GEL-next/"
                  target="_blank"
                  className={`
                    box-border flex min-h-[3.4375rem] items-center
                    justify-between py-[1rem] outline-offset-[3px]
                    hover:text-text-primary hover:underline focus-visible:focus-outline
                    sm:min-h-12 sm:py-1.5 sm:pr-1.5
                  `}
                >
                  Follow Westpac GEL on GitHub
                  <GithubIcon size={{ initial: 'large', lg: 'xlarge' }} color="muted" />
                </Link>
              </li>
            </ul>
          </GridItem>
        </Grid>
      </Section>
    </div>
  );
}
