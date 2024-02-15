'use client';

import { ButtonGroup, Form, FormGroup, FormSection, Input, InputGroup } from '@westpac/ui';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert, ValidationErrorType } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';
import { getFormData } from '@/utils/getFormData';

import { useCreditCard } from '../context';

export default function CreditLimit() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [limitTypeError, setLimitTypeError] = useState('');
  const [cardLimitError, setCardLimitError] = useState('');
  const [creditLimitType, setCreditLimitType] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { cardLimit } = getFormData(e.currentTarget) as {
      cardLimit: string;
    };

    if (!creditLimitType || (creditLimitType === 'Specify' && !cardLimit)) {
      setLimitTypeError(!creditLimitType ? defaultError : '');
      setCardLimitError(creditLimitType === 'Specify' && !cardLimit ? defaultError : '');
      setValidationErrors([
        ...(!creditLimitType ? [{ id: 'creditLimitType', label: 'Credit limit type' }] : []),
        ...(creditLimitType === 'Specify' && !cardLimit ? [{ id: 'cardLimit', label: 'Card limit' }] : []),
      ]);
    } else {
      setData({ ...data, creditLimitType, cardLimit });
      router.push('/credit-cards/name-and-contact');
    }
  };

  useEffect(() => {
    setRopeStep(4);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton onClick={() => router.push('/credit-cards/home-life')}>Back to Home life</BackButton>
      <CustomHeading groupHeading="Your card" leadText="[Dummy lead text to be replaced later]">
        Credit limit
      </CustomHeading>
      {validationErrors.length >= 1 && <ErrorValidationAlert errors={validationErrors} />}
      <Form id="credit-card" spacing="large" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <ButtonGroup
              label="What credit limit would you like?"
              hintMessage="You can chose a limit between $500 and $4,000 for Westpac Lite Visa Card."
              size="large"
              id="creditLimitType"
              block={{ initial: true, md: false }}
              errorMessage={limitTypeError}
              defaultValue={data.creditLimitType}
              buttons={[
                { value: 'Allocate', label: 'Allocate for me' },
                { value: 'Specify', label: 'Specify' },
              ]}
              onChange={setCreditLimitType}
            />
          </FormGroup>
          {creditLimitType === 'Specify' && (
            <FormGroup>
              <InputGroup
                size="large"
                label="What credit limit would you like?"
                hint="Enter a dollar value"
                before="$"
                errorMessage={cardLimitError}
                instanceId="cardLimit"
              >
                <Input name="cardLimit" invalid={!!cardLimitError} defaultValue={data.cardLimit} />
              </InputGroup>
            </FormGroup>
          )}
        </FormSection>
        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </Form>
    </div>
  );
}
