import NextLink from 'next/link';

import { CircleLogo } from '../../circle-logo/circle-logo.component';

export const Title = (props: any) => <h3 className="typography-body-9 mb-5 uppercase sm:mb-7 md:mb-9" {...props} />;

export const Link = (props: any) => <NextLink className="group flex gap-2 lg:gap-3" {...props} />;

export const Circle = (props: any) => (
  <CircleLogo className="group-hover:outline-4 group-hover:outline-[#1976D260] lg:h-14 lg:w-14" {...props} />
);

export const Text = (props: any) => (
  <div className="inline-flex grow items-center border-b border-[#CFD8DC]" {...props} />
);
