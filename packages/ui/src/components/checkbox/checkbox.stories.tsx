import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Checkbox } from './checkbox.component.js';

const meta: Meta<typeof Checkbox> = {
  title: 'Example/Checkbox',
  component: Checkbox,
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
        "Controls orientation of `CheckboxItem` components, can't be applied directly on `CheckboxItem` \n\n `'horizontal'` `'vertical'`",
      type: { name: 'enum', value: ['horizontal', 'vertical'] },
    },
    isDisabled: {
      description: 'Controls whether all checkbox items are disabled or not',
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
export const DefaultStory: Story = {
  args: {
    children: [
      <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 3">Option 3</Checkbox.CheckboxItem>,
    ],
  },
};

/**
 * > Checkbox with default value
 */
export const CheckboxWithDefaultValue: Story = {
  args: {
    children: [
      <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 3">Option 3</Checkbox.CheckboxItem>,
    ],
    defaultValue: ['Option 1'],
  },
};

/**
 * > Checkbox with options aligned horizontally
 */
export const CheckboxHorizontal: Story = {
  args: {
    children: [
      <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 3">Option 3</Checkbox.CheckboxItem>,
    ],
    orientation: 'horizontal',
  },
};

/**
 * > Checkbox that is disabled
 */
export const CheckboxDisabled: Story = {
  args: {
    children: [
      <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 3">Option 3</Checkbox.CheckboxItem>,
    ],
    isDisabled: true,
  },
};

/**
 * > Checkbox with large options
 */
export const CheckboxLarge: Story = {
  args: {
    children: [
      <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 3">Option 3</Checkbox.CheckboxItem>,
    ],
    size: 'large',
  },
};

/**
 * > Checkbox that has hidden options that will be revealed on clicking on button
 */
export const CheckboxWithHiddenItems: Story = {
  args: {
    children: [
      <Checkbox.CheckboxItem value="Option 1">Option 1</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 2">Option 2</Checkbox.CheckboxItem>,
      <Checkbox.CheckboxItem value="Option 3">Option 3</Checkbox.CheckboxItem>,
    ],
    showAmount: 1,
  },
};
