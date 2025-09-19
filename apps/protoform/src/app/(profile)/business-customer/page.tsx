'use client';

import { Circle } from '@westpac/ui';
import { OfficeIcon } from '@westpac/ui/icon';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import {
  AccountSelectionForm,
  AccountSelectionFormData,
} from '@/components/account-selection-form/account-selection-form.component';
import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function BusinessCustomerPage() {
  const router = useRouter();

  const handleSubmit = useCallback((formData: AccountSelectionFormData) => {
    // eslint-disable-next-line no-console
    console.log('formData', formData);
    router.push('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <CustomHeading
        beforeContent={
          <div className="mb-5 flex items-center gap-1">
            <Circle className="bg-muted">
              <OfficeIcon color="white" size="xsmall" />
            </Circle>
            <h3 className="typography-body-11 font-bold text-muted">Green thumbs gardens:</h3>
            <span className="typography-body-11">1234567890</span>
          </div>
        }
      >
        Account selection
      </CustomHeading>
      <AccountSelectionForm onSubmit={handleSubmit} />
    </div>
  );
}
