import { type Meta, StoryFn, type StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

import { Button } from '../index.js';

import { ProgressRope } from './progress-rope.component.js';
import { ProgressRopeProps } from './progress-rope.types.js';

const meta: Meta<typeof ProgressRope> = {
  title: 'Components/ProgressRope',
  component: ProgressRope,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = useCallback(
      (index: number) => () => {
        setActiveIndex(index);
      },
      [],
    );
    const PROGRESS_ROPE_DATA: ProgressRopeProps['data'] = [
      { text: <div>Step 1</div>, onClick: handleClick(0) },
      { text: <div>Step 2</div>, onClick: handleClick(1) },
      { text: <div>Step 3</div>, onClick: handleClick(2) },
      { text: <div>Step 4</div>, onClick: handleClick(3) },
      { text: <div>Step 5</div>, onClick: handleClick(4) },
      { text: <div>Review and Submit</div>, onClick: handleClick(5) },
    ];

    return (
      <div>
        <ProgressRope current={activeIndex} data={PROGRESS_ROPE_DATA} />
        <div>
          <h3>Helper Controls</h3>
          <h4>Current: {activeIndex}</h4>
          <Button onClick={() => setActiveIndex(state => --state)}>prev</Button>{' '}
          <Button onClick={() => setActiveIndex(state => ++state)}>next</Button>
        </div>
      </div>
    );
  },
};

/**
 * > Grouping steps story usage example
 */
export const GroupingSteps: Story = {
  args: {},
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const handleClick = useCallback(
      (index: number) => () => {
        setActiveIndex(index);
      },
      [],
    );
    const PROGRESS_ROPE_DATA: ProgressRopeProps['data'] = [
      {
        type: 'group',
        text: 'Group 1',
        steps: [
          { text: 'Step 1', onClick: handleClick(0) },
          { text: 'Step 2', onClick: handleClick(1) },
        ],
      },
      {
        type: 'group',
        text: 'Group 2',
        steps: [
          { text: 'Step 3', onClick: handleClick(2) },
          { text: 'Step 4', onClick: handleClick(3) },
        ],
      },
      {
        type: 'group',
        text: 'Group 3',
        steps: [
          { text: 'Step 5', onClick: handleClick(4) },
          { text: 'Step 6', onClick: handleClick(5) },
          { text: 'Step 7', onClick: handleClick(6) },
        ],
      },
      { text: 'Review and Submit', onClick: handleClick(7) },
    ];

    return (
      <div>
        <ProgressRope current={activeIndex} data={PROGRESS_ROPE_DATA} />
        <div>
          <h3>Helper Controls</h3>
          <h4>Current: {activeIndex}</h4>
          <Button onClick={() => setActiveIndex(state => --state)}>prev</Button>{' '}
          <Button onClick={() => setActiveIndex(state => ++state)}>next</Button>
        </div>
      </div>
    );
  },
};
