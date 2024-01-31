/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { CheckboxGroup } from './checkbox-group.component.js';

const meta: Meta<typeof CheckboxGroup> = {
  title: 'Components/CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex">
        <Story />
      </div>
    ),
  ],
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
export const Default: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      { value: 'Option 3', children: 'Option 3' },
    ],
  },
};

/**
 * > Default usage example
 */
export const LongLines: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      {
        value: 'Option 3',
        children:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et odit labore illo sint tempora magnam modi nesciunt consectetur vitae maiores itaque reiciendis sunt nisi ullam officiis, provident fugiat, esse iste adipisci repellat! Incidunt delectus, pariatur quaerat vitae aspernatur eveniet libero.',
      },
    ],
  },
};

/**
 * > CheckboxGroup with default value
 */
export const DefaultValue: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      { value: 'Option 3', children: 'Option 3' },
    ],
    defaultValue: ['Option 1'],
  },
};

/**
 * > CheckboxGroup with checkboxes aligned horizontally
 */
export const Inline: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      { value: 'Option 3', children: 'Option 3' },
    ],
    orientation: 'horizontal',
  },
};

/**
 * > Horizontal long lines
 */
export const InlineLongLines: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      {
        value: 'Option 3',
        children:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et odit labore illo sint tempora magnam modi nesciunt consectetur vitae maiores itaque reiciendis sunt nisi ullam officiis, provident fugiat, esse iste adipisci repellat! Incidunt delectus, pariatur quaerat vitae aspernatur eveniet libero.',
      },
    ],
    orientation: 'horizontal',
  },
};

/**
 * > CheckboxGroup that is disabled
 */
export const Disabled: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      { value: 'Option 3', children: 'Option 3' },
    ],
    isDisabled: true,
    defaultValue: ['Option 1'],
  },
};

/**
 * > CheckboxGroup with large checkboxes
 */
export const Large: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      { value: 'Option 3', children: 'Option 3' },
    ],
    size: 'large',
  },
};

/**
 * > CheckboxGroup that has hidden checkboxes that will be revealed on clicking on button
 */
export const HiddenItems: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      { value: 'Option 3', children: 'Option 3' },
    ],
    showAmount: 1,
  },
};

/**
 * > Hint text
 */
export const HintText: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1', hint: 'This is hint text 1' },
      { value: 'Option 2', children: 'Option 2', hint: 'This is hint text 2' },
      { value: 'Option 3', children: 'Option 3', hint: 'This is hint text 3' },
    ],
  },
};

/**
 * > On change (check console log)
 */
export const OnChange: Story = {
  args: {
    checkboxes: [
      { value: 'Option 1', children: 'Option 1', hint: 'This is hint text 1' },
      { value: 'Option 2', children: 'Option 2', hint: 'This is hint text 2' },
      { value: 'Option 3', children: 'Option 3', hint: 'This is hint text 3' },
    ],
    onChange: e => console.log(e),
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
    checkboxes: [
      { value: 'Option 1', children: 'Option 1' },
      { value: 'Option 2', children: 'Option 2' },
      { value: 'Option 3', children: 'Option 3' },
    ],
  },
};
