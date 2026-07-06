import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Input, Select } from '../index.js';

import { Field } from './field.component.js';

/**
 * Field component provides label, hint message and error message to form components such as Select, Input etc.
 */
const meta: Meta<typeof Field> = {
  title: 'Foundation/Field',
  component: Field,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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
 * > Error title with list of errors
 */
export const ErrorTitleStory: Story = {
  args: {},
  render: () => {
    return (
      <Field
        label="Contact Details"
        hintMessage="Please enter your personal information below"
        errorTitle="Please fix the following errors:"
        errorMessage={['First name is required', 'Last name is required', 'Email is required']}
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
        <Select>
          <option value="1">Yes</option>
          <option value="2">No</option>
        </Select>
      </Field>
    );
  },
};
