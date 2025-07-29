import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { SearchIcon } from '../icon/index.js';
import { Button, Input, Select } from '../index.js';

import { InputGroup } from './input-group.component.js';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup/State',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Invalid with error message/s
 */
export const InvalidWithErrorMessages: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage="If there is an error it can go here"
          after={<Button>Check</Button>}
        >
          <Input invalid />
        </InputGroup>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage={['If there is an error it can go here', 'If there is another error it can go here']}
          after={<Button>Check</Button>}
          before={<Button>Check</Button>}
        >
          <Input invalid />
        </InputGroup>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage="If there is an error it can go here"
          after={{ icon: SearchIcon }}
          before={{ icon: SearchIcon }}
        >
          <Input invalid />
        </InputGroup>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          errorMessage="If there is an error it can go here"
          after="Text"
          before="Text"
        >
          <Input invalid />
        </InputGroup>
        <InputGroup
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
        </InputGroup>
      </>
    );
  },
};

/**
 * > Input field with disabled state
 */
export const InputGroupWithDisabledState: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ icon: SearchIcon }}
          before={{ icon: SearchIcon }}
        >
          <Input disabled />
        </InputGroup>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          before="$AUD"
          after="Text"
        >
          <Input disabled />
        </InputGroup>
      </>
    );
  },
};

/**
 * > Input field with read-only state
 */
export const InputGroupWithReadOnlyState: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ icon: SearchIcon }}
          before={{ icon: SearchIcon }}
        >
          <Input readOnly />
        </InputGroup>
        <InputGroup
          label="Text after"
          hint="I am a hint"
          supportingText="I am supporting text"
          before="$AUD"
          after="Text"
        >
          <Input readOnly />
        </InputGroup>
      </>
    );
  },
};
