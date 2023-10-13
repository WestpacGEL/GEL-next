import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Circle } from './circle.component.js';

const meta: Meta<typeof Circle> = {
  title: 'Components/Circle',
  component: Circle,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: 'GK',
  },
};
