import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';
import { Autocomplete, Button, Input, Select } from '../index.js';

import { InputField } from './input-field.component.js';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
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
 * > Another usage example
 */
export const AnotherDefault: Story = {
  args: {},
  render: () => {
    return (
      <InputField label="Label" hint="I am a hint" supportingText="I am supporting text">
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

/**
 * > Fixed widths usage example
 */
export const FixedWidths = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="typography-body-7 mb-3">Input sizes</h3>
      {FIXED_WIDTHS.map(width => (
        <InputField
          key={width}
          tag="fieldset"
          label="Label"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={<Button>Check</Button>}
          before="$AUD"
          width={width}
        >
          <Input placeholder={width.toString()} />
        </InputField>
      ))}
      <h3 className="typography-body-7 mb-3">Select sizes</h3>
      {FIXED_WIDTHS.map(width => (
        <InputField
          key={width}
          tag="fieldset"
          label="Label"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={<Button>Check</Button>}
          before="$AUD"
          width={width}
        >
          <Select key={width}>
            <option>{width.toString()}</option>
          </Select>
        </InputField>
      ))}
      <h3 className="typography-body-7 mb-3">Autocomplete sizes</h3>
      {FIXED_WIDTHS.map(width => (
        <InputField
          key={width}
          tag="fieldset"
          label="Label"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={<Button>Check</Button>}
          before="$AUD"
          width={width}
        >
          <Autocomplete key={width} width={width}>
            <Autocomplete.Item key="red panda">Red Panda</Autocomplete.Item>
            <Autocomplete.Item key="cat">Cat</Autocomplete.Item>
            <Autocomplete.Item key="dog">Dog</Autocomplete.Item>
            <Autocomplete.Item key="aardvark">Aardvark</Autocomplete.Item>
            <Autocomplete.Item key="kangaroo">Kangaroo</Autocomplete.Item>
            <Autocomplete.Item key="snake">Snake</Autocomplete.Item>
          </Autocomplete>
        </InputField>
      ))}
    </div>
  );
};
