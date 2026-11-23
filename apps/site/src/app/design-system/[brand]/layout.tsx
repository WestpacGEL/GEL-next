import { SkipLink } from '@westpac/ui';
import { notFound } from 'next/navigation';
import { ReactNode, Suspense } from 'react';

import { reader } from '@/app/reader';
import { StickyFooter } from '@/components/sticky-footer';
import { BANK_OPTIONS } from '@/constants/bank-options';
import { formatNavItems, sortMenu } from '@/utils/format';

import { Sidebar, SidebarContextProvider } from '../components';

export default async function DesignSystemLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const paramsBrand = await params;
  const brand = BANK_OPTIONS.find(({ key }) => key === paramsBrand.brand)?.key;
  if (!brand) {
    notFound();
  }
  const readerInstance = await reader();
  const allContent = await readerInstance.collections.designSystem.all();
  const formattedItems = sortMenu(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    formatNavItems(
      allContent.filter(i => !i.entry?.excludeFromNavbar).map(({ entry, slug }) => ({ slug, name: entry.name })),
    ),
  );

  return (
    <div data-brand={brand} className="bg-background-white">
      <SkipLink href="#content" className="z-[100]">
        Skip to content
      </SkipLink>
      <div className="flex min-h-screen flex-col text-text-body">
        <SidebarContextProvider>
          <Suspense>
            <Sidebar items={formattedItems} brand={brand} />
          </Suspense>
          <div
            className={`
              mb-8 flex flex-1 flex-col
              lg:ml-[18.75rem]
            `}
          >
            {children}
          </div>
        </SidebarContextProvider>
      </div>
      <StickyFooter />
    </div>
  );
}
