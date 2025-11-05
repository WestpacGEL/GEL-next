import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Button, Link } from '../index.js';

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
const SIZES = ['xlarge', 'large', 'medium', 'small'] as const;

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
      <div key={color} className="flex items-center">
        <Link type="inline" href="#">
          Product feature
        </Link>
        <Badge color={color} type="pill" className="ml-1">
          NEW
        </Badge>
      </div>
    ))}
  </div>
);

/**
 * > Example on buttons
 */
export const Buttons = () => (
  <div className="flex flex-col gap-2">
    <div className="flex gap-2">
      {SIZES.map(size => (
        <Button key={size} color="primary" size={size}>
          <div className="flex w-max items-center">
            Label
            <Badge type="default" color="faint" className="ml-1">
              NEW
            </Badge>{' '}
          </div>
        </Button>
      ))}
    </div>
    <div className="flex gap-2">
      {SIZES.map(size => (
        <Button key={size} color="primary" size={size}>
          <div className="flex w-max items-center">
            <Badge type="default" color="faint" className="mr-1">
              NEW
            </Badge>{' '}
            Label
          </div>
        </Button>
      ))}
    </div>
    <h3 className="typography-body-9 font-bold">Pill badge</h3>
    <div className="flex gap-2">
      {SIZES.map(size => (
        <Button key={size} look="primary" size={size}>
          <div className="flex w-max items-center">
            Label
            <Badge color="danger-inverted" type="pill" className="ml-1">
              88
            </Badge>
          </div>
        </Button>
      ))}
    </div>
    <div className="flex gap-2">
      {SIZES.map(size => (
        <Button key={size} look="primary" size={size}>
          <div className="flex w-max items-center">
            <Badge color="danger-inverted" type="pill" className="mr-1">
              88
            </Badge>
            Label
          </div>
        </Button>
      ))}
    </div>
  </div>
);
