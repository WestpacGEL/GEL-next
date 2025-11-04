/* eslint-disable sonarjs/no-identical-functions */
/* eslint-disable no-console */
import { type Meta, StoryFn } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import { PadlockIcon } from '../icon/index.js';
import { Alert, Button } from '../index.js';

import { PassCode } from './pass-code.component.js';
import { PassCodeRef } from './pass-code.types.js';

const meta: Meta<typeof PassCode> = {
  title: 'Components/PassCode/Patterns',
  component: PassCode,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

/**
 * > SMS
 */
export const SMS = () => {
  const [value, setValue] = useState(Array.from({ length: 4 }).map(() => ''));
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);

  const ref = useRef<PassCodeRef>(null);

  const reset = () => {
    setValue(Array.from({ length: 4 }).map(() => '')); // clear
    ref.current?.focus();
  };

  const handleChange = (val: string[]) => {
    if (alert && val.some(Boolean)) {
      setAlert(false);
    }

    if (error) {
      setError(false);
    }

    setValue(val);
  };

  const handleResend = () => {
    reset();
    setAlert(true);
  };

  const handleComplete = (code: string) => {
    if (code === '1234') {
      console.log('Correct code inputted');
    } else {
      setError(true);
      reset();
    }
  };

  return (
    <div className="flex w-[350px] flex-col items-center">
      <PadlockIcon className="mb-3" color="muted" />
      <h3 className="mb-3 typography-body-5 font-bold text-text-body">Enter SMS code</h3>
      <p className="mb-3 text-center text-text-body">
        Your security code (1234) has been sent to your mobile number **** **** *XXXX{' '}
      </p>
      {error && (
        <Alert look="danger" mode="text" iconSize="small" className="mb-3">
          Enter a valid 6 digit code using only numbers, you have X remaining challenge attempts.
        </Alert>
      )}
      <PassCode
        ref={ref}
        className="mb-3"
        length={4}
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
      />
      {alert && <Alert>A text message with a new verification code was just sent to your mobile.</Alert>}
      <p className="text-text-body">
        Didn&apos;t receive your code?
        <Button look="link" size="small" onClick={handleResend}>
          Send it again
        </Button>
      </p>
    </div>
  );
};

export const SMSWithSubmit = () => {
  const [value, setValue] = useState(Array.from({ length: 4 }).map(() => ''));
  const [error, setError] = useState(false);
  const [alert, setAlert] = useState(false);

  const ref = useRef<PassCodeRef>(null);

  const reset = () => {
    setValue(Array.from({ length: 4 }).map(() => '')); // clear
    ref.current?.focus();
  };

  const handleChange = (val: string[]) => {
    if (alert && val.some(Boolean)) {
      setAlert(false);
    }

    if (error) {
      setError(false);
    }

    setValue(val);
  };

  const handleResend = () => {
    reset();
    setAlert(true);
  };

  const handleSubmit = () => {
    console.log(value.join(''));
    if (value.join('') === '1234') {
      console.log('Correct code inputted');
    } else {
      setError(true);
      reset();
    }
  };

  return (
    <div className="flex w-[350px] flex-col items-center">
      <PadlockIcon className="mb-3" color="muted" />
      <h3 className="mb-3 typography-body-5 font-bold text-text-body">Enter SMS code</h3>
      <p className="mb-3 text-center text-text-body">
        Your security code (1234) has been sent to your mobile number **** **** *XXXX{' '}
      </p>
      {error && (
        <Alert look="danger" mode="text" iconSize="small" className="mb-3">
          Enter a valid 6 digit code using only numbers, you have X remaining challenge attempts.
        </Alert>
      )}
      <PassCode ref={ref} className="mb-3" length={4} value={value} onChange={handleChange} />
      {alert && <Alert>A text message with a new verification code was just sent to your mobile.</Alert>}
      <p className="mb-3 text-text-body">
        Didn&apos;t receive your code?
        <Button look="link" size="small" onClick={handleResend}>
          Send it again
        </Button>
      </p>
      <Button look="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};
