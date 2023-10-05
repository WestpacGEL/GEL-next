'use client';

import { Container, Grid, Item } from '@westpac/ui';
import { AccessibilityPictogram, StopwatchPictogram, TruckPictogram } from '@westpac/ui/pictogram';
import { useSearchParams } from 'next/navigation';

import { type BrandKey } from '@/app/types/brand.types';

import { BackgroundImage, Header } from './components';
import { styles } from './hero.styles';

export function Hero() {
  const searchParams = useSearchParams();
  const brand = (searchParams.get('brand') ?? 'wbc') as BrandKey;
  const { base, heading } = styles({ brand });
  return (
    <>
      <section className={base()}>
        <BackgroundImage brand={brand} type="hero" />
        <Header brand={brand} />
        <Container className="relative z-10">
          <Grid className="mb-4 xsl:mb-10">
            <Item
              span={{ initial: 10, xsl: 12, sm: 10 }}
              start={{ initial: 2, xsl: 1, sm: 2 }}
              className="mb-4 xsl:mb-6"
            >
              <h2 className={heading()}>
                Deliver quality user interfaces that scale – <em>fast!</em>
              </h2>
            </Item>
            <Item span={10} start={2}>
              <p className="typography-body-8">Simplify your projects with reusable components and patterns</p>
            </Item>
          </Grid>
          <Grid tag="ul" className="typography-body-8 gap-x-0 gap-y-4 xsl:gap-x-5">
            <Item tag="li" span={{ initial: 12, xsl: 4 }} className=" flex flex-col items-center ">
              <div className="mb-3 xsl:mb-4">
                <StopwatchPictogram mode="light" className="hidden sm:inline-block" />
                <StopwatchPictogram mode="duo" className="inline-block sm:hidden" />
              </div>
              <div>Go to market faster leveraging tools to get you up and running instantly</div>
            </Item>
            <Item tag="li" span={{ initial: 12, xsl: 4 }} className=" flex flex-col items-center ">
              <div className="mb-3 xsl:mb-4">
                <TruckPictogram mode="light" className="hidden sm:inline-block" />
                <TruckPictogram mode="duo" className="inline-block sm:hidden" />
              </div>
              <div>Design, build and ship consistent brand experiences</div>
            </Item>
            <Item tag="li" span={{ initial: 12, xsl: 4 }} className=" flex flex-col items-center ">
              <div className="mb-3 xsl:mb-4">
                <AccessibilityPictogram mode="light" className="hidden sm:inline-block" />
                <TruckPictogram mode="duo" className="inline-block sm:hidden" />
              </div>
              <div>Create more accessible solutions that are inclusive of all customers</div>
            </Item>
          </Grid>
        </Container>
      </section>
    </>
  );
}
