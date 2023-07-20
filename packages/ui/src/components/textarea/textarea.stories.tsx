import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Textarea } from './textarea.component.js';

const meta: Meta<typeof Textarea> = {
  title: 'Example/Textarea',
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
    placeholder: 'placeholder',
    size: 'medium',
  },
};

/**
 * > Invalid usage example
 */
export const InvalidStory: Story = {
  args: {
    invalid: true,
  },
};

/**
 * > Disabled usage example
 */
export const DisabledStory: Story = {
  args: {
    disabled: true,
  },
};

/**
 * > ReadOnly usage example
 */
export const ReadOnlyStory: Story = {
  args: {
    readOnly: true,
  },
};
