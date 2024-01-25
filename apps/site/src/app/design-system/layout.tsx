import { SkipLink } from '@westpac/ui';
import { Suspense } from 'react';

import { reader } from '@/app/reader';
import { StickyFooter } from '@/components/sticky-footer';
import { formatNavItems, sortMenu } from '@/utils/format';

import { Sidebar, SidebarContextProvider } from './components';
import { ContentWrapper } from './components/content-wrapper';

export default async function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  const allContent = await reader().collections.designSystem.all();
  const formattedItems = sortMenu(formatNavItems(allContent.map(({ entry, slug }) => ({ slug, name: entry.name }))));

  return (
    <>
      <SkipLink href="#content" className="z-[100]">
        Skip to content
      </SkipLink>
      <div className="flex min-h-screen flex-col text-text active-theme-stg:text-heading">
        <SidebarContextProvider>
          <Suspense>
            <Sidebar items={formattedItems} />
          </Suspense>
          <ContentWrapper>{children}</ContentWrapper>
        </SidebarContextProvider>
      </div>
      <StickyFooter />
    </>
  );
}
