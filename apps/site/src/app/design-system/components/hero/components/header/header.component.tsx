import { HamburgerMenuIcon } from '@westpac/ui/icon';
import { type BrandKey } from '@westpac/ui/tailwind';
import throttle from 'lodash.throttle';
import { useLayoutEffect, useRef, useState } from 'react';

import { useSidebar } from '../../../sidebar/sidebar.context';
import { BackgroundImage } from '../background-image/background-image.component';

import { styles } from './header.styles';

export function Header({ brand }: { brand: BrandKey }) {
  const { setOpen } = useSidebar();
  const [fixed, setFixed] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const handleScroll = throttle(() => {
        const section = ref?.current?.closest('section');
        const width = window.innerWidth;
        if (width > 768 && section) {
          setFixed(section.clientHeight - window.scrollY <= 66);
        } else {
          setFixed(window.scrollY > 5);
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
      <button className="z-10 flex items-center px-2 lg:hidden" onClick={() => setOpen(open => !open)}>
        <HamburgerMenuIcon />
      </button>
      <div className={heading()}>
        <h1 className="typography-body-9">
          <strong>GEL</strong> Design System
        </h1>
      </div>
    </header>
  );
}
