'use client';

import { Field, Input, InputGroup, Select } from '@westpac/ui';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';
import { useCreditCard } from '@/contexts/credit-card.context';

type FormData = {
  title: string;
  givenName: string;
  middleName: string;
  familyName: string;
  dob: string;
  dobDay: number;
  dobMonth: number;
  dobYear: number;
  mobileNumber: string;
};
const FIELDS_LABELS = {
  title: 'Title',
  givenName: 'Given name',
  middleName: 'Middle name(s) (if any)',
  familyName: 'Family name',
  dob: 'Date of birth',
  dobDay: 'Day',
  dobMonth: 'Month',
  dobYear: 'Year',
  mobileNumber: 'Mobile number',
};

export default function NameAndContact() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const [searchParams] = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>();

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (formData: FormData) => {
      setData({ ...data, ...formData });
      // eslint-disable-next-line sonarjs/void-use
      void navigate(`/credit-cards/address${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, navigate, setData],
  );

  useEffect(() => {
    setRopeStep(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {/* eslint-disable-next-line sonarjs/void-use */}
      <BackButton onClick={() => void navigate(`/credit-cards/credit-limit${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Credit limit
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your details'}
        leadText="We just need a few more details to confirm who you are and get you the right services."
      >
        Name & contact
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <form id="credit-card" className="flex flex-col gap-4" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Field label="Title" errorMessage={errors.title?.message}>
          <InputGroup width={{ initial: 'full', md: 5 }} size="large">
            <Select
              {...register('title', { required: defaultError })}
              id="title"
              defaultValue={data.title}
              invalid={!!errors.title?.message}
            >
              <option value="">Select</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Ms">Ms</option>
            </Select>
          </InputGroup>
        </Field>
        <Field>
          <InputGroup size="large" label="Given name" errorMessage={errors.givenName?.message}>
            <Input
              {...register('givenName', { required: defaultError })}
              id="givenName"
              defaultValue={data.givenName}
              invalid={!!errors.givenName?.message}
            />
          </InputGroup>
        </Field>
        <Field label="Middle name(s) (if any)">
          <InputGroup size="large">
            <Input {...register('middleName')} id="middleName" defaultValue={data.middleName} />
          </InputGroup>
        </Field>
        <Field label="Family name" errorMessage={errors.familyName?.message}>
          <InputGroup size="large">
            <Input
              {...register('familyName', { required: defaultError })}
              id="familyName"
              defaultValue={data.familyName}
              invalid={!!errors.familyName?.message}
            />
          </InputGroup>
        </Field>
        <Field
          label="Date of birth"
          hintMessage="For example 31 3 1980"
          errorMessage={errors.dobDay?.message || errors.dobMonth?.message || errors.dobYear?.message}
        >
          <div className="flex">
            <Field className="mr-2" label="Day">
              <Input
                {...register('dobDay', { required: defaultError, valueAsNumber: true })}
                id="dobDay"
                width={{ initial: 'full', md: 2 }}
                size="large"
                defaultValue={data.dobDay}
                invalid={!!errors.dobDay?.message}
              />
            </Field>
            <Field className="mr-2" label="Month">
              <Input
                {...register('dobMonth', { required: defaultError, valueAsNumber: true })}
                id="dobMonth"
                width={{ initial: 'full', md: 2 }}
                size="large"
                defaultValue={data.dobMonth}
                invalid={!!errors.dobMonth?.message}
              />
            </Field>
            <Field label="Year">
              <Input
                {...register('dobYear', { required: defaultError, valueAsNumber: true })}
                id="dobYear"
                width={{ initial: 'full', md: 4 }}
                size="large"
                defaultValue={data.dobYear}
                invalid={!!errors.dobYear?.message}
              />
            </Field>
          </div>
        </Field>
        <Field
          label="Mobile number"
          hintMessage="We’ll send a verification code to your divhone later, to create your account."
          errorMessage={errors.mobileNumber?.message}
        >
          <InputGroup size="large" before="AUS +61">
            <Input
              {...register('mobileNumber', { required: defaultError })}
              id="mobileNumber"
              defaultValue={data.mobileNumber}
              invalid={!!errors.mobileNumber?.message}
            />
          </InputGroup>
        </Field>
        {/* eslint-disable-next-line sonarjs/void-use */}
        <Cta primaryType="submit" tertiaryOnClick={() => void navigate('/')} tertiary="Cancel">
          Next
        </Cta>
      </form>
    </div>
  );
}
