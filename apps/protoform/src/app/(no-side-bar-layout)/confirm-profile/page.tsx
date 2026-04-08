'use client';

import { Alert, Selector, SelectorAdornment, SelectorHint, SelectorLabel, SelectorRadio } from '@westpac/ui';
import { AccountIcon } from '@westpac/ui/icon';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';

const PROFILES = [
  {
    value: 'looking-your-best',
    name: 'Looking your best Pty Ltd',
    abn: 'ABN 12 345 678 910',
  },
  {
    value: 'feeling-my-best',
    name: 'Feeling my best Pty Ltd',
    abn: 'ABN 12 345 678 911',
  },
];

export default function ConfirmProfilePage() {
  const router = useRouter();
  const [selectedProfile, setSelectedProfile] = useState<string>();

  const handleNext = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Selected profile:', selectedProfile);
    router.push('/');
  }, [router, selectedProfile]);

  return (
    <div>
      <BackButton onClick={() => router.push('/')}>Back to [page name]</BackButton>
      <CustomHeading>Confirm profile</CustomHeading>
      <div className="flex flex-col">
        <p className="pb-3 font-medium text-text-body">Select the profile you want to use:</p>
        <Selector type="radio" value={selectedProfile} onChange={setSelectedProfile}>
          {PROFILES.map(({ value, name, abn }) => (
            <SelectorRadio
              key={value}
              value={value}
              before={
                <SelectorAdornment align="top">
                  <AccountIcon size="medium" look="outlined" />
                </SelectorAdornment>
              }
            >
              <SelectorLabel>{name}</SelectorLabel>
              <SelectorHint>{abn}</SelectorHint>
            </SelectorRadio>
          ))}
        </Selector>
        <Alert look="info" heading="Can't find your profile?">
          {"Please call 100 000 if the profile you want isn't listed above"}
        </Alert>
        <Cta primaryOnClick={handleNext} tertiaryOnClick={() => router.push('/')} tertiary="Exit">
          Next
        </Cta>
      </div>
    </div>
  );
}
