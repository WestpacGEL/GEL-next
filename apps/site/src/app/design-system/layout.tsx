import { Sidebar, SidebarContextProvider } from './components';
import { DEFAULT_NAV_ITEMS } from './components/sidebar/nav-items';

export default function DesignSystemLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <SidebarContextProvider>
        <Sidebar navItems={DEFAULT_NAV_ITEMS} brand={'wbc'} />
        <div className="mb-8 flex flex-1 flex-col lg:ml-[300px]">{children}</div>
      </SidebarContextProvider>
    </div>
  );
}
