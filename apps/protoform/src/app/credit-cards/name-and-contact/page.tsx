'use client';

import { Field, Form, FormGroup, FormSection, Input, InputGroup, Select } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert, ValidationErrorType } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';
import { getFormData } from '@/utils/getFormData';

import { useCreditCard } from '../context';

export default function NameAndContact() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [titleError, setTitleError] = useState('');
  const [givenNameError, setGivenNameError] = useState('');
  const [familyNameError, setFamilyNameError] = useState('');
  const [dobDayError, setDobDayError] = useState('');
  const [dobMonthError, setDobMonthError] = useState('');
  const [dobYearError, setDobYearError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [validationErrors, setValidationErrors] = useState<ValidationErrorType[]>([]);
  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, givenName, middleName, familyName, dobDay, dobMonth, dobYear, mobileNumber } = getFormData(
      e.currentTarget,
    ) as {
      dobDay: string;
      dobMonth: string;
      dobYear: string;
      familyName: string;
      givenName: string;
      middleName: string;
      mobileNumber: string;
      title: string;
    };
    if (!title || !givenName || !familyName || !dobDay || !dobMonth || !dobYear || !mobileNumber) {
      setTitleError(!title ? defaultError : '');
      setGivenNameError(!givenName ? defaultError : '');
      setFamilyNameError(!familyName ? defaultError : '');
      setDobDayError(!dobDay ? defaultError : '');
      setDobMonthError(!dobMonth ? defaultError : '');
      setDobYearError(!dobYear ? defaultError : '');
      setMobileError(!mobileNumber ? defaultError : '');
      setValidationErrors([
        ...(!title ? [{ id: 'title', label: 'Title' }] : []),
        ...(!givenName ? [{ id: 'givenName', label: 'Given name' }] : []),
        ...(!familyName ? [{ id: 'familyName', label: 'Family name' }] : []),
        ...(!dobDay || !dobMonth || !dobYear ? [{ id: 'dob', label: 'Date of birth' }] : []),
        ...(!mobileNumber ? [{ id: 'mobileNumber', label: 'Mobile number' }] : []),
      ]);
    } else {
      setData({ ...data, title, givenName, middleName, familyName, dobDay, dobMonth, dobYear, mobileNumber });
      router.push(`/credit-cards/address${isFlattenRope ? '?flatten=true' : ''}`);
    }
  };

  useEffect(() => {
    setRopeStep(5);
  }, [setRopeStep]);

  const router = useRouter();

  return (
    <div>
      <BackButton onClick={() => router.push(`/credit-cards/credit-limit${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Credit limit
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your details'}
        leadText="We just need a few more details to confirm who you are and get you the right services."
      >
        Name & contact
      </CustomHeading>
      {validationErrors.length >= 1 && <ErrorValidationAlert errors={validationErrors} />}
      <Form id="credit-card" spacing="large" onSubmit={handleSubmit}>
        <FormSection className="border-none !p-0">
          <FormGroup>
            <InputGroup
              width={{ initial: 'full', md: 5 }}
              label="Title"
              size="large"
              errorMessage={titleError}
              instanceId="title"
            >
              <Select name="title" defaultValue={data.title} invalid={!!titleError}>
                <option value="">Select</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Ms">Ms</option>
              </Select>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup size="large" label="Given name" instanceId="givenName" errorMessage={givenNameError}>
              <Input name="givenName" defaultValue={data.givenName} invalid={!!givenNameError} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup size="large" label="Middle name(s) (if any)">
              <Input name="middleName" defaultValue={data.middleName} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup size="large" instanceId="familyName" label="Family name" errorMessage={familyNameError}>
              <Input name="familyName" defaultValue={data.familyName} invalid={!!familyNameError} />
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup
              size="large"
              label="Date of birth"
              hint="For example 31 3 1980"
              instanceId="dob"
              errorMessage={dobDayError || dobMonthError || dobYearError}
            >
              <Field className="mr-2" label="Day">
                <Input
                  name="dobDay"
                  width={{ initial: 'full', md: 2 }}
                  size="large"
                  defaultValue={data.dobDay}
                  invalid={!!dobDayError}
                />
              </Field>
              <Field className="mr-2" label="Month">
                <Input
                  name="dobMonth"
                  width={{ initial: 'full', md: 2 }}
                  size="large"
                  defaultValue={data.dobMonth}
                  invalid={!!dobMonthError}
                />
              </Field>
              <Field label="Year">
                <Input
                  name="dobYear"
                  width={{ initial: 'full', md: 4 }}
                  size="large"
                  defaultValue={data.dobYear}
                  invalid={!!dobYearError}
                />
              </Field>
            </InputGroup>
          </FormGroup>

          <FormGroup>
            <InputGroup
              size="large"
              label="Mobile number"
              hint="We’ll send a verification code to your divhone later, to create your account."
              errorMessage={mobileError}
              before="AUS +61"
              instanceId="mobileNumber"
            >
              <Input name="mobileNumber" defaultValue={data.mobileNumber} invalid={!!mobileError} />
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
