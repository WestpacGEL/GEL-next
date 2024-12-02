/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';

import { PadlockIcon } from '../icon/index.js';
import { Alert, Button, Link } from '../index.js';

// update passcodeRef to come from types file instead
import { PassCode, PassCodeRef } from './pass-code.component.js';

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
type Story = StoryObj<typeof meta>;

/**
 * > SMS
 */
export const SMS = () => {
  const [value, setValue] = useState(Array.from({ length: 4 }).map(() => ''));
  const [showAlert, setShowAlert] = useState(false);

  const ref = useRef<PassCodeRef>(null);

  const handleChange = (val: string[]) => {
    if (showAlert && val.some(Boolean)) {
      setShowAlert(false);
    }
    setValue(val);
  };

  const handleResend = () => {
    setValue(Array.from({ length: 6 }).map(() => ''));
    ref.current?.focus();
    setShowAlert(true);
  };

  const handleComplete = (code: string) => {
    if (code === '1234') {
      console.log('Code is correct');
    } else {
      console.log('Code is incorrect');
    }
    console.log(code);
  };

  return (
    <div className="flex w-[350px] flex-col items-center">
      <PadlockIcon className="mb-3" />
      <h3 className="typography-body-5 mb-3 font-bold">Enter SMS code</h3>
      <p className="mb-4 text-center">Your security code has been sent to your mobile number **** **** *XXXX </p>
      <PassCode
        ref={ref}
        className="mb-3"
        length={4}
        value={value}
        onChange={handleChange}
        onComplete={handleComplete}
      />
      {showAlert && <Alert>A text message with a new verification code was just sent to your mobile.</Alert>}
      <p>
        Didn&apos;t receive your code?
        <Button look="link" size="small" onClick={handleResend}>
          Send it again
        </Button>
      </p>
    </div>
  );
};

export const SMSWithSubmit = () => {
  return <div />;
};
