'use client';

import { type ProgressRopeProps } from '@westpac/ui';
import { useBreakpoint } from '@westpac/ui/hook';
import { Suspense, useEffect, useMemo } from 'react';
import { Outlet, useNavigate, useSearchParams } from 'react-router';

import { ContentWrapper } from '@/components/content-wrapper/content-wrapper';
import { CustomFooter } from '@/components/custom-footer/custom-footer';
import { CustomHeader } from '@/components/custom-header/custom-header';
import { useSidebar } from '@/components/sidebar/context';
import { Sidebar } from '@/components/sidebar/sidebar';
import { CreditCardContextProvider } from '@/contexts/credit-card.context';

function BaseCreditCardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { open, setRopeData } = useSidebar();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  const CREDIT_CARD_PROGRESS_ROPE: ProgressRopeProps['data'] = [
    {
      type: 'group',
      text: 'Get started',
      steps: [{ text: 'Quick contact', onClick: () => navigate('/credit-cards') }],
    },
    {
      type: 'group',
      text: 'Your finances',
      steps: [
        { text: 'Income & savings', onClick: () => navigate('/credit-cards/income-and-savings') },
        { text: 'Loans & cards', onClick: () => navigate('/credit-cards/loans-and-cards') },
        { text: 'Home life', onClick: () => navigate('/credit-cards/home-life') },
      ],
    },
    {
      type: 'group',
      text: 'Your card',
      steps: [{ text: 'Credit limit', onClick: () => navigate('/credit-cards/credit-limit') }],
    },
    {
      type: 'group',
      text: 'Your details',
      steps: [
        { text: 'Name & contact', onClick: () => navigate('/credit-cards/name-and-contact') },
        { text: 'Address', onClick: () => navigate('/credit-cards/address') },
      ],
    },
    { text: 'Review and Submit', onClick: () => navigate('/credit-cards/review-and-submit') },
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

export default function CreditCardsLayout() {
  const bp = useBreakpoint();
  const navigate = useNavigate();

  const headerLeftIconProps = useMemo(() => {
    return ['initial', 'sm', 'xsl'].includes(bp)
      ? ({
          leftIcon: 'arrow',
          leftOnClick: () => navigate(-1),
        } as const)
      : {};
  }, [bp, navigate]);

  return (
    <>
      <CustomHeader {...headerLeftIconProps} />
      <Sidebar />
      <Suspense>
        <BaseCreditCardsLayout>
          <Outlet />
        </BaseCreditCardsLayout>
      </Suspense>
      <CustomFooter />
    </>
  );
}
