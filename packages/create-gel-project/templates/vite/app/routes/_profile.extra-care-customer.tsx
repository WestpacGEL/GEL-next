'use client';

import { Circle } from '@westpac/ui';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';

import {
  AccountSelectionForm,
  type AccountSelectionFormData,
} from '@/components/account-selection-form/account-selection-form.component';
import { BackButton } from '@/components/back-button/back-button';
import { CustomHeading } from '@/components/custom-heading/custom-heading';

export default function ExtraCareCustomerPage() {
  const navigate = useNavigate();

  const handleSubmit = useCallback((formData: AccountSelectionFormData) => {
    // eslint-disable-next-line no-console
    console.log('formData', formData);
    // eslint-disable-next-line sonarjs/void-use
    void navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* eslint-disable-next-line sonarjs/void-use */}
      <BackButton onClick={() => void navigate('/')}>Back to GEL forms framework</BackButton>
      <CustomHeading
        beforeContent={
          <div className="mb-5 flex items-center gap-1">
            <Circle
              className={`
                bg-surface-primary typography-body-11 font-bold text-white
              `}
            >
              EC
            </Circle>
            <h3 className="typography-body-11 font-bold text-text-muted">Phillip Minchin:</h3>
            <span className="typography-body-11">1234567890</span>
          </div>
        }
      >
        Account selection
      </CustomHeading>
      {/* eslint-disable-next-line sonarjs/void-use */}
      <AccountSelectionForm onSubmit={handleSubmit} onCancel={() => void navigate('/')} />
    </div>
  );
}
