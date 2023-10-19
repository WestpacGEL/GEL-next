import NextLink, { LinkProps } from 'next/link';
import { VariantProps } from 'tailwind-variants';

import { linkStyles } from './typography.styles';

export function Text({ children }: { children?: React.ReactNode }) {
  return <p className="typography-body-9 mb-2 leading-[2]">{children}</p>;
}

export function Link({ color = 'default', ...props }: React.PropsWithChildren<LinkProps & VariantProps<typeof linkStyles>>) {
  return <NextLink className={linkStyles({ color })} {...props} />;
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className="bg-white px-[0.1875rem]">{children}</code>;
}
