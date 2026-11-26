import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

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
 * > New semantic roles preserve compatibility when the indicator is used as an icon.
 * > The spinner and embedded icon use icon tokens; the label uses text tokens.
 * > The toolbar controls the brand and light/dark mode.
 */
export const SemanticColors: Story = {
  render: () => (
    <section aria-label="Semantic loading indicators" className="bg-background-white p-3 text-text-body">
      <h2 className="mb-3 typography-body-7 font-bold">Semantic loading indicators</h2>
      <div className="flex flex-wrap justify-center gap-4">
        {(['body', 'heading', 'link'] as const).map(color => (
          <ProgressIndicator key={color} color={color} size="large" icon={PadlockIcon} label={color} />
        ))}
      </div>
    </section>
  ),
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
        <ProgressIndicator key={size} size={size} color="mono" />
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
      <ProgressIndicator size="large" icon={PadlockIcon} />
      <ProgressIndicator size="large" icon={PadlockTickIcon} />
      <ProgressIndicator size="large" icon={FingerprintIcon} />
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
      <ProgressIndicator size="large" icon={PadlockTickIcon} label="Signing in..." />
    </div>
  );
};
