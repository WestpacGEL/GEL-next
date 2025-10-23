'use client';

import { Field, Input, InputGroup } from '@westpac/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useCreditCard } from './context';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';
import { ErrorValidationAlert } from '@/components/error-validation-alert/error-validation-alert';
import { useSidebar } from '@/components/sidebar/context';
import { defaultError } from '@/constants/form-contsants';

type FormData = {
  name: string;
  email: string;
};

const FIELDS_LABELS = {
  name: 'Given name',
  email: 'Email address',
};

export default function CreditCards() {
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
      router.push(`/credit-cards/income-and-savings${isFlattenRope ? '?flatten=true' : ''}`);
    },
    [data, isFlattenRope, router, setData],
  );

  useEffect(() => {
    setRopeStep(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <BackButton onClick={() => router.push('/')}>Back to GEL forms framework</BackButton>
      <CustomHeading groupHeading={!isFlattenRope && 'Get started'} leadText="To begin, we just need a few details.">
        Quick contact
      </CustomHeading>
      {!isValid && isSubmitted && <ErrorValidationAlert errors={errors} labels={FIELDS_LABELS} />}
      <form id="credit-card" className="flex flex-col gap-4" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Field
          label="Given name"
          hintMessage="To help us verify your identity online, please enter your name exactly as it appears on your ID."
          errorMessage={errors.name?.message}
        >
          <InputGroup size="large" instanceId="name">
            <Input
              {...register('name', { required: defaultError })}
              id="name"
              defaultValue={data.name}
              invalid={!!errors.name?.message}
            />
          </InputGroup>
        </Field>
        <Field label="Email address" errorMessage={errors.email?.message}>
          <InputGroup size="large" instanceId="email">
            <Input
              {...register('email', { required: defaultError })}
              id="email"
              defaultValue={data.email}
              invalid={!!errors.email?.message}
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
