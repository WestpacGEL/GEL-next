import { NewWindowIcon } from '@westpac/ui/icon';
import NextLink, { LinkProps } from 'next/link';
import { VariantProps } from 'tailwind-variants';

import { linkStyles } from './typography.styles';

export function Text({ children }: { children?: React.ReactNode }) {
  return <p className="typography-body-9 mb-2 leading-[2]">{children}</p>;
}

export function Link({
  color = 'default',
  children,
  href,
  ...props
}: React.PropsWithChildren<LinkProps & VariantProps<typeof linkStyles>>) {
  return (
    <NextLink
      href={href}
      target={href.toString().indexOf('http') === 0 ? '_blank' : '_self'}
      className={linkStyles({ color })}
      {...props}
    >
      {children}
      <NewWindowIcon size="xsmall" className="ml-1" />
    </NextLink>
  );
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className="bg-white px-[0.1875rem]">{children}</code>;
}
