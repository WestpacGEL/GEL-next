import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { Button } from '../button/index.js';
import { AddIcon, RemoveIcon } from '../icon/index.js';

import { ProgressBar } from './progress-bar.component.js';

const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    value: 50,
    look: 'default',
  },
};

/**
 * > Skinny example
 */
export const Skinny: Story = {
  args: {
    value: 50,
    look: 'skinny',
  },
};

/**
 * > No label example
 */
export const NoLabel: Story = {
  args: {
    value: 50,
    look: 'default',
    noLabel: true,
  },
};

/**
 * Example of Progress Bar controlled by buttons
 */
export const Controlled = () => {
  const [barValue, setBarValue] = useState(0);
  const handleProgress = useCallback(
    (calc: number) => {
      const progress = barValue + calc;
      if (progress > 100) return setBarValue(100);
      if (progress < 0) return setBarValue(0);
      return setBarValue(progress);
    },
    [barValue],
  );
  return (
    <>
      <h2 className="mb-1 typography-body-9 font-bold">Default</h2>
      <ProgressBar value={barValue} className="mb-2" />
      <h2 className="mb-1 typography-body-9 font-bold">Skinny</h2>
      <ProgressBar look="skinny" value={barValue} className="mb-2" />
      <div className="flex items-center space-x-1">
        <Button
          size="small"
          disabled={barValue === 0}
          iconBefore={RemoveIcon}
          look="faint"
          soft
          onClick={() => handleProgress(-10)}
        >
          10%
        </Button>
        <Button
          size="small"
          disabled={barValue === 0}
          iconBefore={RemoveIcon}
          look="faint"
          soft
          onClick={() => handleProgress(-1)}
        >
          1%
        </Button>
        <p className="flex-1 text-center">Use the +/- buttons below to demonstrate how the progress bar moves.</p>
        <Button
          size="small"
          disabled={barValue === 100}
          iconBefore={AddIcon}
          look="faint"
          soft
          onClick={() => handleProgress(+1)}
        >
          1%
        </Button>
        <Button
          size="small"
          disabled={barValue === 100}
          iconBefore={AddIcon}
          look="faint"
          soft
          onClick={() => handleProgress(+10)}
        >
          10%
        </Button>
      </div>
    </>
  );
};
