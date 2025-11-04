import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';
import { VisibilityIcon } from '../icon/index.js';
import { Autocomplete, AutocompleteItem, Button, Input, Select } from '../index.js';

import { InputGroup } from './input-group.component.js';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
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
      <InputGroup label="Label" hint="I am a hint" supportingText="I am supporting text" after={<Button>Check</Button>}>
        <Input />
      </InputGroup>
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
      <InputGroup label="Label" hint="I am a hint" supportingText="I am supporting text">
        <Input />
      </InputGroup>
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
      <InputGroup
        label="Label"
        hideLabel
        hint="I am a hint"
        supportingText="I am supporting text"
        after={<Button>Check</Button>}
      >
        <Input />
      </InputGroup>
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
      <InputGroup
        label="Label"
        hint="I am a hint"
        supportingText="I am supporting text"
        after={<Button>Check</Button>}
        before="$AUD"
      >
        <Input />
      </InputGroup>
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
      <InputGroup
        tag="fieldset"
        label="Label"
        hint="I am a hint"
        supportingText="I am supporting text"
        after={<Button>Check</Button>}
        before="$AUD"
      >
        <Input />
      </InputGroup>
    );
  },
};

/**
 * > Fixed widths usage example
 */
export const FixedWidths = () => {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="mb-3 typography-body-7">Input sizes</h3>
      {FIXED_WIDTHS.map(width => (
        <InputGroup
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
        </InputGroup>
      ))}
      <h3 className="mb-3 typography-body-7">Input sizes with icon</h3>
      {FIXED_WIDTHS.map(width => (
        <InputGroup
          key={width}
          width={width}
          label="Icon"
          hint="I am a hint"
          supportingText="I am supporting text"
          after={{ icon: props => <VisibilityIcon {...props} color="muted" />, inset: true }}
        >
          <Input placeholder={width.toString()} />
        </InputGroup>
      ))}
      <h3 className="mb-3 typography-body-7">Select sizes</h3>
      {FIXED_WIDTHS.map(width => (
        <InputGroup
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
        </InputGroup>
      ))}
      <h3 className="mb-3 typography-body-7">Autocomplete sizes</h3>
      {FIXED_WIDTHS.map(width => (
        <InputGroup
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
            <AutocompleteItem key="red panda">Red Panda</AutocompleteItem>
            <AutocompleteItem key="cat">Cat</AutocompleteItem>
            <AutocompleteItem key="dog">Dog</AutocompleteItem>
            <AutocompleteItem key="aardvark">Aardvark</AutocompleteItem>
            <AutocompleteItem key="kangaroo">Kangaroo</AutocompleteItem>
            <AutocompleteItem key="snake">Snake</AutocompleteItem>
          </Autocomplete>
        </InputGroup>
      ))}
      <h3 className="mb-3 typography-body-7">Responsive input widths</h3>
      <InputGroup
        key="responsive width"
        tag="fieldset"
        label="Label"
        hint="I am a hint"
        supportingText="I am supporting text"
        after={<Button>Check</Button>}
        before="$AUD"
        width={{ initial: 'full', sm: 10, md: 20, lg: 30 }}
      >
        <Input placeholder="responsive" />
      </InputGroup>
    </div>
  );
};
