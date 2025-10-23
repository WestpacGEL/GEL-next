'use client';

import { Button, Field, Input, InputGroup, Textarea } from '@westpac/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { BackButton } from '@/components/back-button/back-button';
import { CustomHeading } from '@/components/custom-heading/custom-heading';

type FormData = {
  givenName: string;
  familyName: string;
  comment: string;
};
export default function NoProgressRopePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const router = useRouter();

  const onSubmit = useCallback(
    (formData: FormData) => {
      // eslint-disable-next-line no-console
      console.log(formData);
      router.push('/');
    },
    [router],
  );

  return (
    <div>
      <BackButton onClick={() => router.push('/')}>Back to GEL forms framework</BackButton>
      <CustomHeading leadText="We’d love your feedback! Please take a moment to share your thoughts so we can keep improving and making things better for you.">
        Feedback
      </CustomHeading>
      <form id="credit-card" className="p-0" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Field label="Given name (Optional)" errorMessage={errors.givenName?.message}>
          <InputGroup size="large">
            <Input {...register('givenName')} />
          </InputGroup>
        </Field>
        <Field label="Family name (Optional)" errorMessage={errors.familyName?.message}>
          <InputGroup size="large">
            <Input {...register('familyName')} />
          </InputGroup>
        </Field>
        <Field label="Your comments:" errorMessage={errors.comment?.message}>
          <Textarea size="large" {...register('comment', { required: 'This field is required' })} />
        </Field>
        <div className="xsl:flex-row mt-5 flex flex-col gap-2">
          <Button type="submit" size="large" look="primary">
            Send feedback
          </Button>
          <Button type="reset" size="large" look="link">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
