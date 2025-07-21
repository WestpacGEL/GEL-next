import { DateValue } from '@internationalized/date';
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
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
  const [date, setDate] = useState<DateValue | null>(null);

  return (
    <DateField
      value={date}
      onChange={value => {
        setDate(value);
      }}
    />
  );
};
