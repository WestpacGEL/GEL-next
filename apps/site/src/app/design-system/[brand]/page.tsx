import { Button, Grid, GridItem, Input } from '@westpac/ui';
import { GithubIcon } from '@westpac/ui/icon';
import Link from 'next/link';

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

import { Hero, Section, SectionHeading, SectionItem } from '../components';

export default function DesignSystemHomePage({ params }: { params: { brand: string } }) {
  const brand = (params.brand || 'wbc') as BrandKey;
  return (
    <div tabIndex={-1} id="content" className="focus:outline-none">
      <Hero brand={brand} />
      <Section>
        <SectionHeading>Accessible by design</SectionHeading>
        <Grid>
          <SectionItem className="flex flex-col gap-2 leading-loose">
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
            <p className="mb-5 leading-loose sm:mb-7">
              The GEL Design System is now using React. You can still access HTML/CSS but with React at its core we can
              showcase so much more and deliver even higher-quality, more accessible code.
            </p>
            <h3 className="typography-body-8 mb-5 border-b pb-2 font-bold">Who else is using React?</h3>
            <Grid tag="ul" className="items-center gap-y-4 text-neutral-70 sm:gap-x-4 sm:gap-y-8">
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
        <SectionHeading>Subscribe to GEL updates</SectionHeading>
        <Grid>
          <SectionItem>
            <p className="mb-5 leading-loose sm:mb-7">
              Get the latest brand and component updates as well as access to new resources and helpful tips.
            </p>
            <form
              action="//westpac.us11.list-manage.com/subscribe/post?u=d3cf7e940bf311ace99e397b7&amp;id=c78955f1b4"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              target="_blank"
              noValidate
            >
              <Grid className="text-left">
                <GridItem span={{ initial: 10, sm: 5, md: 4 }} start={{ initial: 2, sm: 3, md: 4 }}>
                  <label htmlFor="mce-EMAIL" className="mb-2 inline-block w-full">
                    Enter your e-mail address
                  </label>
                  <Input
                    size="large"
                    type="email"
                    id="mce-EMAIL"
                    name="EMAIL"
                    autoComplete="email"
                    className="w-full"
                  />
                </GridItem>
                <GridItem
                  span={{ initial: 10, sm: 2 }}
                  start={{ initial: 2 }}
                  className="flex items-end sm:col-start-auto"
                >
                  <Button
                    look="primary"
                    type="submit"
                    size="large"
                    name="subscribe"
                    id="mc-embedded-subscribe"
                    block={{ initial: true, sm: false }}
                  >
                    Subscribe
                  </Button>
                </GridItem>
              </Grid>
            </form>
          </SectionItem>
        </Grid>
      </Section>
      <Section background>
        <SectionHeading>Downloads &amp; links</SectionHeading>
        <Grid className="mb-5 sm:mb-9">
          <SectionItem className="flex flex-col gap-2">
            <p className="leading-loose">
              Design on-brand with greater efficiency and accuracy using the Sketch UI Kit.
            </p>
            <p className="leading-loose">
              Visit GitHub to follow Westpac GEL Design System code updates and log issues.
            </p>
          </SectionItem>
        </Grid>
        <Grid className="gap-y-4 text-left xsl:gap-x-5 sm:gap-x-8 md:gap-x-10">
          <GridItem span={{ initial: 10, xsl: 6, md: 5 }} start={{ initial: 2, md: 2 }} className="xsl:col-start-auto">
            <h3 className="typography-body-8 border-b border-neutral pb-3 font-bold sm:mb-2">Downloads</h3>
            <ul className="typography-body-10">
              <li className="border-b border-border">
                <Link
                  href="/articles/figma-libraries"
                  className="box-border flex min-h-[3.4375rem] items-center justify-between py-4 outline-offset-[3px] outline-focus hover:text-primary hover:underline sm:min-h-12 sm:py-1.5 sm:pr-1.5"
                >
                  Figma UI Kits
                  <FigmaLogo />
                </Link>
              </li>
            </ul>
          </GridItem>
          <GridItem span={{ initial: 10, xsl: 6, md: 5 }} start={{ initial: 2 }} className="xsl:col-start-auto">
            <h3 className="typography-body-8 border-b border-neutral pb-3 font-bold sm:mb-2">Links</h3>
            <ul className="typography-body-10">
              <li className="border-b border-border">
                <Link
                  href="https://github.com/WestpacGEL/GEL-next/"
                  target="_blank"
                  className="box-border flex min-h-[3.4375rem] items-center justify-between py-4 outline-offset-[3px] outline-focus hover:text-primary hover:underline sm:min-h-12 sm:py-1.5 sm:pr-1.5"
                >
                  Follow Westpac GEL on GitHub
                  <GithubIcon size={{ initial: 'large', lg: 'xlarge' }} color="text" />
                </Link>
              </li>
            </ul>
          </GridItem>
        </Grid>
      </Section>
    </div>
  );
}
