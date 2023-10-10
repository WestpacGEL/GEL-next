import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { SkipLink } from './skip-link.component.js';

const meta: Meta<typeof SkipLink> = {
  title: 'Components/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: 'This is a text only for screen reader',
    href: '#batata',
  },
};
