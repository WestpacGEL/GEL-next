'use client';

import { ProgressRopeProps } from '@westpac/ui';
import { useBreakpoint } from '@westpac/ui/hook';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useMemo } from 'react';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { useSidebar } from '@/components/sidebar/context';
import { Sidebar } from '@/components/sidebar/sidebar';

import { CreditCardContextProvider } from './context';

function CreditCardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { open, setRopeData } = useSidebar();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  const CREDIT_CARD_PROGRESS_ROPE: ProgressRopeProps['data'] = [
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

  const CREDIT_CARD_PROGRESS_FLATTEN = CREDIT_CARD_PROGRESS_ROPE.reduce(
    (acc, current) => {
      if ('steps' in current) {
        return [...acc, ...current.steps];
      }
      return [...acc, current];
    },
    [] as Exclude<ProgressRopeProps['data'], undefined>,
  );

  useEffect(() => {
    setRopeData(isFlattenRope ? CREDIT_CARD_PROGRESS_FLATTEN : CREDIT_CARD_PROGRESS_ROPE);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFlattenRope]);

  return (
    <>
      <ContentWrapper isSidebarOpen={open}>
        <CreditCardContextProvider>
          <div>{children}</div>
        </CreditCardContextProvider>
      </ContentWrapper>
    </>
  );
}

export default function CreditCardsLayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const bp = useBreakpoint();
  const router = useRouter();

  const headerLeftIconProps = useMemo(() => {
    return ['initial', 'sm', 'xsl'].includes(bp)
      ? ({
          leftIcon: 'arrow',
          leftOnClick: () => router.back(),
        } as const)
      : {};
  }, [bp, router]);

  return (
    <>
      <CustomHeader {...headerLeftIconProps} />
      <Sidebar />
      <Suspense>
        <CreditCardsLayout>{children}</CreditCardsLayout>
      </Suspense>
      <CustomFooter />
    </>
  );
}
