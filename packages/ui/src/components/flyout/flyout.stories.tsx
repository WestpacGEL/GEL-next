import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useOverlayTriggerState } from 'react-stately';

import { Button } from '../button/index.js';

import { Flyout } from './flyout.component.js';
import { type FlyoutProps } from './flyout.types.js';

function StoryFlyout({ children, state: _state, ...props }: FlyoutProps) {
  const state = useOverlayTriggerState({});

  return (
    <div className="flex h-50 items-start justify-center pt-4">
      <Button onClick={() => state.open()}>Open flyout</Button>
      <Flyout {...props} state={state}>
        {children}
      </Flyout>
    </div>
  );
}

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
    'aria-label': 'Flyout',
    className: 'w-70',
    isDismissable: true,
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
    className: 'w-50',
    heading: 'Flyout heading',
    isDismissable: true,
    position: 'left',
  },
};
