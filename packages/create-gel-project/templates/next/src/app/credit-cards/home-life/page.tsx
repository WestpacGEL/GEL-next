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
  dependants: string;
  expenseFreq: string;
  expenses: string;
  housing: string;
  sharedExpenses: string;
};

const FIELDS_LABELS = {
  dependants: 'How many dependants do you have?',
  expenseFreq: 'Do you share household expenses?',
  expenses: 'All other expenses',
  housing: 'What is your current housing situation?',
  sharedExpenses: 'Do you share household expenses?',
};

export default function HomeLife() {
  const { setRopeStep } = useSidebar();
  const { data, setData } = useCreditCard();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitted },
  } = useForm<FormData>();

  const searchParams = useSearchParams();
  const isFlattenRope = searchParams.get('flatten');
  const router = useRouter();

  const onSubmit = useCallback(
    (formData: FormData) => {
      setData({ ...data, ...formData });
      router.push(`/credit-cards/credit-limit${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, router, setData],
  );

  useEffect(() => {
    setRopeStep(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton onClick={() => router.push(`/credit-cards/loans-and-cards${isFlattenRope ? '?flatten=true' : ''}`)}>
        Back to Loans and cards
      </BackButton>
      <CustomHeading
        groupHeading={!isFlattenRope && 'Your finances'}
        leadText="Tell us more about your general expenses and living situation."
      >
        Home life
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <form id="credit-card" className="flex flex-col gap-4" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Field label="What is your current housing situation?" errorMessage={errors.housing?.message}>
          <InputGroup instanceId="housing" size="large" width={{ initial: 'full', md: 9 }}>
            <Select
              {...register('housing', { required: defaultError })}
              id="housing"
              defaultValue={data.housing}
              invalid={!!errors.housing?.message}
            >
              <option value="">Select</option>
              <option value="Renting">Renting</option>
              <option value="OwnerOccupied">Owner occupied</option>
            </Select>
          </InputGroup>
        </Field>

        <Controller
          control={control}
          name="sharedExpenses"
          rules={{ required: defaultError }}
          defaultValue={data.sharedExpenses}
          render={({ field: { onChange, value } }) => (
            <Field
              label="Do you share household expenses?"
              hintMessage="For example utility bills"
              errorMessage={errors.sharedExpenses?.message}
            >
              <ButtonGroup
                size="large"
                block={{ initial: true, md: false }}
                onSelectionChange={onChange}
                selectedKeys={value}
              >
                <ButtonGroupButton id="Yes">Yes</ButtonGroupButton>
                <ButtonGroupButton id="No">No</ButtonGroupButton>
              </ButtonGroup>
            </Field>
          )}
        />

        <Field
          label="How many dependants do you have?"
          hintMessage="Excluding spouse"
          errorMessage={errors.dependants?.message}
        >
          <InputGroup instanceId="dependants" size="large" width={{ initial: 'full', md: 3 }}>
            <Select
              {...register('dependants', { required: defaultError })}
              id="dependants"
              invalid={!!errors.dependants?.message}
              defaultValue={data.dependants}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
            </Select>
          </InputGroup>
        </Field>

        <Field
          label="All other expenses"
          hintMessage="For example Food, regular bills. transport, Insurance, Child support. Enter a dollar value and choose a frequency"
          errorMessage={errors.expenses?.message || errors.expenseFreq?.message}
        >
          <InputGroup
            size="large"
            instanceId="expenses"
            before="$"
            width={{ initial: 'full', md: 10 }}
            after={
              <Select
                {...register('expenseFreq', { required: defaultError })}
                id="expenseFreq"
                invalid={!!errors.expenseFreq?.message}
                defaultValue={data.expenseFreq}
              >
                <option value="">Select</option>
                <option value="Weekly">Weekly</option>
                <option value="Fortnightly">Fortnightly</option>
                <option value="Monthly">Monthly</option>
              </Select>
            }
          >
            <Input
              {...register('expenses', { required: defaultError })}
              id="expenses"
              invalid={!!errors.expenses?.message}
              defaultValue={data.expenses}
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
