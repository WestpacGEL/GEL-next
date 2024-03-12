import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { ProgressIndicator } from './progress-indicator.component.js';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/Progress Indicator',
  component: ProgressIndicator,
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
export const Default: Story = {
  args: { size: 'xlarge' },
};

/**
 * >Different sizes of indicator
 */

export const Sizes = () => {
  return (
    <>
      {(['xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map(size => (
        <ProgressIndicator key={size} size={size} className="mr-2" />
      ))}
    </>
  );
};

/**
 * > Inverted for dark backgrounds
 */

export const Inverted = () => {
  return (
    <div className="bg-black">
      {(['xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map(size => (
        <ProgressIndicator key={size} size={size} inverted className="mr-2" />
      ))}
    </div>
  );
};
