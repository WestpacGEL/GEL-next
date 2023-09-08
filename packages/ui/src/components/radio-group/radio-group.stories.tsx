import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { RadioGroup } from './radio-group.component.js';

const meta: Meta<typeof RadioGroup> = {
  title: 'Example/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    label: <h2>Test</h2>,
  },
  argTypes: {
    orientation: {
      description:
        "Controls orientation of `Radio` components, can't be applied directly on `Radio` \n\n `'horizontal'` `'vertical'`",
      type: { name: 'enum', value: ['horizontal', 'vertical'] },
    },
    isDisabled: {
      description: 'Controls whether all radio options are disabled or not',
      type: { name: 'boolean' },
    },
    label: {
      description:
        'Not part of original GEL component but added for compatability with React Aria and accessibility. Styling can be done by passing tag with className as value.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultRadio: Story = {
  args: {
    children: [
      <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 3">Option 3</RadioGroup.Radio>,
    ],
  },
};

/**
 * > RadioGroup with default value
 */
export const RadioWithDefaultValue: Story = {
  args: {
    children: [
      <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 3">Option 3</RadioGroup.Radio>,
    ],
    defaultValue: 'Option 1',
  },
};

/**
 * > RadioGroup with radios aligned horizontally
 */
export const RadioHorizontal: Story = {
  args: {
    children: [
      <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 3">Option 3</RadioGroup.Radio>,
    ],
    orientation: 'horizontal',
  },
};

/**
 * > RadioGroup that is disabled
 */
export const RadioDisabled: Story = {
  args: {
    children: [
      <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 3">Option 3</RadioGroup.Radio>,
    ],
    isDisabled: true,
  },
};

/**
 * > RadioGroup with large radios
 */
export const RadioLarge: Story = {
  args: {
    children: [
      <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 3">Option 3</RadioGroup.Radio>,
    ],
    size: 'large',
  },
};

/**
 * > RadioGroup that has hidden radios that will be revealed on clicking on button
 */
export const RadioWithHiddenOptions: Story = {
  args: {
    children: [
      <RadioGroup.Radio value="Option 1">Option 1</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 2">Option 2</RadioGroup.Radio>,
      <RadioGroup.Radio value="Option 3">Option 3</RadioGroup.Radio>,
    ],
    showAmount: 1,
  },
};
