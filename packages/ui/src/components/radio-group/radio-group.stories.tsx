/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { RadioGroup } from './radio-group.component.js';

import { RadioGroupRadio } from './index.js';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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
export const Default: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
    ],
  },
};

/**
 * > Default with long content
 */
export const LongLines: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et odit labore illo sint tempora magnam modi nesciunt
        consectetur vitae maiores itaque reiciendis sunt nisi ullam officiis, provident fugiat, esse iste adipisci
        repellat! Incidunt delectus, pariatur quaerat vitae aspernatur eveniet libero.
      </RadioGroupRadio>,
    ],
  },
};

/**
 * > RadioGroup with default value
 */
export const DefaultValue: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
    ],
    defaultValue: 'Option 1',
  },
};

/**
 * > RadioGroup with radios aligned horizontally
 */
export const Inline: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
    ],
    orientation: 'horizontal',
  },
};

/**
 * > RadioGroup with radios aligned horizontally with long content
 */
export const InlineLongLines: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et odit labore illo sint tempora magnam modi nesciunt
        consectetur vitae maiores itaque reiciendis sunt nisi ullam officiis, provident fugiat, esse iste adipisci
        repellat! Incidunt delectus, pariatur quaerat vitae aspernatur eveniet libero.
      </RadioGroupRadio>,
    ],
    orientation: 'horizontal',
  },
};

/**
 * > RadioGroup that is disabled
 */
export const Disabled: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
    ],
    isDisabled: true,
  },
};

/**
 * > RadioGroup with large radios
 */
export const Large: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
    ],
    size: 'large',
  },
};

/**
 * > RadioGroup that has hidden radios that will be revealed on clicking on button
 */
export const HiddenOptions: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
    ],
    showAmount: 1,
  },
};

/**
 * > Example with hint text
 */
export const HintText: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1" hint="This is a hint">
        Option 1
      </RadioGroupRadio>,
      <RadioGroupRadio value="Option 2" hint="This is a hint">
        Option 2
      </RadioGroupRadio>,
      <RadioGroupRadio value="Option 3" hint="This is a hint">
        Option 3
      </RadioGroupRadio>,
    ],
  },
};

/**
 * > On change (check console log)
 */
export const OnChange: Story = {
  args: {
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
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
    children: [
      <RadioGroupRadio value="Option 1">Option 1</RadioGroupRadio>,
      <RadioGroupRadio value="Option 2">Option 2</RadioGroupRadio>,
      <RadioGroupRadio value="Option 3">Option 3</RadioGroupRadio>,
    ],
  },
};
