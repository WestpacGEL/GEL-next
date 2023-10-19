'use client';
import { Container } from '@westpac/ui';
import { ArrowRightIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { BrandKey } from '@/app/types/brand.types';
import { GELLogo } from '@/components/logos';
import { StickyHeader } from '@/components/sticky-header';

import { CircleLogo } from '../circle-logo/circle-logo.component';
import { logoMap, logoStyles } from '../utils';

export function ActionBar() {
  return (
    <StickyHeader>
      <Container className="flex h-[6.375rem] items-end bg-white pb-2 ">
        <div className="mr-4 flex h-full flex-col justify-end border-r-[1px] border-gel-border">
          <span className="mb-2 inline-block">
            <GELLogo className="text-gel-text" />
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
      </Container>
    </StickyHeader>
  );
}
