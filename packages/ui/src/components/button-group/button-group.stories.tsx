import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { ButtonGroup } from './button-group.component.js';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    isDisabled: {
      description: 'Controls whether all radio options are disabled or not',
      type: { name: 'boolean' },
    },
    label: {
      description:
        'Not part of original GEL component but added for compatability with React Aria and accessibility. Styling can be done by passing tag with className as value.',
    },
    size: {
      description:
        'Controls size of buttons, can use any size the regular GEL Next Button components use or responsive sizing',
    },
  },
  args: {
    label: 'Test Label',
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const LOOKS = ['primary', 'hero'];
const SIZES = ['small', 'medium', 'large', 'xlarge'];

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: [
      <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>,
      <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>,
      <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>,
    ],
  },
};

/**
 * Button group looks
 */
export const Colors = () => (
  <div className="flex flex-col gap-2">
    {LOOKS.map((look: any) => (
      <ButtonGroup label={<h3 className="font-bold">{look}</h3>} look={look}>
        <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
      </ButtonGroup>
    ))}
  </div>
);

/**
 * Button group sizes
 */
export const Sizes = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map((size: any) => (
      <ButtonGroup label={<h3 className="font-bold">{size}</h3>} size={size}>
        <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
      </ButtonGroup>
    ))}
  </div>
);

/**
 * Button group responsive sizing
 */
export const ResponsiveSize: Story = {
  args: {
    children: [
      <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>,
      <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>,
      <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>,
    ],
    size: {
      initial: 'small',
      md: 'large',
      lg: 'xlarge',
    },
  },
};

/**
 * Button group block
 */
export const Block = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map((size: any) => (
      <ButtonGroup block label={<h3 className="font-bold">{size}</h3>} size={size}>
        <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>
        <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>
      </ButtonGroup>
    ))}
  </div>
);

/**
 * Disabled button group
 */
export const Disabled: Story = {
  args: {
    children: [
      <ButtonGroup.Button value="Option 1">Option 1</ButtonGroup.Button>,
      <ButtonGroup.Button value="Option 2">Option 2</ButtonGroup.Button>,
      <ButtonGroup.Button value="Option 3">Option 3</ButtonGroup.Button>,
    ],
    isDisabled: true,
  },
};
