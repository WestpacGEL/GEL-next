'use client';

import { Footer, Link } from '@westpac/ui';
import { SecurityIcon } from '@westpac/ui/icon';
import { clsx } from 'clsx';

import { useSidebar } from '../sidebar/context';

export function CustomFooter() {
  const { open } = useSidebar();
  return (
    <Footer
      brand="wbc"
      className={clsx('relative bottom-0 z-[58] w-full border-t-border bg-white pb-0', {
        'md:w-[calc(100%-301px)]': open,
      })}
      hideLogo
    >
      <div className="flex">
        <SecurityIcon
          size={{ initial: 'small', md: 'medium' }}
          className="float-left shrink-0 max-md:mr-1 md:mr-2"
          color="borderDark"
        />
        <p className="typography-body-10 text-muted">
          Our site and your transactions are secure. You can read our{' '}
          <Link href="#" type="inline">
            security information
          </Link>
          . <br /> © 2024 Westpac Banking Corporation ABN 33 007 457 141 AFSL and Australian credit licence 233714.
        </p>
      </div>
    </Footer>
  );
}
