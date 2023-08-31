'use client';

import { Container, Grid, Item } from '@westpac/ui';
import { HamburgerMenuIcon } from '@westpac/ui/icon';
import { AccessibilityPictogram, StopwatchPictogram, TruckPictogram } from '@westpac/ui/pictogram';
import { type BrandKey } from '@westpac/ui/tailwind';
import { useSearchParams } from 'next/navigation';
import { tv } from 'tailwind-variants';

import { useSidebar } from '../sidebar/sidebar.context';

// move to a styles file once finalised
const header = tv({
  base: 'relative overflow-hidden pb-7 pt-15 text-center antialiased sm:pb-11 sm:pt-18 sm:text-white',
  variants: {
    brand: {
      wbc: 'sm:bg-primary',
      stg: 'sm:bg-hero',
      bom: 'sm:bg-hero',
      bsa: 'from-hero via-[#00468e] to-[#00adbd] sm:bg-gradient-to-r',
      wbg: 'sm:bg-hero',
      rams: 'sm:bg-primary',
      btfg: '',
    },
  },
});

const heading = tv({
  base: 'typography-brand-4 sm:typography-brand-1',
  variants: {
    brand: {
      wbc: 'text-[3rem] uppercase sm:text-[4.5rem]',
      stg: '',
      bom: '',
      bsa: '',
      wbg: '',
      rams: '',
      btfg: '',
    },
  },
});

export function Hero() {
  const searchParams = useSearchParams();
  const brand = (searchParams.get('brand') ?? 'wbc') as BrandKey;
  const { setOpen } = useSidebar();
  return (
    <section className={header({ brand })}>
      <header className="absolute inset-x-0 top-0 flex h-11 sm:ml-2 lg:ml-5">
        <button className="flex items-center px-2 lg:hidden" onClick={() => setOpen(open => !open)}>
          <HamburgerMenuIcon />
        </button>
        <div className="flex grow items-center border-b border-white/70">
          <h1 className="typography-body-9 ">
            <strong>GEL</strong> Design System
          </h1>
        </div>
      </header>
      <Container>
        {/* HomeHero */}
        <Grid className="mb-4 xsl:mb-10">
          <Item span={{ initial: 10, xsl: 12, sm: 10 }} start={{ initial: 2, xsl: 1, sm: 2 }} className="mb-4 xsl:mb-6">
            <h2 className={heading({ brand })}>
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
              <StopwatchPictogram mode="light" />
            </div>
            <div>Go to market faster leveraging tools to get you up and running instantly</div>
          </Item>
          <Item tag="li" span={{ initial: 12, xsl: 4 }} className=" flex flex-col items-center ">
            <div className="mb-3 xsl:mb-4">
              <TruckPictogram mode="light" />
            </div>
            <div>Design, build and ship consistent brand experiences</div>
          </Item>
          <Item tag="li" span={{ initial: 12, xsl: 4 }} className=" flex flex-col items-center ">
            <div className="mb-3 xsl:mb-4">
              <AccessibilityPictogram mode="light" />
            </div>
            <div>Create more accessible solutions that are inclusive of all customers</div>
          </Item>
        </Grid>
      </Container>
    </section>
  );
}
