import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Textarea } from './textarea.component.js';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
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
