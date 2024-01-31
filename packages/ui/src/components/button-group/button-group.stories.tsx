import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { ButtonGroup } from './button-group.component.js';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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

const LOOKS = ['primary', 'hero'] as const;
const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    buttons: [
      {
        value: 'Option 1',
        label: 'Option 1',
      },
      {
        value: 'Option 2',
        label: 'Option 2',
      },
      {
        value: 'Option 3',
        label: 'Option 3',
      },
    ],
  },
};

/**
 * Button group looks
 */
export const Colors = () => (
  <div className="flex flex-col gap-2">
    {LOOKS.map(look => (
      <ButtonGroup
        label={<h3 className="font-bold">{look}</h3>}
        look={look}
        buttons={[
          {
            value: 'Option 1',
            label: 'Option 1',
          },
          {
            value: 'Option 2',
            label: 'Option 2',
          },
          {
            value: 'Option 3',
            label: 'Option 3',
          },
        ]}
      />
    ))}
  </div>
);

/**
 * Button group sizes
 */
export const Sizes = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map(size => (
      <ButtonGroup
        label={<h3 className="font-bold">{size}</h3>}
        size={size}
        buttons={[
          {
            value: 'Option 1',
            label: 'Option 1',
          },
          {
            value: 'Option 2',
            label: 'Option 2',
          },
          {
            value: 'Option 3',
            label: 'Option 3',
          },
        ]}
      />
    ))}
  </div>
);

/**
 * Button group responsive sizing
 */
export const ResponsiveSize: Story = {
  args: {
    buttons: [
      {
        value: 'Option 1',
        label: 'Option 1',
      },
      {
        value: 'Option 2',
        label: 'Option 2',
      },
      {
        value: 'Option 3',
        label: 'Option 3',
      },
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
    {SIZES.map(size => (
      <ButtonGroup
        block
        label={<h3 className="font-bold">{size}</h3>}
        size={size}
        buttons={[
          {
            value: 'Option 1',
            label: 'Option 1',
          },
          {
            value: 'Option 2',
            label: 'Option 2',
          },
          {
            value: 'Option 3',
            label: 'Option 3',
          },
        ]}
      />
    ))}
  </div>
);

/**
 * Disabled button group
 */
export const Disabled: Story = {
  args: {
    buttons: [
      {
        value: 'Option 1',
        label: 'Option 1',
      },
      {
        value: 'Option 2',
        label: 'Option 2',
      },
      {
        value: 'Option 3',
        label: 'Option 3',
      },
    ],
    isDisabled: true,
  },
};

/**
 * Error message and label
 */
export const ErrorMessageAndLabel: Story = {
  args: {
    label: 'Are you an existing customer?',
    errorMessage: 'This is an inline error message',
    validationState: 'invalid',
    hintMessage: 'Hint: choose from one of the following options',
    buttons: [
      {
        value: 'Option 1',
        label: 'Option 1',
      },
      {
        value: 'Option 2',
        label: 'Option 2',
      },
      {
        value: 'Option 3',
        label: 'Option 3',
      },
    ],
  },
};
