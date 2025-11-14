'use client';

import { ButtonGroup, ButtonGroupButton, Field, Input, InputGroup, Select } from '@westpac/ui';
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
  repaymentFreq: string;
  repayments: string;
  totalBal: string;
  otherCards: string;
};

const FIELDS_LABELS = {
  repaymentFreq: 'Repayment frequency',
  repayments: 'Your loan repayments (if any)',
  totalBal: 'Total balances of non-Westpac cards',
  otherCards: 'Do you have any non-Westpac credit cards?',
};

export default function IncomeAndSavings() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>();

  const otherCards = watch('otherCards');

  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');
  const router = useRouter();

  const onSubmit = useCallback(
    (formData: FormData) => {
      setData({ ...data, ...formData });
      router.push(`/credit-cards/home-life${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, router, setData],
  );

  useEffect(() => {
    setRopeStep(2);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton
        onClick={() => router.push(`/credit-cards/income-and-savings${isFlattenRope ? '?flatten=true' : ''}`)}
      >
        Back to Income and savings
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your finances'}
        leadText="Provide the total balances of any non-Westpac loans and credit cards you have."
      >
        Loans & cards
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <form id="credit-card" className="flex flex-col gap-4" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Field
          label="Your loan repayments (if any)"
          hintMessage="For example Home, Investment or Personal loans, overdrafts"
          errorMessage={errors.repaymentFreq?.message || errors.repayments?.message}
        >
          <InputGroup
            before="$"
            width={{ initial: 'full', md: 10 }}
            after={
              <Select
                {...register('repaymentFreq', { required: defaultError })}
                id="repaymentFreq"
                invalid={!!errors.repaymentFreq?.message}
                defaultValue={data.repaymentFreq}
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
              invalid={!!errors.repayments?.message}
              {...register('repayments', { required: defaultError })}
              id="repayments"
              defaultValue={data.repayments}
            />
          </InputGroup>
        </Field>

        <Controller
          control={control}
          name="otherCards"
          rules={{ required: defaultError }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Field
              label="Do you have any non-Westpac credit cards?"
              hintMessage="Including store and charge cards, lines of credit"
              errorMessage={errors.otherCards?.message}
            >
              <ButtonGroup
                size="large"
                block={{ initial: true, md: false }}
                defaultSelectedKeys={data.nonWestpacCards}
                id="otherCards"
                onSelectionChange={onChange}
                selectedKeys={value}
                onBlur={onBlur}
              >
                <ButtonGroupButton id="Yes">Yes</ButtonGroupButton>
                <ButtonGroupButton id="No">No</ButtonGroupButton>
              </ButtonGroup>
            </Field>
          )}
        />
        {otherCards === 'Yes' && (
          <Field
            label="Total balances of non-Westpac cards"
            hintMessage="Enter a dollar value"
            errorMessage={errors.totalBal?.message}
          >
            <InputGroup instanceId="totalBal" size="large" before="$" width={{ initial: 'full', md: 10 }}>
              <Input
                invalid={!!errors.totalBal?.message}
                {...register('totalBal', { required: defaultError })}
                id="totalBal"
                defaultValue={data.totalBal}
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
