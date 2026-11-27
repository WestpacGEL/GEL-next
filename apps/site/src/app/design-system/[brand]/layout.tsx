import { SkipLink } from '@westpac/ui';
import { ReactNode, Suspense } from 'react';

import { reader } from '@/app/reader';
import { BrandKey } from '@/app/types/brand.types';
import { StickyFooter } from '@/components/sticky-footer';
import { formatNavItems, sortMenu } from '@/utils/format';

import { Sidebar, SidebarContextProvider } from '../components';
import { SearchProvider, SearchResult } from '../components/search/search.component';

function getSectionHeadingId(title: string) {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .toLowerCase()
    .split(' ')
    .join('-');
}

export default async function DesignSystemLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ brand: string }>;
}) {
  const paramsBrand = await params;
  const readerInstance = await reader();
  const allContent = await readerInstance.collections.designSystem.all();
  const brand = (paramsBrand?.brand ?? 'wbc') as BrandKey; // double check this is the best way to do this.
  const formattedItems = sortMenu(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    formatNavItems(
      allContent.filter(i => !i.entry?.excludeFromNavbar).map(({ entry, slug }) => ({ slug, name: entry.name })),
    ),
  );
  const searchResults: SearchResult[] = allContent
    .filter(({ entry }) => !entry.excludeFromNavbar)
    .flatMap(({ entry, slug }) => {
      const baseHref = `/design-system/${brand}/${slug}`;
      const pageResult: SearchResult = {
        href: baseHref,
        label: entry.name,
        pageHref: baseHref,
        searchText: entry.description,
        titleText: entry.name,
      };
      const sections = [
        ...entry.design
          .filter(section => !section.noTitle)
          .map(section => ({ name: section.title.name, tab: 'design' })),
        ...entry.accessibility.map(section => ({ name: section.title.name, tab: 'accessibility' })),
        ...entry.code.filter(section => !section.noTitle).map(section => ({ name: section.title.name, tab: 'code' })),
      ];

      return [
        pageResult,
        ...sections.map(section => ({
          context: section.name,
          href: `${baseHref}?tab=${section.tab}#${getSectionHeadingId(section.name)}`,
          label: entry.name,
          pageHref: baseHref,
          searchText: section.name,
          titleText: entry.name,
          tab: section.tab,
        })),
      ];
    });

  return (
    <div data-brand={brand?.toLowerCase()} className="bg-background-white">
      <SkipLink href="#content" className="z-[100]">
        Skip to content
      </SkipLink>
      <div className="flex min-h-screen flex-col text-text-body">
        <SidebarContextProvider>
          <SearchProvider results={searchResults}>
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
          </SearchProvider>
        </SidebarContextProvider>
      </div>
      <StickyFooter />
    </div>
  );
}
