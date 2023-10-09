import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useState } from 'react';

import { DatePicker } from './date-picker.component.js';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="h-30 p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {},
};

/**
 * > Different sizes example
 */
export const DifferentSizesStory: Story = {
  args: {},
  render: () => {
    return (
      <>
        {(['sm', 'md', 'lg', 'xl'] as any[]).map(size => {
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
export const ControlledValueStory: Story = {
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
