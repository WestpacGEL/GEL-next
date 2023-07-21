import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Badge } from './badge.component.js';

const COLORS = ['danger', 'faint', 'hero', 'info', 'neutral', 'primary', 'success', 'warning'];
const INVERTED_COLORS = [
  'danger-inverted',
  'faint-inverted',
  'hero-inverted',
  'info-inverted',
  'neutral-inverted',
  'primary-inverted',
  'success-inverted',
  'warning-inverted',
];

const meta: Meta<typeof Badge> = {
  title: 'Example/Badge',
  component: Badge,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex items-center justify-center p-2">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'center',
  },
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
export const DefaultStory: Story = {
  args: {
    children: 'test',
    type: 'default',
  },
};

/**
 * > Default usage example
 */
export const PillStory: Story = {
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
        <Badge color={color as any}>{color}</Badge>
      ))}
    </div>
    <div className="flex gap-2">
      {COLORS.map(color => (
        <Badge color={color as any} type="pill">
          {color}
        </Badge>
      ))}
    </div>
    <h3 className="typography-body-9 font-bold">Inverted</h3>
    <div className="flex flex-col gap-2 bg-muted p-2">
      <div className="flex flex-wrap gap-2">
        {INVERTED_COLORS.map(color => (
          <Badge color={color as any}>{color}</Badge>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {INVERTED_COLORS.map(color => (
          <Badge color={color as any} type="pill">
            {color}
          </Badge>
        ))}
      </div>
    </div>
  </div>
);
