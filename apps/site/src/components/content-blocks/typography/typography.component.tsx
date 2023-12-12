import { NewWindowIcon } from '@westpac/ui/icon';
import NextLink, { LinkProps } from 'next/link';
import { useSearchParams } from 'next/navigation';
import { VariantProps } from 'tailwind-variants';

import { BrandKey } from '@/app/types/brand.types';

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
  const searchParams = useSearchParams();
  const brand = (searchParams.get('brand') ?? 'wbc') as BrandKey;
  const isExternalLink = href.toString().indexOf('http') === 0 || href.toString().indexOf('mailto') === 0;
  return (
    <NextLink
      href={isExternalLink ? href : `${href}?brand=${brand}`}
      target={isExternalLink ? '_blank' : '_self'}
      className={linkStyles({ color })}
      {...props}
    >
      {children}
      {isExternalLink && <NewWindowIcon size="xsmall" className="ml-1" />}
    </NextLink>
  );
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className="bg-white px-[0.1875rem] font-monospace">{children}</code>;
}
