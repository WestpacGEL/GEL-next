'use client';

import { Button } from '@westpac/ui';
import { EmailIcon, GithubIcon } from '@westpac/ui/icon';
import throttle from 'lodash.throttle';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useCallback, useLayoutEffect, useState } from 'react';

import { UpIcon } from './components/up-icon';
import { styles as footerStyles } from './sticky-footer.styles';

export function StickyFooter() {
  const [visible, setVisible] = useState(true);
  const pathname = usePathname();
  const isDesignSystem = pathname.startsWith('/design-system');

  const styles = footerStyles({ visible, isDesignSystem });

  useLayoutEffect(() => {
    const setFooter = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scroll = window.scrollY;

      setVisible(windowHeight >= documentHeight || scroll > 600 || scroll + windowHeight > documentHeight - 100);
    };
    setFooter();

    const scrollHandler = throttle(setFooter, 200);

    window.addEventListener('scroll', scrollHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const handleOnClick: MouseEventHandler<HTMLButtonElement> = useCallback(ev => {
    ev.preventDefault();
    window?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <footer className={styles.footer()}>
      <div className="flex items-center">
        <span
          className={`
            hidden text-text-body
            sm:mr-3 sm:inline-block
          `}
        >
          Talk to us
        </span>
        <div className={styles.icons()}>
          <Link href="mailto:gel@westpac.com.au">
            <EmailIcon color="muted" />
          </Link>
          <Link target="_blank" href="https://github.com/WestpacGEL/GEL-next">
            <GithubIcon color="muted" />
          </Link>
        </div>
      </div>
      <Button
        look="link"
        iconAfter={UpIcon}
        onClick={handleOnClick}
        size="large"
        className={styles.button()}
        aria-label="Go to top"
      >
        <span className="pr-1 text-text-body">Top</span>
      </Button>
    </footer>
  );
}
