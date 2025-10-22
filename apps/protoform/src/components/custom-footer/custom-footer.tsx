'use client';

import { Footer, Link } from '@westpac/ui';
import { SecurityIcon } from '@westpac/ui/icon';
import { clsx } from 'clsx';

export function CustomFooter({ isSidebarOpen }: { isSidebarOpen?: boolean }) {
  return (
    <Footer
      brand="wbc"
      className={clsx('border-t-border-muted-soft relative bottom-0 z-10 w-full bg-white pb-0', {
        'md:w-[calc(100%-301px)]': isSidebarOpen,
      })}
      hideLogo
    >
      <div className="relative">
        <div className="float-left flex-none">
          <SecurityIcon size="small" className="float-left mr-1 shrink-0" color="muted" />
        </div>
        <div className="flex">
          <p className="typography-body-10 text-muted relative flex-1">
            Our site and your transactions are secure. You can read our{' '}
            <Link href="#" type="inline">
              security information
            </Link>
            . <br /> © 2023 Westpac Banking Corporation ABN 33 007 457 141 AFSL and Australian credit licence 233714.
          </p>
        </div>
      </div>
    </Footer>
  );
}
