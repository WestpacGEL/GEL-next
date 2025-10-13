'use client';
import { GridContainer } from '@westpac/ui';
import { ArrowRightIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { BrandKey } from '@/app/types/brand.types';
import { GELLogo } from '@/components/logos';
import { StickyHeader } from '@/components/sticky-header';
import { BANK_OPTIONS } from '@/constants/bank-options';

import { BrandSelect } from '../brand-select/brand-select.component';
import { CircleLogo } from '../circle-logo/circle-logo.component';
import { logoMap, logoStyles } from '../utils';

export function ActionBar() {
  return (
    <StickyHeader>
      <GridContainer fixed className="lg:max-w-gel-lg-container px-4 lg:px-10">
        <div className="hidden h-17 items-end pb-2 sm:flex">
          <div className="border-gel-border mr-4 flex h-full flex-col justify-end border-r">
            <GELLogo className="text-gel-text mb-2 block h-3 w-[45px]" />
            <p className="mb-1 flex items-end">
              Design System
              <ArrowRightIcon className="mr-2 ml-0 md:mr-[1rem] md:ml-2" />
            </p>
          </div>
          <ul role="list" className="flex gap-2">
            {Object.entries(logoMap).map(([key, { logo: Logo, name }]) => (
              <li key={key}>
                <Link href={`/design-system/${key}`} className="outline-focus outline-offset-[3px]">
                  <CircleLogo>
                    <Logo aria-label={`${name} Design System`} className={logoStyles({ brand: key as BrandKey })} />
                  </CircleLogo>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-background-white-pale block sm:hidden">
          <BrandSelect
            value={undefined}
            onChange={() => {
              return;
            }}
            aria-label="Change brand"
          >
            {BANK_OPTIONS.map(({ icon: Icon, homePageClasses, key, label }) => (
              <BrandSelect.Option href={`/design-system/${key}`} key={key} textValue={label}>
                <div className="flex w-full items-center justify-between">
                  <span className="typography-body-10">
                    {label}
                    <span className="sr-only"> Design System</span>
                  </span>
                  <Icon aria-hidden="true" className={homePageClasses} />
                </div>
              </BrandSelect.Option>
            ))}
          </BrandSelect>
        </div>
      </GridContainer>
    </StickyHeader>
  );
}
