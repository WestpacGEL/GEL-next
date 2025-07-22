import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';
import { Field } from '../field/index.js';

import { Textarea } from './textarea.component.js';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    placeholder: 'placeholder',
    size: 'medium',
  },
};

/**
 * > Invalid usage example
 */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
};

/**
 * > Disabled usage example
 */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

/**
 * > ReadOnly usage example
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

/**
 * > Form field example
 */
export const FormField: Story = {
  args: {},
  render: () => {
    return (
      <Field
        label="Are you an existing customer?"
        hintMessage="Hint: choose from one of the following options"
        errorMessage="This is an inline error message"
      >
        <Textarea />
      </Field>
    );
  },
};

/**
 * > Fixed widths usage example
 */
export const FixedWidths = () => {
  return (
    <div className="flex flex-col gap-2">
      {FIXED_WIDTHS.map(width => (
        <Textarea placeholder={width.toString()} width={width} key={width} />
      ))}
    </div>
  );
};
