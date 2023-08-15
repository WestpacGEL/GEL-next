import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { HelpIcon } from '../icon/index.js';

import { Popover } from './popover.component.js';

const meta: Meta<typeof Popover> = {
  title: 'Example/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-4">
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
    label: 'Click Me',
    heading: 'test title',
    children:
      'Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas.',
  },
};

/**
 * > Using icon as trigger
 */
export const PopoverIconTrigger: Story = {
  args: {
    heading: 'test title',
    look: 'link',
    iconAfter: () => <HelpIcon color="hero" />,
    children:
      'Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas.',
  },
};
