import NextLink, { LinkProps } from 'next/link';

import { CircleLogo } from '../../circle-logo/circle-logo.component';

export function Title({ children }: { children: React.ReactNode }) {
  return <h3 className="typography-site-9 mb-5 font-bold uppercase sm:mb-7 md:mb-9">{children}</h3>;
}

export function Link(props: React.PropsWithChildren<LinkProps>) {
  return <NextLink className="group flex gap-2 focus-visible:focus-outline lg:gap-3" {...props} />;
}

export function Circle({ children }: { children: React.ReactNode }) {
  return (
    <CircleLogo className="group-hover:outline-4 group-hover:outline-[#1976D260] lg:size-14">{children}</CircleLogo>
  );
}

export function Text({ children }: { children: React.ReactNode }) {
  return <div className="inline-flex grow items-center border-b border-gel-border leading-loose">{children}</div>;
}
