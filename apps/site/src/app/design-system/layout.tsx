import { reader } from '@/app/reader';
import { formatNavItems } from '@/utils/format';

import { Sidebar, SidebarContextProvider } from './my-components';

export default async function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  const items = await reader.collections.designSystem.list();
  const formattedItems = formatNavItems(items);

  return (
    <div className="flex min-h-screen flex-col">
      <SidebarContextProvider>
        <Sidebar items={formattedItems} />
        <div className="mb-8 flex flex-1 flex-col lg:ml-[18.75rem]">{children}</div>
      </SidebarContextProvider>
    </div>
  );
}
