'use client';

import { ProgressRopeProps } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import { RopeDataSetter } from '@/components/rope-data-setter/rope-data-setter';

import { useMemo } from 'react';
import { useSidebar } from '@/components/sidebar/context';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { Sidebar } from '@/components/sidebar/sidebar';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';

export default function CreditCardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CustomHeader />
      <ContentWrapper>
        <div>{children}</div>
      </ContentWrapper>
      <CustomFooter />
    </>
  );
}
