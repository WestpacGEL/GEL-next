import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { Button, Input, RadioGroup, Select } from '../index.js';

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

const contactOptions = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone' },
];

function AnnounceErrorExample() {
  const [error, setError] = useState<string>();
  const [contactPreference, setContactPreference] = useState<string | null>(null);
  const [contactValidated, setContactValidated] = useState(false);
  const contactError = contactValidated && !contactPreference ? 'Choose a contact preference' : undefined;

  return (
    <div className="flex flex-col gap-4">
      <Field
        label="First name"
        hintMessage="Leave this field empty and tab to Last name to trigger an error."
        errorMessage={error}
        announceError={false}
      >
        <Input
          required
          invalid={Boolean(error)}
          onBlur={event => setError(event.target.value.trim() ? undefined : 'Enter your first name')}
        />
      </Field>
      <Field label="Last name">
        <Input />
      </Field>
      <RadioGroup
        label="Contact preference"
        hintMessage="Leave unselected and choose Validate contact preference. Select an option to clear the error."
        radios={contactOptions}
        value={contactPreference}
        onChange={setContactPreference}
        isRequired
        isInvalid={Boolean(contactError)}
        errorMessage={contactError}
        announceError={false}
      />
      <div className="flex flex-wrap gap-2">
        <Button type="button" onClick={() => setContactValidated(true)}>
          Validate contact preference
        </Button>
        <Button
          type="button"
          look="faint"
          onClick={() => {
            setContactPreference(null);
            setContactValidated(false);
          }}
        >
          Reset contact preference
        </Button>
      </div>
    </div>
  );
}

/**
 * > Opt-in announcements use the visible error, without a hidden duplicate. Tab out of First name to validate.
 * > Validate the unselected Contact preference group to announce its error without moving focus to a radio.
 * > Select Email or Phone to clear the error; reset the group to repeat the check.
 * > Keep announceError enabled before errors appear. Initial errors and unchanged messages may not be announced.
 * > Focus announcements can overlap with live announcements; test with the screen readers your app supports.
 */
export const AnnounceErrorStory: Story = {
  render: () => <AnnounceErrorExample />,
};

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
