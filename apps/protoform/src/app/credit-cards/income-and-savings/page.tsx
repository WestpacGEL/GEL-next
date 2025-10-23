'use client';

import { Field, Input, InputGroup, Repeater, Select } from '@westpac/ui';
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
  incomeFreq: string;
  income: string;
  totalBal: string;
};

const FIELDS_LABELS = {
  incomeFreq: 'Income frequency',
  income: 'Income, salary, pension (after tax)',
  totalBal: 'Total balances in savings & investment accounts (if any)',
};

export default function IncomeAndSavings() {
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
      router.push(`/credit-cards/loans-and-cards${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, router, setData],
  );

  useEffect(() => {
    setRopeStep(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton onClick={() => router.push(`/credit-cards${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Quick contact
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your finances'}
        leadText="Tell us about your income and any savings you have."
      >
        Income & savings
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <form id="credit-card" className='flex flex-col gap-4' onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Repeater>
          <Field
            label="Income, salary, pension (after tax)"
            hintMessage="Enter a dollar value and choose a frequency"
            errorMessage={errors.income?.message || errors.incomeFreq?.message}
          >
            <InputGroup
              instanceId="income"
              before="$"
              width={{ initial: 'full', md: 10 }}
              after={
                <Select
                  {...register('incomeFreq', { required: defaultError })}
                  id="incomeFreq"
                  defaultValue={data.incomeFreq}
                  invalid={!!errors.incomeFreq?.message}
                >
                  <option value="">Select</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Fortnightly">Fortnightly</option>
                  <option value="Monthly">Monthly</option>
                </Select>
              }
              size="large"
            >
              <Input
                invalid={!!errors.income?.message}
                {...register('income', { required: defaultError })}
                defaultValue={data.income}
              />
            </InputGroup>
          </Field>
        </Repeater>

        <Field
          label="Total balances in savings & investment accounts (if any)"
          hintMessage="Enter a dollar value"
          errorMessage={errors.totalBal?.message}
        >
          <InputGroup size="large" instanceId="totalBal" before="$" width={{ initial: 'full', md: 10 }}>
            <Input
              invalid={!!errors.totalBal?.message}
              {...register('totalBal', { required: defaultError })}
              id="totalBal"
              defaultValue={data.totalBal}
            />
          </InputGroup>
        </Field>

        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Cancel">
          Next
        </Cta>
      </form>
    </div>
  );
}
