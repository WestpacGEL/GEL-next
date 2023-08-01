import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Radio } from './radio.component.js';

const meta: Meta<typeof Radio> = {
  title: 'Example/Radio',
  component: Radio,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'center',
  },
  args: {
    label: <h2>Test</h2>,
  },
  argTypes: {
    orientation: {
      description:
        "Controls orientation of `Option` components, can't be applied directly on `Option` \n\n `'horizontal'` `'vertical'`",
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
      <Radio.Option value="Option 1">Option 1</Radio.Option>,
      <Radio.Option value="Option 2">Option 2</Radio.Option>,
      <Radio.Option value="Option 3">Option 3</Radio.Option>,
    ],
  },
};

/**
 * > Radio with default value
 */
export const RadioWithDefaultValue: Story = {
  args: {
    children: [
      <Radio.Option value="Option 1">Option 1</Radio.Option>,
      <Radio.Option value="Option 2">Option 2</Radio.Option>,
      <Radio.Option value="Option 3">Option 3</Radio.Option>,
    ],
    defaultValue: 'Option 1',
  },
};

/**
 * > Radio with options aligned horizontally
 */
export const RadioHorizontal: Story = {
  args: {
    children: [
      <Radio.Option value="Option 1">Option 1</Radio.Option>,
      <Radio.Option value="Option 2">Option 2</Radio.Option>,
      <Radio.Option value="Option 3">Option 3</Radio.Option>,
    ],
    orientation: 'horizontal',
  },
};

/**
 * > Radio that is disabled
 */
export const RadioDisabled: Story = {
  args: {
    children: [
      <Radio.Option value="Option 1">Option 1</Radio.Option>,
      <Radio.Option value="Option 2">Option 2</Radio.Option>,
      <Radio.Option value="Option 3">Option 3</Radio.Option>,
    ],
    isDisabled: true,
  },
};

/**
 * > Radio with large options
 */
export const RadioLarge: Story = {
  args: {
    children: [
      <Radio.Option value="Option 1">Option 1</Radio.Option>,
      <Radio.Option value="Option 2">Option 2</Radio.Option>,
      <Radio.Option value="Option 3">Option 3</Radio.Option>,
    ],
    size: 'large',
  },
};

/**
 * > Radio that has hidden options that will be revealed on clicking on button
 */
export const RadioWithHiddenOptions: Story = {
  args: {
    children: [
      <Radio.Option value="Option 1">Option 1</Radio.Option>,
      <Radio.Option value="Option 2">Option 2</Radio.Option>,
      <Radio.Option value="Option 3">Option 3</Radio.Option>,
    ],
    showAmount: 1,
  },
};
