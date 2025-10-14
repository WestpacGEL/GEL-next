'use client';

import { Grid, GridItem } from '@westpac/ui';
import { GithubIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { Hero, Section, SectionHeading, SectionItem } from '../../components';

import { BrandKey } from '@/app/types/brand.types';
import {
  AtlassianLogo,
  FacebookLogo,
  FigmaLogo,
  GovLogo,
  IBMLogo,
  MicrosoftLogo,
  MyobLogo,
  ReactLogo,
  ShopifyLogo,
  TwitterLogo,
} from '@/components/logos';

export default function DesignSystemHomePage({ params }: { params: { brand: string } }) {
  const brand = (params.brand || 'wbc') as BrandKey;
  return (
    <div tabIndex={-1} id="content" className="bg-background-white-faint focus:outline-none">
      <Hero brand={brand} />
      <Section>
        <SectionHeading>Accessible by design</SectionHeading>
        <Grid>
          <SectionItem className="text-text-body flex flex-col gap-2 leading-[2]">
            <p>Accessibility and inclusive design is a strong part of the GEL Design System.</p>
            <p>
              The system supports teams to deliver to the Group accessibility commitment, to provide meaningful banking
              experiences to all customers.
            </p>
            <p>
              Solutions have been thought about in detail and pressure tested against the latest WCAG recommendations,
              delivering the most accessible components and patterns possible.
            </p>
            <p>The Design Quality team can then guide teams further along the path of accessibility.</p>
          </SectionItem>
        </Grid>
      </Section>
      <Section background>
        <ReactLogo className="mb-3" />
        <SectionHeading>Built on React</SectionHeading>
        <Grid>
          <SectionItem>
            <p className="mb-5 leading-[2] sm:mb-7">
              The GEL Design System is now using React. You can still access HTML/CSS but with React at its core we can
              showcase so much more and deliver even higher-quality, more accessible code.
            </p>
            <h3 className="typography-body-8 border-b-border-hero text-text-heading mb-5 border-b pb-2 font-bold">
              Who else is using React?
            </h3>
            <Grid tag="ul" className="items-center gap-y-4 sm:gap-x-4 sm:gap-y-8">
              {[GovLogo, MicrosoftLogo, MyobLogo, IBMLogo, AtlassianLogo, FacebookLogo, TwitterLogo, ShopifyLogo].map(
                (Logo, i) => (
                  <GridItem
                    tag="li"
                    key={i}
                    span={{ initial: 12, xsl: 6, sm: 3 }}
                    className="flex items-center justify-center"
                  >
                    <Logo />
                  </GridItem>
                ),
              )}
            </Grid>
          </SectionItem>
        </Grid>
      </Section>
      <Section>
        <SectionHeading>Downloads &amp; links</SectionHeading>
        <Grid className="mb-5 sm:mb-9">
          <SectionItem className="flex flex-col gap-2">
            <p className="leading-[2]">Design on-brand with greater efficiency and accuracy using the Figma UI Kit.</p>
            <p className="leading-[2]">Visit GitHub to follow Westpac GEL Design System code updates and log issues.</p>
          </SectionItem>
        </Grid>
        <Grid className="xsl:gap-x-5 gap-y-4 text-left sm:gap-x-8 md:gap-x-10">
          <GridItem span={{ initial: 10, xsl: 6, md: 5 }} start={{ initial: 2, md: 2, xsl: 'auto' }}>
            <h3 className="typography-body-8 border-border-muted-strong border-b pb-3 font-bold sm:mb-2">Downloads</h3>
            <ul className="typography-body-10">
              <li className="border-border-muted-soft border-b">
                <Link
                  href="/articles/figma-libraries"
                  className="outline-focus hover:text-text-primary box-border flex min-h-[3.4375rem] items-center justify-between py-[1rem] outline-offset-[3px] hover:underline sm:min-h-12 sm:py-1.5 sm:pr-1.5"
                >
                  Figma UI Kits
                  <FigmaLogo />
                </Link>
              </li>
            </ul>
          </GridItem>
          <GridItem span={{ initial: 10, xsl: 6, md: 5 }} start={{ initial: 2, xsl: 'auto' }}>
            <h3 className="typography-body-8 border-border-muted-strong border-b pb-3 font-bold sm:mb-2">Links</h3>
            <ul className="typography-body-10">
              <li className="border-border-muted-soft border-b">
                <Link
                  href="https://github.com/WestpacGEL/GEL-next/"
                  target="_blank"
                  className="outline-focus hover:text-text-primary box-border flex min-h-[3.4375rem] items-center justify-between py-[1rem] outline-offset-[3px] hover:underline sm:min-h-12 sm:py-1.5 sm:pr-1.5"
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
