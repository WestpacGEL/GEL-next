import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { FIXED_WIDTHS } from '../../constants/input-widths.js';

import { Input } from './input.component.js';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES = ['small', 'medium', 'large', 'xlarge'] as const;

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
 * >Sizes
 */
export const Sizes = () => (
  <div className="flex flex-col gap-2">
    {SIZES.map(size => (
      <Input key={size} size={size} placeholder={size} />
    ))}
  </div>
);

/**
 * > ReadOnly usage example
 */
export const ReadOnly: Story = {
  args: {
    readOnly: true,
  },
};

/**
 * > Fixed widths usage example
 */
export const FixedWidths = () => {
  return (
    <div className="flex flex-col gap-2">
      {FIXED_WIDTHS.map(width => (
        <Input placeholder={width.toString()} width={width} key={width} />
      ))}
    </div>
  );
};
