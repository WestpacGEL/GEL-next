import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Input } from './input.component.js';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex justify-center p-3">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES = ['small', 'medium', 'large', 'xlarge'];
const FIXED_WIDTHS = [2, 3, 4, 5, 10, 20, 30];

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
      <Input size={size as any} placeholder={size} />
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
