'use client';

import { ArrowLeftIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { GELLogo } from '@/components/logos';
import { StickyHeader } from '@/components/sticky-header';

export function Header() {
  return (
    <StickyHeader>
      <header
        className={`
          flex h-9 items-end bg-gel-primary
          xsl:h-11
        `}
      >
        <Link href="/">
          <div
            className={`
              flex h-7 items-center
              xsl:h-9
            `}
          >
            <span
              className={`
                flex w-8 items-center justify-center
                xsl:w-10
              `}
            >
              <ArrowLeftIcon className="text-text-mono" />
            </span>
            <span
              className={`
                flex h-full items-center border-l border-[rgba(255,255,255,0.8)]
                pl-3
              `}
            >
              <GELLogo
                className={`
                  h-3 w-7.5 text-text-mono
                  xsl:h-4 xsl:w-10
                `}
              />
            </span>
          </div>
        </Link>
      </header>
    </StickyHeader>
  );
}
