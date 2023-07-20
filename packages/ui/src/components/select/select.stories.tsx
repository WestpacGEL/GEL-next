import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Select } from './select.component.js';

const meta: Meta<typeof Select> = {
  title: 'Example/Select',
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
    layout: 'center',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
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
export const InvalidStory: Story = {
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
export const DisabledStory: Story = {
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
