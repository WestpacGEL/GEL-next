'use client';

import { ArrowLeftIcon } from '@westpac/ui/icon';
import Link from 'next/link';

import { GELLogo } from '@/components/logos';
import { StickyHeader } from '@/components/sticky-header';

export function Header() {
  return (
    <StickyHeader>
      <header className="bg-gel-primary xsl:h-11 flex h-9 items-end">
        <Link href="/">
          <div className="xsl:h-9 flex h-7 items-center">
            <span className="xsl:w-10 flex w-8 items-center justify-center">
              <ArrowLeftIcon className="text-text-mono" />
            </span>
            <span className="flex h-full items-center border-l border-[rgba(255,255,255,0.8)] pl-3">
              <GELLogo className="text-text-mono xsl:h-4 xsl:w-10 h-3 w-7.5" />
            </span>
          </div>
        </Link>
      </header>
    </StickyHeader>
  );
}
