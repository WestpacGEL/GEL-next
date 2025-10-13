'use client';

import { HamburgerMenuIcon } from '@westpac/ui/icon';
import { type BrandKey } from '@westpac/ui/types';
import throttle from 'lodash.throttle';
import { useLayoutEffect, useRef, useState } from 'react';

import { ThemeDropDown } from '@/components/theme-dropdown/theme-dropdown.component';

import { useSidebar } from '../../../sidebar/sidebar.context';
import { BackgroundImage } from '../background-image/background-image.component';

import { styles } from './header.styles';

const HEADER_HEIGHT = 66;
const BREAKPOINT_SM = 768;
const FIXED_HEADER = 5;

export function Header({ brand }: { brand: BrandKey }) {
  const { setOpen } = useSidebar();
  const [fixed, setFixed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = throttle(() => {
        const section = ref?.current?.closest('section');
        const width = window.innerWidth;
        if (width > BREAKPOINT_SM && section) {
          setFixed(section.clientHeight - window.scrollY <= HEADER_HEIGHT);
        } else {
          setFixed(window.scrollY > FIXED_HEADER);
        }
      }, 10);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const { base, heading } = styles({ brand, fixed });
  return (
    <header ref={ref} className={base()}>
      <BackgroundImage brand={brand} type="header" fixed={fixed} />
      <button
        className="focus-visible:focus-outline z-10 flex items-center px-2 focus-visible:!outline-offset-[-2px] lg:hidden"
        onClick={() => setOpen(open => !open)}
      >
        <HamburgerMenuIcon color="reversed" />
      </button>
      <div className={heading()}>
        <h1 className="typography-body-9 text-text-reversed" id="header" tabIndex={-1}>
          <strong>GEL</strong> Design System
        </h1>
      </div>
      <ThemeDropDown className="!border-0" />
    </header>
  );
}
