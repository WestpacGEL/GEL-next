import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Circle } from './circle.component.js';

const meta: Meta<typeof Circle> = {
  title: 'Components/Circle',
  component: Circle,
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
    children: 'GK',
  },
};
