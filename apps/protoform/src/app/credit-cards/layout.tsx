'use client';

import { ProgressRopeProps } from '@westpac/ui';
import { useRouter } from 'next/navigation';

import { RopeDataSetter } from '@/components/rope-data-setter/rope-data-setter';

import { CreditCardContextProvider } from './context';

export default function CreditCardsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
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
  return (
    <section>
      <CreditCardContextProvider>
        <RopeDataSetter data={CREDIT_CARD_PROGRESS_ROPE} />
        <div>{children}</div>
      </CreditCardContextProvider>
    </section>
  );
}
