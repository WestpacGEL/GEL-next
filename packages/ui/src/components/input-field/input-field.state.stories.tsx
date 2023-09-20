import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { SearchIcon } from '../icon/index.js';
import { Button, Input, Select } from '../index.js';

import { InputField } from './input-field.component.js';

const meta: Meta<typeof InputField> = {
  title: 'Example/InputField/State',
  component: InputField,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'padded',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Invalid with error message/s
 */
export const InvalidWithErrorMessagesStory: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage="If there is an error it can go here"
          after={<Button>Check</Button>}
        >
          <Input invalid />
        </InputField>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage={['If there is an error it can go here', 'If there is another error it can go here']}
          after={<Button>Check</Button>}
          before={<Button>Check</Button>}
        >
          <Input invalid />
        </InputField>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage="If there is an error it can go here"
          after={{ icon: SearchIcon }}
          before={{ icon: SearchIcon }}
        >
          <Input invalid />
        </InputField>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage="If there is an error it can go here"
          after="Text"
          before="Text"
        >
          <Input invalid />
        </InputField>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage="If there is an error it can go here"
          after={
            <Select invalid>
              <option>Select</option>
            </Select>
          }
          before={
            <Select invalid>
              <option>Select</option>
            </Select>
          }
        >
          <Input invalid />
        </InputField>
      </>
    );
  },
};

/**
 * > Input field with disabled state
 */
export const InputFieldWithDisabledStateStory: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ icon: SearchIcon }}
          before={{ icon: SearchIcon }}
        >
          <Input disabled />
        </InputField>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          before="$AUD"
          after="Text"
        >
          <Input disabled />
        </InputField>
      </>
    );
  },
};

/**
 * > Input field with read-only state
 */
export const InputFieldWithReadOnlyStateStory: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ icon: SearchIcon }}
          before={{ icon: SearchIcon }}
        >
          <Input readOnly />
        </InputField>
        <InputField
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          before="$AUD"
          after="Text"
        >
          <Input readOnly />
        </InputField>
      </>
    );
  },
};
