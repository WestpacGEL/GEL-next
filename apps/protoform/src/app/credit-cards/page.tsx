'use client';

import { Alert, Form, FormGroup, FormSection, Input, InputGroup } from '@westpac/ui';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { useSidebar } from '@/components/sidebar/context';
import { getFormData } from '@/utils/getFormData';

import { defaultError } from '../../constants/form-contsants';

import { useCreditCard } from './context';

export default function CreditCards() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email } = getFormData(e.currentTarget) as { email: string; name: string };
    if (!name || !email) {
      setNameError(!name ? defaultError : '');
      setEmailError(!email ? defaultError : '');
    } else {
      setData({ ...data, name, email });
      router.push('/credit-cards/income-and-savings');
    }
  };

  useEffect(() => {
    setRopeStep(0);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton onClick={() => router.push('/')}>Back to dashboard</BackButton>
      <CustomHeading>Quick Contact</CustomHeading>
      <Alert look="info">
        <strong>We will save your application</strong> for 14 days in case you want to retrieve and complete it later.
      </Alert>
      <Form id="credit-card" spacing="large" className="p-0" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <InputGroup size="large" label="Given name" hint="As shown on your ID" errorMessage={nameError}>
              <Input name="name" defaultValue={data.name} invalid={!!nameError} />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup size="large" label="Email address" errorMessage={emailError}>
              <Input name="email" defaultValue={data.email} invalid={!!emailError} />
            </InputGroup>
          </FormGroup>
        </FormSection>
        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </Form>
    </div>
  );
}
