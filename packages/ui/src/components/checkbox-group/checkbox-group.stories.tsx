import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { CheckboxGroup } from './checkbox-group.component.js';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Example/CheckboxGroup',
  component: CheckboxGroup,
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
        "Controls orientation of `Checkbox` components, can't be applied directly on `Checkbox` \n\n `'horizontal'` `'vertical'`",
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
      <CheckboxGroup.Checkbox value="Option 1">Option 1</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 2">Option 2</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 3">Option 3</CheckboxGroup.Checkbox>,
    ],
  },
};

/**
 * > CheckboxGroup with default value
 */
export const CheckboxGroupWithDefaultValue: Story = {
  args: {
    children: [
      <CheckboxGroup.Checkbox value="Option 1">Option 1</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 2">Option 2</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 3">Option 3</CheckboxGroup.Checkbox>,
    ],
    defaultValue: ['Option 1'],
  },
};

/**
 * > CheckboxGroup with checkboxes aligned horizontally
 */
export const CheckboxGroupHorizontal: Story = {
  args: {
    children: [
      <CheckboxGroup.Checkbox value="Option 1">Option 1</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 2">Option 2</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 3">Option 3</CheckboxGroup.Checkbox>,
    ],
    orientation: 'horizontal',
  },
};

/**
 * > CheckboxGroup that is disabled
 */
export const CheckboxGroupDisabled: Story = {
  args: {
    children: [
      <CheckboxGroup.Checkbox value="Option 1">Option 1</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 2">Option 2</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 3">Option 3</CheckboxGroup.Checkbox>,
    ],
    isDisabled: true,
    defaultValue: ['Option 1'],
  },
};

/**
 * > CheckboxGroup with large checkboxes
 */
export const CheckboxGroupLarge: Story = {
  args: {
    children: [
      <CheckboxGroup.Checkbox value="Option 1">Option 1</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 2">Option 2</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 3">Option 3</CheckboxGroup.Checkbox>,
    ],
    size: 'large',
  },
};

/**
 * > CheckboxGroup that has hidden checkboxes that will be revealed on clicking on button
 */
export const CheckboxGroupWithHiddenItems: Story = {
  args: {
    children: [
      <CheckboxGroup.Checkbox value="Option 1">Option 1</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 2">Option 2</CheckboxGroup.Checkbox>,
      <CheckboxGroup.Checkbox value="Option 3">Option 3</CheckboxGroup.Checkbox>,
    ],
    showAmount: 1,
  },
};
