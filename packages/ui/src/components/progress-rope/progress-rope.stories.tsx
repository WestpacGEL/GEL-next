import { type Meta, StoryFn } from '@storybook/react';
import { useCallback, useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';
import { Button, Well } from '../index.js';

import { ProgressRope } from './progress-rope.component.js';
import { ProgressRopeProps } from './progress-rope.types.js';

const meta: Meta<typeof ProgressRope> = {
  title: 'Components/ProgressRope',
  component: ProgressRope,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;

/**
 * > Default usage example
 */
export const Default = () => {
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
      <Well className="flex items-center p-2 sm:p-2">
        <div className="mr-2 flex items-center space-x-1">
          <Button
            iconBefore={ArrowLeftIcon}
            soft
            look="faint"
            size="small"
            onClick={() => setActiveIndex(state => --state)}
          >
            prev
          </Button>{' '}
          <Button
            iconAfter={ArrowRightIcon}
            soft
            look="faint"
            size="small"
            onClick={() => setActiveIndex(state => ++state)}
          >
            next
          </Button>
        </div>
        <code className="flex">Current: {activeIndex}</code>
      </Well>
    </div>
  );
};

/**
 * > Grouping steps story usage example
 */
export const GroupingSteps = () => {
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
      <Well className="flex items-center p-2 sm:p-2">
        <div className="mr-2 flex items-center space-x-1">
          <Button
            iconBefore={ArrowLeftIcon}
            soft
            look="faint"
            size="small"
            onClick={() => setActiveIndex(state => --state)}
          >
            prev
          </Button>{' '}
          <Button
            iconAfter={ArrowRightIcon}
            soft
            look="faint"
            size="small"
            onClick={() => setActiveIndex(state => ++state)}
          >
            next
          </Button>
        </div>
        <code className="flex">Current: {activeIndex}</code>
      </Well>
    </div>
  );
};
