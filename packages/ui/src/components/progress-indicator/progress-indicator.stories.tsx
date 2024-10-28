import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { FingerprintIcon, PadlockIcon, PadlockTickIcon } from '../icon/index.js';

import { ProgressIndicator } from './progress-indicator.component.js';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/ProgressIndicator',
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
  args: { size: 'large' },
};

/**
 * >Different sizes of indicator
 */

export const Sizes = () => {
  return (
    <div className="flex items-center justify-center gap-1">
      {(['xsmall', 'small', 'medium', 'large'] as const).map(size => (
        <ProgressIndicator key={size} size={size} />
      ))}
    </div>
  );
};

/**
 * > Inverted for dark backgrounds
 */

export const Inverted = () => {
  return (
    <div className="flex items-center justify-center gap-1 rounded bg-black">
      {(['xsmall', 'small', 'medium', 'large'] as const).map(size => (
        <ProgressIndicator key={size} size={size} inverted />
      ))}
    </div>
  );
};

/**
 * > Large indicator with embedded icon example
 */

export const Icon = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <ProgressIndicator size="large" embedIcon={PadlockIcon} />
      <ProgressIndicator size="large" embedIcon={PadlockTickIcon} />
      <ProgressIndicator size="large" embedIcon={FingerprintIcon} />
    </div>
  );
};

/**
 * > Large indicator with label example
 */
export const Label = () => {
  return (
    <div className="flex items-center justify-center gap-3">
      <ProgressIndicator size="large" label="Loading..." />
      <ProgressIndicator size="large" embedIcon={PadlockTickIcon} label="Signing in..." />
    </div>
  );
};
