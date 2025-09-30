'use client';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { CustomHeader } from '@/components/custom-header/custom-header';

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
