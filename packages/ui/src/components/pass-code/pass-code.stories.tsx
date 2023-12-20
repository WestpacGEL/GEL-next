/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Button, Link } from '../index.js';

import { PassCode } from './pass-code.component.js';

const meta: Meta<typeof PassCode> = {
  title: 'Components/PassCode',
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
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    length: 4,
  },
};

/**
 * > SMS usage example
 */
export const SMSStory = () => {
  return (
    <div className="flex flex-col items-center">
      <h3 className="typography-body-5 mb-3 font-bold">Enter SMS code</h3>
      <p className="mb-4">
        Send to mobile ending ...XXXX{' '}
        <Link
          type="inline"
          className="cursor-pointer"
          onPress={() => {
            console.log('update');
          }}
        >
          update
        </Link>
      </p>
      <PassCode
        className="mb-3"
        length={6}
        onComplete={(passcode: string) => {
          console.log('passcode', passcode);
        }}
      />
      <Button look="link">Resend code</Button>
    </div>
  );
};
