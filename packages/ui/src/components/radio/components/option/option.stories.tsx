import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Option } from './option.component.js';

const meta: Meta<typeof Option> = {
  title: 'Example/Radio/Option',
  component: Option,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex justify-center p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'center',
  },
  argTypes: {
    isDisabled: {
      description: 'Controls whether individual radio options are disabled or not',
      type: { name: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Base option, unchecked as that is handled by Radio
 */
export const DefaultStory: Story = {
  args: { children: 'Option 1', value: 'Option 1' },
};

/**
 * > Option with hint example
 */
export const OptionWithHint: Story = {
  args: { children: 'Option 1', value: 'Option 1', hint: 'Test hint' },
};

/**
 * > Disabled Option example
 */
export const OptionDisabled: Story = {
  args: { children: 'Option 1', value: 'Option 1', isDisabled: true },
};
