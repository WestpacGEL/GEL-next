import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Radio } from './radio.component.js';

const meta: Meta<typeof Radio> = {
  title: 'Example/RadioGroup/Radio',
  component: Radio,
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
 * > Base radio, unchecked as that is handled by RadioGroup
 */
export const DefaultStory: Story = {
  args: { children: 'Option 1', value: 'Option 1' },
};

/**
 * > Radio with hint example
 */
export const RadioWithHint: Story = {
  args: { children: 'Option 1', value: 'Option 1', hint: 'Test hint' },
};

/**
 * > Disabled Radio example
 */
export const RadioDisabled: Story = {
  args: { children: 'Option 1', value: 'Option 1', isDisabled: true },
};
