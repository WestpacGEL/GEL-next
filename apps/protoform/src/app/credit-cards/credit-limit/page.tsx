'use client';

import { ButtonGroup, Form, FormGroup, Input, InputGroup } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';

import { useCreditCard } from '../context';

type FormData = {
  creditLimitType: string;
  cardLimit: string;
};

const FIELDS_LABELS = {
  creditLimitType: 'What credit limit would you like?',
  cardLimit: 'What credit limit would you like?',
};

export default function CreditLimit() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>();

  const creditLimitType = watch('creditLimitType');

  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');

  const router = useRouter();

  const onSubmit = useCallback(
    (formData: FormData) => {
      setData({ ...data, ...formData });
      router.push(`/credit-cards/name-and-contact${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, router, setData],
  );

  useEffect(() => {
    setRopeStep(4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton onClick={() => router.push(`/credit-cards/home-life${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Home life
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your card'}
        leadText="
Choose your credit card limit or have one allocated for you."
      >
        Credit limit
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <Form id="credit-card" spacing="large" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <FormGroup>
          <Controller
            control={control}
            name="creditLimitType"
            rules={{ required: defaultError }}
            render={({ field: { onChange, onBlur, value } }) => (
              <ButtonGroup
                label="What credit limit would you like?"
                hintMessage="You can chose a limit between $500 and $4,000 for Westpac Lite Visa Card."
                size="large"
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
                value={value}
                block={{ initial: true, md: false }}
                errorMessage={errors.creditLimitType?.message}
                defaultValue={data.creditLimitType}
                buttons={[
                  { value: 'Allocate', label: 'Allocate for me' },
                  { value: 'Specify', label: 'Specify' },
                ]}
              />
            )}
          />
        </FormGroup>
        {creditLimitType === 'Specify' && (
          <FormGroup>
            <InputGroup
              size="large"
              label="What credit limit would you like?"
              hint="Enter a dollar value"
              before="$"
              errorMessage={errors.cardLimit?.message}
              width={{ initial: 'full', md: 10 }}
            >
              <Input
                {...register('cardLimit', { required: defaultError })}
                id="cardLimit"
                invalid={!!errors.cardLimit?.message}
                defaultValue={data.cardLimit}
              />
            </InputGroup>
          </FormGroup>
        )}

        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </Form>
    </div>
  );
}
