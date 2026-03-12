/* eslint-disable no-console */
import { DateValue } from '@internationalized/date';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Calendar } from './calendar.component.js';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
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
    <Calendar
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
