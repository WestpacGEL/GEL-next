import { Grid, GridItem } from '@westpac/ui';
import { AccessibilityIcon, ArrowSplitIcon, PhoneIcon } from '@westpac/ui/icon';

import { Container } from '@/app/design-system/components';
import { type BrandKey } from '@/app/types/brand.types';

import { BackgroundImage, Header } from './components';
import { styles } from './hero.styles';

export function Hero({ brand }: { brand: BrandKey }) {
  const { base, heading } = styles({ brand });
  return (
    <section className={base()}>
      <BackgroundImage brand={brand} type="hero" />
      <Header brand={brand} />
      <Container className="relative z-10">
        <Grid
          className={`
            mb-4 !gap-y-0
            xsl:mb-10
          `}
        >
          <GridItem
            span={{ initial: 10, xsl: 12, sm: 10 }}
            start={{ initial: 2, xsl: 1, sm: 2 }}
            className={`
              mb-4
              xsl:mb-6
            `}
          >
            <h2 className={heading()}>Designed to unify. Built to scale.</h2>
          </GridItem>
          <GridItem span={10} start={2}>
            <p
              className={`
                mb-2 typography-body-8
                sm:text-text-reversed
              `}
            >
              GEL provides enterprise standards and tools that unify design and engineering so teams deliver consistent,
              accessible, on‑brand experiences - faster and smarter.
            </p>
          </GridItem>
        </Grid>
        <Grid
          tag="ul"
          className={`
            mb-[1rem] gap-x-0 gap-y-4 typography-body-8
            xsl:gap-x-5
            sm:!gap-5
          `}
        >
          <GridItem tag="li" span={{ initial: 12, xsl: 4 }} className={`flex flex-col items-center`}>
            <div className="mb-3">
              <PhoneIcon size="large" color="mono" className={`hidden sm:inline-block`} />
              <PhoneIcon size="large" color="hero" className={`inline-block sm:hidden`} />
            </div>
            <p
              className={`
                max-w-[18.125rem]
                sm:text-text-reversed
              `}
            >
              Responsive
            </p>
          </GridItem>
          <GridItem tag="li" span={{ initial: 12, xsl: 4 }} className={`flex flex-col items-center`}>
            <div className="mb-3">
              <AccessibilityIcon
                size="large"
                color="mono"
                className={`
                  hidden
                  sm:inline-block
                `}
              />
              <AccessibilityIcon
                size="large"
                color="hero"
                className={`
                  inline-block
                  sm:hidden
                `}
              />
            </div>
            <p
              className={`
                max-w-[18.125rem]
                sm:text-text-reversed
              `}
            >
              Accessible
            </p>
          </GridItem>
          <GridItem tag="li" span={{ initial: 12, xsl: 4 }} className={`flex flex-col items-center`}>
            <div className="mb-3">
              <ArrowSplitIcon size="large" color="mono" className={`hidden sm:inline-block`} />
              <ArrowSplitIcon size="large" color="hero" className={`inline-block sm:hidden`} />
            </div>
            <p
              className={`
                max-w-[18.125rem]
                sm:text-text-reversed
              `}
            >
              Multi-brand
            </p>
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
}
