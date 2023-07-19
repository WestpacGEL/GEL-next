import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { SkipLink } from './skip-link.component.js';

const meta: Meta<typeof SkipLink> = {
  title: 'Example/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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
    children: 'This is a text only for screen reader',
    href: '#batata',
  },
};
