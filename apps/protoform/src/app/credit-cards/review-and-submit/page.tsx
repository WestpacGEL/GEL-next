'use client';

import { PhoneIcon } from '@westpac/ui/icon';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ReviewSection } from '@/components/review-section/review-section';
import { useSidebar } from '@/components/sidebar/context';

const SECTION_ITEMS = [
  {
    sectionName: 'Quick contact',
    items: [
      { label: 'First name', value: 'Savannah' },
      { label: 'Email', value: 'fesavannah4@yopmail.com' },
    ],
    sectionPath: '',
  },
  {
    sectionName: 'Income & savings',
    items: [
      { label: 'First name', value: '$10,000 per month' },
      { label: 'Other income', value: '$5000 per month' },
      { label: 'Total balances in savings / investment accounts', value: '$40,000' },
    ],
    sectionPath: '/income-and-savings',
  },
  {
    sectionName: 'Loans & cards',
    items: [
      { label: 'Your loan repayments', value: '$2,300 per month' },
      { label: 'Non-Westpac credit cards', value: '$25,000 - Total limit' },
    ],
    sectionPath: '/loans-and-cards',
  },
  {
    sectionName: 'Home life',
    items: [
      { label: 'Your current household situation?', value: 'Owner occupied' },
      { label: 'Do you share household expenses?', value: 'No' },
      { label: 'Number of dependants', value: '3' },
      { label: 'All other expenses', value: '$2,000 per month' },
    ],
    sectionPath: '/home-life',
  },
  {
    sectionName: 'Credit limit',
    items: [{ label: 'Specific credit limit', value: '$4,000' }],
    sectionPath: '/credit-limit',
  },
  {
    sectionName: 'Name & contact',
    items: [
      { label: 'Name', value: 'Mrs Savannah Favalla' },
      { label: 'Date of birth', value: '12 February 1987' },
      { label: 'Mobile', value: '0412 234 234' },
    ],
    sectionPath: '/name-and-contact',
  },
  {
    sectionName: 'Address',
    items: [
      { label: 'Residential address', value: '13 Avalon Parade, Avalon Beach, NSW 2107' },
      { label: 'Lived at this address for', value: '6 years' },
    ],
    sectionPath: '/address',
  },
];

export default function Address() {
  const { setRopeStep } = useSidebar();

  useEffect(() => {
    setRopeStep(7);
  }, [setRopeStep]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  return (
    <div>
      <BackButton onClick={() => router.push(`/credit-cards/address${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Address
      </BackButton>
      <CustomHeading leadText="Make suure all your details are correct before you submit your application.">
        Review and submit
      </CustomHeading>
      <ReviewSection baseEditRoute="/credit-cards" sections={SECTION_ITEMS} />
      <div className="border-t border-t-border-muted-soft pt-5">
        <PhoneIcon color="primary" size="large" className="mb-5" />
        <h3 className="pb-5 typography-body-8 font-bold text-text-heading">Help protect your application</h3>
        <p>Before continuing we’ll send you a one-time passcode to your mobile for added security.</p>
      </div>
      <Cta
        primaryType="submit"
        primaryOnClick={() => router.push('/')}
        tertiaryOnClick={() => router.push('/')}
        tertiary="Cancel"
      >
        Send SMS code
      </Cta>
    </div>
  );
}
