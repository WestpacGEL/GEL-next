import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Button } from './button.component.js';

const meta: Meta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div style={{ padding: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    children: 'Button text',
  },
};
