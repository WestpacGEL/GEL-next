import { reader } from '@/app/reader';
import { StickyFooter } from '@/components/sticky-footer';
import { formatNavItems } from '@/utils/format';

import { Sidebar, SidebarContextProvider } from './components';

export default async function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  const allContent = await reader.collections.designSystem.all();
  const formattedItems = formatNavItems(allContent.map(({ entry, slug }) => ({ slug, name: entry.name })));

  return (
    <>
      <div className="flex min-h-screen flex-col text-text active-theme-stg:text-heading">
        <SidebarContextProvider>
          <Sidebar items={formattedItems} />
          <div className="mb-8 flex flex-1 flex-col lg:ml-[18.75rem]">{children}</div>
        </SidebarContextProvider>
      </div>
      <StickyFooter />
    </>
  );
}
