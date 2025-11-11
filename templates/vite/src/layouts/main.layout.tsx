'use client';

import type { ReactNode } from 'react';
import { Button, Header, List, ListItem } from '@westpac/ui';

export function MainLayout({ children }: { children: ReactNode }) {
  // const { open, setOpen } = useSidebar();
  // useEffect(() => {
  //   if (open) {
  //     setOpen(false);
  //   }
  // }, [open, setOpen]);
  return (
		<main className="border-border-muted m-auto max-w-[1923px] min-h-screen overscroll-y-none border border-y-0">
			<Header
				brand="wbc"
				leftIcon="arrow"
				// leftOnClick={() => router.back()}
				logoLink="/"
				// fixed={!isMobile}
				// isScrolled={sidebarScrolled}
				fixedMaxWidth="1921px"
				className={'z-[100] m-auto w-full'}
			>
				<Button look="faint" size={{ initial: 'small', sm: 'medium' }} soft>
					Sign Out
				</Button>
			</Header>
			<section>
				{children}
			</section>
		</main>
  );
}
