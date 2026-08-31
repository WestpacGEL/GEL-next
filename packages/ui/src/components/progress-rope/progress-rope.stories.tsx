import { type Meta, StoryFn } from '@storybook/react-vite';
import { useCallback, useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';
import { Button, Well } from '../index.js';

import { ProgressRope, StatusRope } from './progress-rope.component.js';
import { ProgressRopeProps, StatusRopeProps } from './progress-rope.types.js';

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

const STATUS_ROPE_DATA: StatusRopeProps['data'] = [
  {
    type: 'group',
    text: 'About you',
    steps: [
      { text: 'Personal details', subText: 'Your name and date of birth' },
      { text: 'Contact details', subText: 'Your phone, email and address' },
    ],
  },
  {
    type: 'group',
    text: 'Your finances',
    steps: [
      { text: 'Income', subText: 'Your regular sources of income' },
      { text: 'Expenses', subText: 'Your regular living expenses' },
    ],
  },
  { text: 'Review and submit', subText: 'Check the information you provided' },
];

/**
 * > Status rope usage example
 */
export const StatusRopeVariation = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <StatusRope current={activeIndex} data={STATUS_ROPE_DATA} />
      <Well className="flex items-center p-2 sm:p-2">
        <div className="mr-2 flex items-center space-x-1">
          <Button
            iconBefore={ArrowLeftIcon}
            soft
            look="faint"
            size="small"
            disabled={activeIndex === 0}
            onClick={() => setActiveIndex(state => state - 1)}
          >
            prev
          </Button>{' '}
          <Button
            iconAfter={ArrowRightIcon}
            soft
            look="faint"
            size="small"
            disabled={activeIndex === 4}
            onClick={() => setActiveIndex(state => state + 1)}
          >
            next
          </Button>
        </div>
        <code className="flex">Current: {activeIndex}</code>
      </Well>
    </div>
  );
};
