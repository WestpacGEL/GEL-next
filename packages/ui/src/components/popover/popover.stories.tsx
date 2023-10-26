import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { HelpIcon } from '../icon/index.js';

import { Popover } from './popover.component.js';

const popoverContent =
  'Small overlays of content for housing secondary information. These are often used to provide explanatory information for complex ideas.';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div>
        <Story />
      </div>
    ),
  ],
  args: {
    content: popoverContent,
    heading: 'Test Heading',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: 'Click Me',
  },
};

/**
 * > Using icon as trigger
 */
export const IconTrigger: Story = {
  args: {
    icon: () => <HelpIcon color="hero" />,
  },
};

/**
 * > Default open
 */
export const DefaultOpen: Story = {
  args: {
    children: 'Click Me',
    open: true,
  },
};

/**
 * > No heading
 */
export const NoHeading: Story = {
  args: {
    children: 'Click Me',
    open: true,
    heading: undefined,
  },
};

/**
 * > Top and bottom popover
 */
export const PopoverPlacement = () => (
  <div>
    <Popover heading="Heading" content={popoverContent} open>
      test
    </Popover>
    <Popover placement="bottom" heading="Heading" content={popoverContent} open>
      Bottom Popover
    </Popover>
    <Popover placement="bottom" heading="Heading" content={popoverContent} open>
      test
    </Popover>
    <Popover placement="bottom" heading="Heading" content={popoverContent} open>
      test
    </Popover>
  </div>
);
