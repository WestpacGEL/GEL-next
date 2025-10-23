'use client';

import { Autocomplete, AutocompleteItem, Field, InputGroup, Select } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useCreditCard } from '../context';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';

type FormData = {
  address: string;
  housingLength: number;
};

const FIELDS_LABELS = {
  address: 'Hme address',
  housingLength: 'How long have you lived there?',
};

export default function Address() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>();
  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  const router = useRouter();

  const onSubmit = useCallback(
    (formData: FormData) => {
      setData({ ...data, ...formData });
      router.push(`/credit-cards/review-and-submit${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, router, setData],
  );

  useEffect(() => {
    setRopeStep(6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton onClick={() => router.push(`/credit-cards/name-and-contact${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Name & contact
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your details'}
        leadText="Tell us more about where you live and how long you've been there."
      >
        Address
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <form id="credit-card" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Field errorMessage={errors.address?.message}>
          <InputGroup size="large" instanceId="address">
            <Autocomplete
              noOptionsMessage="No options found"
              label="Search for you home address"
              hintMessage="Not a PO Box"
              defaultInputValue={data.address}
              invalid={!!errors.address?.message}
              {...register('address', { required: defaultError })}
            >
              <AutocompleteItem>123 Fake Street</AutocompleteItem>
            </Autocomplete>
          </InputGroup>
        </Field>

        <Field label="How long have you lived there?" errorMessage={errors.housingLength?.message}>
          <InputGroup size="large" width={{ initial: 'full', md: 5 }}>
            <Select
              defaultValue={data.housingLength}
              invalid={!!errors.housingLength?.message}
              {...register('housingLength', { required: defaultError, valueAsNumber: true })}
              id="housingLength"
            >
              <option value="">Select</option>
              <option value="1">1 Year</option>
              <option value="2">2 Years</option>
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
            </Select>
          </InputGroup>
        </Field>
        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </form>
    </div>
  );
}
