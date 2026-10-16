import { type Meta, StoryFn } from '@storybook/react-vite';
import { useState } from 'react';

import { ArrowLeftIcon, ArrowRightIcon } from '../icon/index.js';
import { Badge, Button, Well } from '../index.js';

import { StatusRope } from './status-rope.component.js';
import { StatusRopeProps } from './status-rope.types.js';

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
    text: 'Group',
    steps: [
      {
        text: 'Step',
        description: (
          <div className="flex flex-col gap-1">
            <>Description content goes here, there could be quite a lot of copy that wraps.</>
            <Badge color={'muted'}>Label</Badge>
          </div>
        ),
      },
      {
        text: 'Step',
        description: (
          <div className="flex flex-col gap-1">
            <>Description content goes here, there could be quite a lot of copy that wraps.</>
            <Badge color={'muted'}>Label</Badge>
          </div>
        ),
      },
    ],
  },
  {
    type: 'group',
    text: 'Group',
    steps: [
      {
        text: 'Step',
        description: (
          <div className="flex flex-col gap-1">
            <>Description content goes here, there could be quite a lot of copy that wraps.</>
            <Badge color={'muted'}>Label</Badge>
          </div>
        ),
      },
      {
        text: 'Step',
        description: (
          <div className="flex flex-col gap-1">
            <>Description content goes here, there could be quite a lot of copy that wraps.</>
            <Badge color={'muted'}>Label</Badge>
          </div>
        ),
      },
    ],
  },
  {
    text: 'Final step',
    description: (
      <div className="flex flex-col gap-1">
        <>Description content goes here, there could be quite a lot of copy that wraps.</>
        <Badge color={'muted'}>Label</Badge>
      </div>
    ),
  },
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
  {
    text: 'Step',
    description: (
      <div className="flex flex-col gap-1">
        <>Description content goes here, there could be quite a lot of copy that wraps.</>
        <Badge color={'muted'}>Label</Badge>
      </div>
    ),
  },
  {
    text: 'Step',
    description: (
      <div className="flex flex-col gap-1">
        <>Description content goes here, there could be quite a lot of copy that wraps.</>
        <Badge color={'muted'}>Label</Badge>
      </div>
    ),
  },
  {
    text: 'Step',
    description: (
      <div className="flex flex-col gap-1">
        <>Description content goes here, there could be quite a lot of copy that wraps.</>
        <Badge color={'muted'}>Label</Badge>
      </div>
    ),
  },
  {
    text: 'Step',
    description: (
      <div className="flex flex-col gap-1">
        <>Description content goes here, there could be quite a lot of copy that wraps.</>
        <Badge color={'muted'}>Label</Badge>
      </div>
    ),
  },
  {
    text: 'Step',
    description: (
      <div className="flex flex-col gap-1">
        <>Description content goes here, there could be quite a lot of copy that wraps.</>
        <Badge color={'muted'}>Label</Badge>
      </div>
    ),
  },
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
