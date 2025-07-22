/* eslint-disable no-console */
import { type Meta, StoryFn } from '@storybook/react-vite';
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

/**
 * > Default usage example
 */
export const Default = () => <PassCode length={4} onComplete={val => console.log(val)} />;

export const Types = () => (
  <div className="flex flex-col gap-2">
    <p>Alphanumeric</p>
    <PassCode length={4} onComplete={val => console.log(val)} />
    <p>Numbers only</p>
    <PassCode type="numbers" length={4} onComplete={val => console.log(val)} />
    <p>Letters only</p>
    <PassCode type="letters" length={4} onComplete={val => console.log(val)} />
  </div>
);

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
