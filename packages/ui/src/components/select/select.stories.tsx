import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';
import { Field } from '../field/index.js';

import { Select } from './select.component.js';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
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
    children: (
      <>
        <option value="option-1">option 1</option>
        <option value="option-2">option 2</option>
        <option value="option-3">option 3</option>
        <option value="option-4">option 4</option>
      </>
    ),
  },
};

/**
 * > Invalid usage example
 */
export const Invalid: Story = {
  args: {
    invalid: true,
    children: (
      <>
        <option value="option-1">option 1</option>
        <option value="option-2">option 2</option>
        <option value="option-3">option 3</option>
        <option value="option-4">option 4</option>
      </>
    ),
  },
};

/**
 * > Disabled usage example
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: (
      <>
        <option value="option-1">option 1</option>
        <option value="option-2">option 2</option>
        <option value="option-3">option 3</option>
        <option value="option-4">option 4</option>
      </>
    ),
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
        <Select invalid>
          <option value="option-1">option 1</option>
          <option value="option-2">option 2</option>
          <option value="option-3">option 3</option>
          <option value="option-4">option 4</option>
        </Select>
      </Field>
    );
  },
};

/**
 * > Size field example
 */
export const Sizes: Story = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col gap-2">
        {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
          <Select size={size} key={size}>
            <option value="option-1">option 1</option>
            <option value="option-2">option 2</option>
            <option value="option-3">option 3</option>
            <option value="option-4">option 4</option>
          </Select>
        ))}
      </div>
    );
  },
};

/**
 * > Fixed widths usage example
 */
export const FixedWidths = () => {
  return (
    <div className="flex flex-col gap-2">
      {(['small', 'medium', 'large', 'xlarge'] as const).map(size => (
        <div className="flex flex-col" key={size}>
          <h2 className="border-t border-t-border-muted py-3 typography-body-8 text-text-body">{size}</h2>
          <div className="flex flex-col gap-2">
            {FIXED_WIDTHS.map(width => (
              <Select width={width} key={width}>
                <option>{width}</option>
              </Select>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

/**
 * Example of Select that has truncated long text with the tooltip enabled
 */
export const TruncatedWithTooltip = () => {
  return (
    <Select width={3} enableTooltip>
      <option>Select</option>
      <option>Very long option text that will be truncated</option>
    </Select>
  );
};
