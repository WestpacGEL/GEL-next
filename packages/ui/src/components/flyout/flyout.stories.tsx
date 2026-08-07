import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button } from '../button/index.js';

import { Flyout } from './flyout.component.js';
import { FlyoutProps } from './flyout.types.js';

const StoryFlyout = ({ children, ...props }: FlyoutProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-[300px] items-start justify-center pt-4">
      <Button onClick={() => setOpen(true)}>Open flyout</Button>
      <Flyout {...props} onClose={() => setOpen(false)} open={open}>
        {children}
      </Flyout>
    </div>
  );
};

const meta: Meta<typeof Flyout> = {
  title: 'Components/Flyout',
  component: Flyout,
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
  render: args => <StoryFlyout {...args} />,
  args: {
    children: (
      <p className="p-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam ullam atque dignissimos ab quaerat nobis rem a
        ad blanditiis laborum labore repellendus, vero nihil ducimus, aliquam culpa explicabo doloremque corporis.
      </p>
    ),
    width: '300px',
  },
};

/**
 * > Left-aligned usage example with an optional heading
 */
export const LeftAlignedWithHeading: Story = {
  render: args => <StoryFlyout {...args} />,
  args: {
    children: (
      <p className="p-2">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam ullam atque dignissimos ab quaerat nobis rem a
        ad blanditiis laborum labore repellendus, vero nihil ducimus, aliquam culpa explicabo doloremque corporis.
      </p>
    ),
    heading: 'Flyout heading',
    position: 'left',
    width: '250px',
  },
};
