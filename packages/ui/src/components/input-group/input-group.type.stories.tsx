import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { SearchIcon, VisibilityIcon } from '../icon/index.js';
import { Button, Input, Select, Textarea } from '../index.js';

import { InputGroup } from './input-group.component.js';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup/Types',
  component: InputGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Text Beforoe story example
 */
export const TextBeforeStory: Story = {
  args: {},
  render: () => {
    return (
      <InputGroup label="Text before" hint="I am a hint" supportingText="I am supporting text" before="$AUD">
        <Input />
      </InputGroup>
    );
  },
};

/**
 * > Text Beforoe story example
 */
export const TextAfter: Story = {
  args: {},
  render: () => {
    return (
      <InputGroup label="Text after" hint="I am a hint" supportingText="I am supporting text" after="Text">
        <Input />
      </InputGroup>
    );
  },
};

/**
 * > Text After and Beforoe story example
 */
export const TextAfterAndBefore: Story = {
  args: {},
  render: () => {
    return (
      <InputGroup
        label="Text after"
        hint="I am a hint"
        supportingText="I am supporting text"
        before="$AUD"
        after="Text"
      >
        <Input />
      </InputGroup>
    );
  },
};

/**
 * > Textarea
 */
export const IconAddOn: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputGroup
          label="Icon before"
          hint="I am a hint"
          supportingText="I am supporting text"
          before={{ icon: SearchIcon }}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Icon after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ icon: SearchIcon }}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Icon after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ icon: SearchIcon }}
          before={{ icon: SearchIcon }}
        >
          <Input />
        </InputGroup>
      </>
    );
  },
};

/**
 * > Icons in buttons
 */
export const IconInButtonsOn: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputGroup
          label="Icon button before"
          hint="I am a hint"
          supportingText="I am supporting text"
          before={{ inset: true, element: <Button look="link" iconAfter={VisibilityIcon} iconColor="muted" /> }}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Icon button after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ inset: true, element: <Button look="link" iconAfter={VisibilityIcon} iconColor="muted" /> }}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Icon button before and after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ inset: true, element: <Button look="link" iconAfter={VisibilityIcon} iconColor="muted" /> }}
          before={{ inset: true, element: <Button look="link" iconAfter={VisibilityIcon} iconColor="muted" /> }}
        >
          <Input />
        </InputGroup>
      </>
    );
  },
};

/**
 * > Button add ons
 */
export const ButtonAddOn: Story = {
  args: {},
  render: () => {
    return (
      <>
        <InputGroup
          label="Button before"
          hint="I am a hint"
          supportingText="I am supporting text"
          before={<Button>Check</Button>}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Button after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={<Button>Check</Button>}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Button before and after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={<Button>Check</Button>}
          before={<Button>Check</Button>}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Primary button after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={<Button look="primary">Check</Button>}
        >
          <Input />
        </InputGroup>
        <InputGroup
          label="Faint button after"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={<Button look="faint">Check</Button>}
        >
          <Input />
        </InputGroup>
      </>
    );
  },
};

/**
 * > Select add ons
 */
export const SelectAddOn: Story = {
  args: {},
  render: () => {
    return (
      <InputGroup
        label="Select"
        hint="I am a hint"
        supportingText="I am supporting text"
        before={
          <Select>
            <option>Select</option>
          </Select>
        }
        after={
          <Select>
            <option>Select</option>
          </Select>
        }
      >
        <Input />
      </InputGroup>
    );
  },
};

/**
 * > Textarea
 */
export const TextArea: Story = {
  args: {},
  render: () => {
    return (
      <InputGroup label="Text after" hint="I am a hint" supportingText="I am supporting text">
        <Textarea />
      </InputGroup>
    );
  },
};
