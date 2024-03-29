import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Button } from '../index.js';

import { Badge } from './badge.component.js';

const COLORS = ['danger', 'faint', 'hero', 'info', 'neutral', 'muted', 'primary', 'success', 'warning'] as const;
const INVERTED_COLORS = [
  'danger-inverted',
  'faint-inverted',
  'hero-inverted',
  'info-inverted',
  'neutral-inverted',
  'primary-inverted',
  'success-inverted',
  'warning-inverted',
] as const;

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex p-2">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    children: {
      description: 'Children',
      type: { name: 'string' },
    },
    color: {
      description: 'Color',
      type: { name: 'enum', value: [...COLORS, ...INVERTED_COLORS] },
    },
    type: {
      description: 'Type',
      type: { name: 'enum', value: ['pill', 'default'] },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: 'test',
    type: 'default',
  },
};

/**
 * > Default usage example
 */
export const Pill: Story = {
  args: {
    children: 'test',
    type: 'pill',
  },
};

/**
 * > Different colors
 */
export const Colors = () => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      {COLORS.map(color => (
        <Badge key={color} color={color}>
          {color}
        </Badge>
      ))}
    </div>
    <div className="flex gap-2">
      {COLORS.map(color => (
        <Badge key={color} color={color} type="pill">
          {color}
        </Badge>
      ))}
    </div>
    <h3 className="typography-body-9 font-bold">Inverted</h3>
    <div className="flex flex-col gap-2 bg-muted p-2">
      <div className="flex flex-wrap gap-2">
        {INVERTED_COLORS.map(color => (
          <Badge key={color} color={color}>
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {INVERTED_COLORS.map(color => (
          <Badge key={color} color={color} type="pill">
            {color}
          </Badge>
        ))}
      </div>
    </div>
  </div>
);

export const Soft = () => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      {COLORS.map(color => (
        <Badge key={color} color={color} soft>
          {color}
        </Badge>
      ))}
    </div>
    <div className="flex gap-2">
      {COLORS.map(color => (
        <Badge key={color} color={color} type="pill" soft>
          {color}
        </Badge>
      ))}
    </div>
  </div>
);

/**
 * > Example next to link
 */
export const Links = () => (
  <div className="flex flex-col gap-2">
    {COLORS.map(color => (
      <a key={color} className="text-link underline" href="#">
        {color}
        <Badge color={color} type="pill" className="ml-1">
          12
        </Badge>
      </a>
    ))}
  </div>
);

/**
 * > Example next to link
 */
export const Buttons = () => (
  <div className="flex flex-col gap-2">
    {INVERTED_COLORS.map(color => (
      <Button key={color} look="primary">
        Primary
        <Badge color={color} type="pill" className="ml-1">
          {color}
        </Badge>
      </Button>
    ))}
  </div>
);
