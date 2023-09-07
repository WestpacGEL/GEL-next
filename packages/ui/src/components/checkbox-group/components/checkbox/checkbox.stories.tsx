import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox.component.js';

const meta: Meta<typeof Checkbox> = {
  title: 'Example/CheckboxGroup/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex justify-center p-3">
        <Story />{' '}
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
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
export const DefaultStory: Story = {
  args: { children: 'Option 1', value: 'Option 1' },
};

/**
 * > Checkbox Item with hint example
 */
export const CheckboxItemWithHint: Story = {
  args: { children: 'Option 1', value: 'Option 1', hint: 'Test hint' },
};

/**
 * > Disabled Checkbox Item example
 */
export const CheckboxItemDisabled: Story = {
  args: { children: 'Option 1', value: 'Option 1', isDisabled: true },
};
