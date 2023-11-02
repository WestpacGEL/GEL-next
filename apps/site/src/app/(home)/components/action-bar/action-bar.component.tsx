'use client';
import { Container } from '@westpac/ui';
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
      <Container className="px-4">
        <div className="hidden h-[6.375rem] items-end bg-white pb-2 sm:flex">
          <div className="mr-4 flex h-full flex-col justify-end border-r-[1px] border-gel-border">
            <span className="mb-2 inline-block">
              <GELLogo className="inline-block h-3 w-[45px] text-gel-text" />
            </span>
            <p className="mb-1 flex items-end">
              Design System
              <ArrowRightIcon className="ml-2 mr-[1rem]" />
            </p>
          </div>
          <ul role="list" className="flex gap-2">
            {Object.entries(logoMap).map(([key, { logo: Logo }]) => (
              <li key={key}>
                <Link href={`/design-system?brand=${key}`}>
                  <CircleLogo>
                    <Logo className={logoStyles({ brand: key as BrandKey })} />
                  </CircleLogo>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="block bg-white sm:hidden">
          <BrandSelect
            selectedKey={undefined}
            onSelectionChange={() => {
              return;
            }}
            aria-label="Change brand"
          >
            {BANK_OPTIONS.map(({ icon, key, label }) => (
              <BrandSelect.Option href={`/design-system?brand=${key}`} key={key} textValue={label}>
                <div className="flex w-full items-center justify-between">
                  <span className="typography-body-10">{label}</span>
                  {icon}
                </div>
              </BrandSelect.Option>
            ))}
          </BrandSelect>
        </div>
      </Container>
    </StickyHeader>
  );
}
