import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { RadioGroupRadio } from './radio-group-radio.component.js';

const meta: Meta<typeof RadioGroupRadio> = {
  title: 'Components/RadioGroup/Radio',
  component: RadioGroupRadio,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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
export const Default: Story = {
  args: { label: 'Option 1', value: 'Option 1' },
};

/**
 * > Radio with hint example
 */
export const Hint: Story = {
  args: { label: 'Option 1', value: 'Option 1', hint: 'Test hint' },
};

/**
 * > Disabled Radio example
 */
export const Disabled: Story = {
  args: { label: 'Option 1', value: 'Option 1', isDisabled: true },
};
