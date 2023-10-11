import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Select } from './select.component.js';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex items-center justify-center p-3">
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
