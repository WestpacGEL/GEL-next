import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { ProgressIndicator } from './progress-indicator.component.js';
import { Button } from '../button/button.component.js';

const meta: Meta<typeof ProgressIndicator> = {
  title: 'Components/Progress Indicator/Scenarios',
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
 * >Usage in buttons
 */
export const Default: Story = {
  args: { size: 'xlarge' },
};

/**
 * >Usage in inputs
 */

export const Buttons = () => {
  return (
    <>
      <div className="flex gap-2 py-2">
        <Button size="large">
          Loading... <ProgressIndicator className="p-1 items-center" size="xsmall" inverted></ProgressIndicator>
        </Button>
        <Button size="medium">
          Loading... <ProgressIndicator className="p-1 items-center" size="xsmall" inverted></ProgressIndicator>
        </Button>
        <Button size="small">
          Loading... <ProgressIndicator className="p-1 items-center" size="xsmall" inverted></ProgressIndicator>
        </Button>
      </div>
      <div className="flex gap-2">
        <Button>
          Loading... <ProgressIndicator className="p-1 items-center" size="xsmall" inverted></ProgressIndicator>
        </Button>
      </div>
    </>
  );
};

/**
 * > Inverted for dark backgrounds
 */

export const Input = () => {
  return (
    <div className="bg-black">
      {(['xsmall', 'small', 'medium', 'large', 'xlarge'] as const).map(size => (
        <ProgressIndicator key={size} size={size} inverted className="mr-2" />
      ))}
    </div>
  );
};
