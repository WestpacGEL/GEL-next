/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

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
export const Default = () => <PassCode length={4} onComplete={val => console.log(val)} />;

/**
 * > Controlled Input example
 */
export const Controlled = () => {
  const [value, setValue] = useState(Array.from({ length: 4 }).map(() => ''));

  return (
    <PassCode
      className="mb-3"
      length={4}
      value={value}
      onChange={val => setValue(val)}
      onComplete={(passcode: string) => {
        console.log('passcode', passcode);
      }}
    />
  );
};
