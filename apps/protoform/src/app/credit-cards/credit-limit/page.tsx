'use client';

import { ButtonGroup, ButtonGroupButton, Field, Input, InputGroup } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { useCreditCard } from '../context';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';

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
      <form id="credit-card" className="flex flex-col gap-4" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Controller
          control={control}
          name="creditLimitType"
          rules={{ required: defaultError }}
          render={({ field: { onChange, value } }) => (
            <Field
              label="What credit limit would you like?"
              hintMessage="You can chose a limit between $500 and $4,000 for Westpac Lite Visa Card."
              errorMessage={errors.creditLimitType?.message}
            >
              <ButtonGroup
                size="large"
                onSelectionChange={onChange} // send value to hook form
                selectedKeys={value}
                block={{ initial: true, md: false }}
                defaultSelectedKeys={data.creditLimitType}
              >
                <ButtonGroupButton id="Allocate">Allocate for me</ButtonGroupButton>
                <ButtonGroupButton id="Specify">Specify</ButtonGroupButton>
              </ButtonGroup>
            </Field>
          )}
        />
        {creditLimitType === 'Specify' && (
          <Field
            label="What credit limit would you like?"
            hintMessage="Enter a dollar value"
            errorMessage={errors.cardLimit?.message}
          >
            <InputGroup size="large" before="$" width={{ initial: 'full', md: 10 }}>
              <Input
                {...register('cardLimit', { required: defaultError })}
                id="cardLimit"
                invalid={!!errors.cardLimit?.message}
                defaultValue={data.cardLimit}
              />
            </InputGroup>
          </Field>
        )}

        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </form>
    </div>
  );
}
