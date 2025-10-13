import NextLink, { LinkProps } from 'next/link';
import { PropsWithChildren, ReactNode } from 'react';

import { CircleLogo } from '../../circle-logo/circle-logo.component';

export function Title({ children }: { children: ReactNode }) {
  return <h3 className="typography-site-9 mb-5 font-bold uppercase sm:mb-7 md:mb-9">{children}</h3>;
}

export function Link(props: PropsWithChildren<LinkProps>) {
  return <NextLink className="group focus-visible:focus-outline flex gap-2 lg:gap-3" {...props} />;
}

export function Circle({ children }: { children: ReactNode }) {
  return (
    <CircleLogo className="group-hover:outline-4 group-hover:outline-[#1976D260] lg:size-14">{children}</CircleLogo>
  );
}

export function Text({ children }: { children: ReactNode }) {
  return <div className="border-gel-border inline-flex grow items-center border-b leading-loose">{children}</div>;
}
