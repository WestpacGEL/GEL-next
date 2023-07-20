import React, { PropsWithChildren, useState } from 'react';

import { Navbar } from './navbar';
import { Sidebar } from './sidebar';

export function Layout(props: PropsWithChildren & { brand: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="grid min-h-screen grid-rows-header">
      <Navbar onMenuButtonClick={() => setSidebarOpen(prev => !prev)} />
      <div className="grid md:grid-cols-sidebar">
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} brand={props.brand} />
        <div className="container">
          <div className="mt-16 grid min-h-screen">{props.children}</div>
        </div>
      </div>
    </div>
  );
}
