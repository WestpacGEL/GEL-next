import { type BrandKey } from '@westpac/ui/tailwind';
import React, { PropsWithChildren, useState } from 'react';

import { Header, HeaderProps } from './header';
import { DEFAULT_NAV_ITEMS } from './nav-items';
import { Sidebar } from './sidebar';

export function Layout({
  brand,
  children,
  headerProps,
  ...props
}: PropsWithChildren & { brand: BrandKey; headerProps?: Partial<HeaderProps> }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col" data-theme={brand} {...props}>
      <Sidebar navItems={DEFAULT_NAV_ITEMS} open={sidebarOpen} setOpen={setSidebarOpen} brand={brand} />
      <div className="flex flex-1 flex-col md:ml-[250px]">
        <Header {...headerProps} brand={brand} onMenuButtonClick={() => setSidebarOpen(prev => !prev)} />
        <div className="flex flex-1 flex-col p-5">{children}</div>
      </div>
    </div>
  );
}
