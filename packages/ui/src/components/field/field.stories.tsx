import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Input, Select } from '../index.js';

import { Field } from './field.component.js';

const meta: Meta<typeof Field> = {
  title: 'Foundation/Field',
  component: Field,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {},
  render: () => {
    return (
      <Field
        label="Are you an existing customer?"
        hintMessage="Hint: choose from one of the following options"
        errorMessage="This is an inline error message"
      >
        <Input />
      </Field>
    );
  },
};

/**
 * > Select usage example
 */
export const SelectStory: Story = {
  args: {},
  render: () => {
    return (
      <Field
        label="Are you an existing customer?"
        hintMessage="Hint: choose from one of the following options"
        errorMessage="This is an inline error message"
      >
        <Select />
      </Field>
    );
  },
};
