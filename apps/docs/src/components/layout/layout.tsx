import React, { PropsWithChildren, useState } from 'react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function Layout(props: PropsWithChildren & { brand: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onMenuButtonClick={() => setSidebarOpen(prev => !prev)} />
      <div className="flex flex-1 items-stretch pt-16">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} brand={props.brand} />
        <div className="container p-5 md:ml-[250px]">{props.children}</div>
      </div>
    </div>
  );
}
