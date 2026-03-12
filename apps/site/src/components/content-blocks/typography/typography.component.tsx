'use client';

import { NewWindowIcon } from '@westpac/ui/icon';
import NextLink, { LinkProps } from 'next/link';
import { useParams } from 'next/navigation';
import React, { useMemo, type ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';

import { BrandKey } from '@/app/types/brand.types';

import { linkStyles } from './typography.styles';

export function Text({ children }: { children?: ReactNode }) {
  return <p className="mb-2 typography-body-9 leading-[2]">{children}</p>;
}

export function Link({
  color = 'default',
  children,
  href,
  ...props
}: React.PropsWithChildren<LinkProps & VariantProps<typeof linkStyles>>) {
  const params = useParams();
  const brand = (params.brand ?? 'wbc') as BrandKey;
  const isExternalLink =
    (typeof href === 'string' ? href : href.href || '').indexOf('http') === 0 ||
    (typeof href === 'string' ? href : href.href || '').indexOf('mailto') === 0;
  const isArticle = (typeof href === 'string' ? href : href.href || '').indexOf('/article') === 0;
  const isDesignSystem = (typeof href === 'string' ? href : href.href || '').indexOf('/design-system') === 0;

  // eslint-disable-next-line sonarjs/function-return-type
  const finalHref = useMemo(() => {
    if (isExternalLink || isArticle || isDesignSystem) {
      return href;
    }
    return `/design-system/${brand}${typeof href === 'string' ? href : href.href || ''}`;
  }, [isExternalLink, isArticle, isDesignSystem, brand, href]);

  return (
    <NextLink
      href={finalHref}
      target={isExternalLink ? '_blank' : '_self'}
      className={linkStyles({ color })}
      {...props}
    >
      {children}
      {isExternalLink && <NewWindowIcon size="xsmall" className="ml-1" />}
    </NextLink>
  );
}

export function Code({ children }: { children?: ReactNode }) {
  return <code className={`bg-background-white p-1 font-mono text-text-info`}>{children}</code>;
}
