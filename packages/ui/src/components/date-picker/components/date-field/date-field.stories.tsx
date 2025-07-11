/* eslint-disable no-console */
import { DateValue } from '@internationalized/date';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DateField } from './date-field.component.js';

const meta: Meta<typeof DateField> = {
  title: 'Components/DateField',
  component: DateField,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="h-30">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
};

/**
 * > Default usage example
 */
export const State = () => {
  const [date, setDate] = useState<DateValue>();

  return (
    <DateField
      locale="en_AU"
      value={date}
      onChange={value => {
        console.log('value', value);
        if ('day' in value) {
          setDate(value);
        }
      }}
    />
  );
};
