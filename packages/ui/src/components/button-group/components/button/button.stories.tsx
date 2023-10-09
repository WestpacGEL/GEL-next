import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Button } from './button.component.js';

const meta: Meta<typeof Button> = {
  title: 'Components/ButtonGroup/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-3">
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
 * > Only a default usage example as most things are controlled by ButtonGroup
 */
export const DefaultStory: Story = {
  args: {
    children: 'Option 1',
    value: 'Option 1',
  },
};
