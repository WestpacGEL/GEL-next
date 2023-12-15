import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { PassCode } from './pass-code.component.js';

const meta: Meta<typeof PassCode> = {
  title: 'Components/PassCode',
  component: PassCode,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    length: 4,
  },
};
