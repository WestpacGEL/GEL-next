import { type Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';
import { Button, Well } from '../index.js';

import { StatusRopeProps } from './progress-rope.types.js';
import { StatusRope } from './status-rope.component.js';

const meta: Meta<typeof StatusRope> = {
  title: 'Components/StatusRope',
  component: StatusRope,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  argTypes: {
    current: {
      control: 'number',
      description: 'Current active step (zero-indexed)',
      table: { defaultValue: { summary: '0' } },
    },
    data: {
      control: 'object',
      description: 'Steps passed into the status rope',
      table: {
        type: {
          summary: 'Array<StatusStep | StatusStepGroup>',
          detail: `(
  | StatusRopeStepItem
  | {
      steps: StatusRopeStepItem[];
      text: ReactNode;
      type: 'group';
    }
)[]`,
        },
      },
    },
  },
};

export default meta;

const STATUS_ROPE_DATA: StatusRopeProps['data'] = [
  {
    type: 'group',
    text: 'About you',
    steps: [
      { text: 'Personal details', description: 'Your name and date of birth' },
      { text: 'Contact details', description: 'Your phone, email and address' },
    ],
  },
  {
    type: 'group',
    text: 'Your finances',
    steps: [
      { text: 'Income', description: 'Your regular sources of income' },
      { text: 'Expenses', description: 'Your regular living expenses' },
    ],
  },
  { text: 'Review and submit', description: 'Check the information you provided' },
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
            iconAfter={ArrowRightIcon}
            soft
            look="faint"
            size="small"
            disabled={activeIndex === 5}
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

const STATUS_ROPE_STEPS_DATA: StatusRopeProps['data'] = [
  { text: 'Application received', description: 'We have received your application' },
  { text: 'Identity check', description: 'Your identity has been confirmed' },
  { text: 'Financial review', description: 'We are reviewing your information' },
  { text: 'Final assessment', description: 'Your application is being assessed' },
  { text: 'Decision', description: 'We will notify you when a decision is available' },
];

/**
 * > Status rope with ungrouped steps usage example
 */
export const StatusRopeSteps = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <StatusRope current={activeIndex} data={STATUS_ROPE_STEPS_DATA} />
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
            disabled={activeIndex === 5}
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
