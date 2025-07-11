/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { Field } from '../field/field.component.js';

import { DatePicker } from './date-picker.component.js';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/NewDatePicker',
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
