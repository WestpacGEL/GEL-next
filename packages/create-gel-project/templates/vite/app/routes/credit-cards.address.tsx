'use client';

import { Autocomplete, AutocompleteItem, Field, InputGroup, Select } from '@westpac/ui';
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
  const [searchParams] = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  const navigate = useNavigate();

  const onSubmit = useCallback(
    (formData: FormData) => {
      setData({ ...data, ...formData });
      // eslint-disable-next-line sonarjs/void-use
      void navigate(`/credit-cards/review-and-submit${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, navigate, setData],
  );

  useEffect(() => {
    setRopeStep(6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton
        // eslint-disable-next-line sonarjs/void-use
        onClick={() => void navigate(`/credit-cards/name-and-contact${isFlattenRope ? '?flatten=true' : ''}`)}
      >
        Back to Name & contact
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your details'}
        leadText="Tell us more about where you live and how long you've been there."
      >
        Address
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <form id="credit-card" className="flex flex-col gap-4" onSubmit={event => void handleSubmit(onSubmit)(event)}>
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
        {/* eslint-disable-next-line sonarjs/void-use */}
        <Cta primaryType="submit" tertiaryOnClick={() => void navigate('/')} tertiary="Cancel">
          Next
        </Cta>
      </form>
    </div>
  );
}
