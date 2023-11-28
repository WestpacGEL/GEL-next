/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Field } from '../field/field.component.js';

import { DatePicker } from './date-picker.component.js';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
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
 * > Different sizes example
 */
export const Sizes: Story = {
  args: {},
  render: () => {
    return (
      <>
        {(['sm', 'md', 'lg', 'xl'] as const).map(size => {
          return (
            <div className="py-2" key={size}>
              <DatePicker size={size} />
            </div>
          );
        })}
      </>
    );
  },
};

/**
 * > Controlled value
 */
export const Controlled: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('2023-08-01');
    return (
      <DatePicker
        onChange={value => {
          console.log(value.target.value);
          setValue(value.target.value);
        }}
        onOpen={() => {
          console.log('onOpen');
        }}
        onClose={() => {
          console.log('onClose');
        }}
        onBlur={() => {
          console.log('onBlur');
        }}
        onFocus={() => {
          console.log('onFocus');
        }}
        value={value}
      />
    );
  },
};

/**
 * > Disable weekends
 */
export const DisableWeekends: Story = {
  args: { disableWeekends: true },
};

/**
 * > Disable days of the week (Mon, Wed, Fri in example)
 */
export const DisableDaysOfWeek: Story = {
  args: { disableDaysOfWeek: [1, 3, 5] },
};

/**
 * > Disable specific dates (2023-10-10 in example)
 */
export const DisableSpecificDates: Story = {
  args: { disableDates: ['2023-10-10'] },
};

/**
 * > Form field example
 */
export const FormField: Story = {
  args: {},
  render: () => {
    const [value, setValue] = useState('2023-08-01');

    return (
      <Field
        label="Are you an existing customer?"
        hintMessage="Hint: choose from one of the following options"
        errorMessage="This is an inline error message"
      >
        <DatePicker
          onChange={value => {
            console.log(value.target.value);
            setValue(value.target.value);
          }}
          onOpen={() => {
            console.log('onOpen');
          }}
          onClose={() => {
            console.log('onClose');
          }}
          onBlur={() => {
            console.log('onBlur');
          }}
          onFocus={() => {
            console.log('onFocus');
          }}
          value={value}
        />
      </Field>
    );
  },
};
