'use client';

import { ProgressRopeProps } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';

import { RopeDataSetter } from '@/components/rope-data-setter/rope-data-setter';

import { CreditCardContextProvider } from './context';
import { ReactNode, Suspense, useMemo } from 'react';
import { useSidebar } from '@/components/sidebar/context';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { Sidebar } from '@/components/sidebar/sidebar';
import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';

function CreditCardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const GROUPED_CREDIT_CARD_PROGRESS_ROPE: ProgressRopeProps['data'] = [
    {
      type: 'group',
      text: 'Get started',
      steps: [{ text: 'Quick contact', onClick: () => router.push('/credit-cards') }],
    },
    {
      type: 'group',
      text: 'Your finances',
      steps: [
        { text: 'Income & savings', onClick: () => router.push('/credit-cards/income-and-savings') },
        { text: 'Loans & cards', onClick: () => router.push('/credit-cards/loans-and-cards') },
        { text: 'Home life', onClick: () => router.push('/credit-cards/home-life') },
      ],
    },
    {
      type: 'group',
      text: 'Your card',
      steps: [{ text: 'Credit limit', onClick: () => router.push('/credit-cards/credit-limit') }],
    },
    {
      type: 'group',
      text: 'Your details',
      steps: [
        { text: 'Name & contact', onClick: () => router.push('/credit-cards/name-and-contact') },
        { text: 'Address', onClick: () => router.push('/credit-cards/address') },
      ],
    },
    { text: 'Review and Submit', onClick: () => router.push('/credit-cards/review-and-submit') },
  ];

  const FLATTEN_CREDIT_CARD_PROGRESS_ROPE: ProgressRopeProps['data'] = [
    { text: 'Quick contact', onClick: () => router.push('/credit-cards?flatten=true') },
    { text: 'Income & savings', onClick: () => router.push('/credit-cards/income-and-savings?flatten=true') },
    { text: 'Loans & cards', onClick: () => router.push('/credit-cards/loans-and-cards?flatten=true') },
    { text: 'Home life', onClick: () => router.push('/credit-cards/home-life?flatten=true') },
    { text: 'Credit limit', onClick: () => router.push('/credit-cards/credit-limit?flatten=true') },
    { text: 'Name & contact', onClick: () => router.push('/credit-cards/name-and-contact?flatten=true') },
    { text: 'Address', onClick: () => router.push('/credit-cards/address?flatten=true') },
    { text: 'Review and Submit', onClick: () => router.push('/credit-cards/review-and-submit?flatten=true') },
  ];

  const ropeData = useMemo(() => {
    return searchParams.get('flatten') ? FLATTEN_CREDIT_CARD_PROGRESS_ROPE : GROUPED_CREDIT_CARD_PROGRESS_ROPE;
  }, [searchParams]);

  const { sidebarScrolled, open } = useSidebar();

  return (
    <>
      <CustomHeader isSidebarScrolled={sidebarScrolled} />
      <Sidebar />
      <ContentWrapper isSidebarOpen={open}>
        <CreditCardContextProvider>
          <RopeDataSetter data={ropeData} />
          <div>{children}</div>
        </CreditCardContextProvider>
      </ContentWrapper>
      <CustomFooter isSidebarOpen={open} />
    </>
  );
}

export default function CreditCardsLayoutWithSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense fallback={null}>
      <CreditCardsLayout>{children}</CreditCardsLayout>
    </Suspense>
  );
}
