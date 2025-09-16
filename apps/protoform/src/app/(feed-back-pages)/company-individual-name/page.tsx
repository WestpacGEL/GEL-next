'use client';

import { Form, FormGroup, FormSection, Input, InputGroup } from '@westpac/ui';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { FormEvent, useState } from 'react';
import { getFormData } from '@/utils/getFormData';
import { defaultError } from '@/constants/form-contsants';
import { ErrorValidationAlert, ValidationErrorType } from '@/components/error-validation-alert/error-validation-alert';
import { Cta } from '@/components/cta/cta';
import router from 'next/router';

export default function SuccessPage() {
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, email } = getFormData(e.currentTarget) as { email: string; name: string };
    if (!name || !email) {
      setNameError(!name ? defaultError : '');
      setEmailError(!email ? defaultError : '');
      setValidationErrors([
        ...(!name ? [{ id: 'name', label: 'Given name' }] : []),
        ...(!email ? [{ id: 'email', label: 'Email address' }] : []),
      ]);
    } else {
      // TODO: do something
    }
  };

  return (
    <div>
      <CustomHeading
        leadText="Lead text relating to this heading."
        beforeContent={
          <div className="mb-3 flex gap-1">
            <h3 className="text-muted typography-body-11">[Company/Individual name]:</h3>
            <span className="typography-body-11">1234567890</span>
          </div>
        }
      >
        Title
      </CustomHeading>
      {validationErrors.length >= 1 && <ErrorValidationAlert errors={validationErrors} />}
      <Form id="credit-card" spacing="large" className="p-0" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <InputGroup
              size="large"
              instanceId="name"
              label="Given name"
              hint="To help us verify your identity online, please enter your name exactly as it appears on your ID."
              errorMessage={nameError}
            >
              <Input name="name" invalid={!!nameError} />
            </InputGroup>
          </FormGroup>
          <FormGroup>
            <InputGroup size="large" instanceId="email" label="Email address" errorMessage={emailError}>
              <Input name="email" invalid={!!emailError} />
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
