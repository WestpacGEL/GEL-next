import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox.component.js';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/CheckboxGroup/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex">
        <Story />{' '}
      </div>
    ),
  ],
  argTypes: {
    isDisabled: {
      description: 'Controls whether individual checkbox items are disabled or not',
      type: { name: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Base Checkbox Item, unchecked as that is handled by Checkbox
 */
export const Default: Story = {
  args: { children: 'Option 1', value: 'Option 1' },
};

/**
 * > Checkbox Item with hint example
 */
export const HintText: Story = {
  args: { children: 'Option 1', value: 'Option 1', hint: 'Test hint' },
};

/**
 * > Disabled Checkbox Item example
 */
export const Disabled: Story = {
  args: { children: 'Option 1', value: 'Option 1', isDisabled: true },
};
