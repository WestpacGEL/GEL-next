import { SkipLink } from '@westpac/ui';
import { ReactNode, Suspense } from 'react';

import { reader } from '@/app/reader';
import { BrandKey } from '@/app/types/brand.types';
import { StickyFooter } from '@/components/sticky-footer';
import { formatNavItems, sortMenu } from '@/utils/format';

import { Sidebar, SidebarContextProvider } from '../components';

export default async function DesignSystemLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { brand: string };
}) {
  const allContent = await reader().collections.designSystem.all();
  const formattedItems = sortMenu(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    formatNavItems(
      allContent.filter(i => !i.entry?.excludeFromNavbar).map(({ entry, slug }) => ({ slug, name: entry.name })),
    ),
  );

  const brand = (params?.brand ?? 'wbc') as BrandKey; // double check this is the best way to do this.

  return (
    <div data-theme={brand?.toLowerCase()}>
      <SkipLink href="#content" className="z-[100]">
        Skip to content
      </SkipLink>
      <div className="active-theme-stg:text-heading flex min-h-screen flex-col text-text">
        <SidebarContextProvider>
          <Suspense>
            <Sidebar items={formattedItems} brand={brand} />
          </Suspense>
          <div className="mb-8 flex flex-1 flex-col lg:ml-[18.75rem]">{children}</div>
        </SidebarContextProvider>
      </div>
      <StickyFooter />
    </div>
  );
}
