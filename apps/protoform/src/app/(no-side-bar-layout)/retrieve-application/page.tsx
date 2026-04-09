'use client';

import { Field, Input, InputGroup, Link as GELLink, List, ListItem, Select } from '@westpac/ui';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { BackButton } from '@/components/back-button/back-button';
import { Cta } from '@/components/cta/cta';
import { CustomHeading } from '@/components/custom-heading/custom-heading';

type FormData = {
  mobileNumber: string;
  arn: string;
  email: string;
};

export default function RetrieveApplicationPage() {
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
      <BackButton onClick={() => router.push('/')}>Back to [page name]</BackButton>
      <CustomHeading leadText="Please enter your details to [continue] your application.">
        Retrieve application
      </CustomHeading>
      <form className="flex flex-col gap-4 p-0" onSubmit={event => void handleSubmit(onSubmit)(event)}>
        <Field label="Mobile number" errorMessage={errors.mobileNumber?.message}>
          <InputGroup
            size="large"
            before={
              <Select>
                <option value="AU +61">AU +61</option>
              </Select>
            }
          >
            <Input
              {...register('mobileNumber', { required: 'This field is required' })}
              invalid={!!errors.mobileNumber?.message}
            />
          </InputGroup>
        </Field>
        <Field
          label="Application Reference Number (ARN)"
          hintMessage="This is the number you received via [provide method]] when you started this application, e.g. [example of specific product ARN]"
          errorMessage={errors.arn?.message}
        >
          <InputGroup size="large">
            <Input {...register('arn', { required: 'This field is required' })} invalid={!!errors.arn?.message} />
          </InputGroup>
        </Field>
        <Field label="Email address" errorMessage={errors.email?.message}>
          <InputGroup size="large">
            <Input {...register('email', { required: 'This field is required' })} invalid={!!errors.email?.message} />
          </InputGroup>
        </Field>

        <h3 className="typography-body-8 font-bold text-text-heading">{"What you'll need"}</h3>

        <h3 className="typography-body-8 font-bold text-text-heading">Things you should know</h3>

        <List type="bullet">
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
            <GELLink type="inline" href="#">
              T&Cs pdf link.
            </GELLink>
          </ListItem>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
            <GELLink type="inline" href="#">
              T&Cs pdf link.
            </GELLink>
          </ListItem>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
            <GELLink type="inline" href="#">
              T&Cs pdf link.
            </GELLink>
          </ListItem>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
            <GELLink type="inline" href="#">
              T&Cs pdf link.
            </GELLink>
          </ListItem>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
            <GELLink type="inline" href="#">
              T&Cs pdf link.
            </GELLink>
          </ListItem>
          <ListItem>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit{' '}
            <GELLink type="inline" href="#">
              T&Cs pdf link.
            </GELLink>
          </ListItem>
        </List>

        <Cta primaryType="submit" tertiaryOnClick={() => router.push('/')} tertiary="Exit">
          Next
        </Cta>
      </form>
    </div>
  );
}
