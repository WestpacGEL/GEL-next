import { Grid, GridItem } from '@westpac/ui';
import { AccessibilityPictogram, StopwatchPictogram, TruckPictogram } from '@westpac/ui/pictogram';

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
            <h2 className={heading()}>
              Deliver quality user interfaces that scale – <em>fast!</em>
            </h2>
          </GridItem>
          <GridItem span={10} start={2}>
            <p
              className={`
                mb-2 typography-body-8
                sm:text-text-reversed
              `}
            >
              Simplify your projects with reusable components and patterns
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
              <StopwatchPictogram
                mode="reversed"
                className={`
                  hidden
                  sm:inline-block
                `}
              />
              <StopwatchPictogram
                mode="duo"
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
              Go to market faster leveraging tools to get you up and running instantly
            </p>
          </GridItem>
          <GridItem tag="li" span={{ initial: 12, xsl: 4 }} className={`flex flex-col items-center`}>
            <div className="mb-3">
              <TruckPictogram
                mode="reversed"
                className={`
                  hidden
                  sm:inline-block
                `}
              />
              <TruckPictogram
                mode="duo"
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
              Design, build and ship consistent brand experiences
            </p>
          </GridItem>
          <GridItem tag="li" span={{ initial: 12, xsl: 4 }} className={`flex flex-col items-center`}>
            <div className="mb-3">
              <AccessibilityPictogram
                mode="reversed"
                className={`
                  hidden
                  sm:inline-block
                `}
              />
              <AccessibilityPictogram
                mode="duo"
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
              Create more accessible solutions that are inclusive of all customers
            </p>
          </GridItem>
        </Grid>
      </Container>
    </section>
  );
}
