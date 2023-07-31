import { HamburgerMenuIcon } from '@westpac/ui';
import { clsx } from 'clsx';
import React from 'react';

// Credits: https://github.com/jmarioste/next-responsive-sidebar-tailwind

type NavbarProps = {
  onMenuButtonClick(): void;
};
export function Navbar(props: NavbarProps) {
  return (
    <nav
      className={clsx({
        'bg-primary transition-colors': true, // colors
        'flex items-center': true, // layout
        'w-full fixed z-50 px-4 shadow-sm h-16': true, //positioning & styling
      })}
    >
      <div className="text-lg font-bold text-white">GEL Next</div>
      <div className="grow"></div>
      <button className="md:hidden" onClick={props.onMenuButtonClick}>
        <div className="h-6 w-6">
          <HamburgerMenuIcon color="white" />
        </div>
      </button>
    </nav>
  );
}
