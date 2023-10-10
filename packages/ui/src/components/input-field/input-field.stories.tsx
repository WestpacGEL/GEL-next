import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Button, Input } from '../index.js';

import { InputField } from './input-field.component.js';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
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
 * > Default usage example
 */
export const Default: Story = {
  args: {},
  render: () => {
    return (
      <InputField label="Label" hint="I am a hint" supportingText="I am supporting text" after={<Button>Check</Button>}>
        <Input />
      </InputField>
    );
  },
};

/**
 * > SrOnlyLabel usage example
 */
export const SrOnlyLabel: Story = {
  args: {},
  render: () => {
    return (
      <InputField
        label="Label"
        hideLabel
        hint="I am a hint"
        supportingText="I am supporting text"
        after={<Button>Check</Button>}
      >
        <Input />
      </InputField>
    );
  },
};

/**
 * > Combination usage example
 */
export const Combination: Story = {
  args: {},
  render: () => {
    return (
      <InputField
        label="Label"
        hint="I am a hint"
        supportingText="I am supporting text"
        after={<Button>Check</Button>}
        before="$AUD"
      >
        <Input />
      </InputField>
    );
  },
};

/**
 * > Fieldset as tag
 */
export const WithFieldset: Story = {
  args: {},
  render: () => {
    return (
      <InputField
        tag="fieldset"
        label="Label"
        hint="I am a hint"
        supportingText="I am supporting text"
        after={<Button>Check</Button>}
        before="$AUD"
      >
        <Input />
      </InputField>
    );
  },
};
