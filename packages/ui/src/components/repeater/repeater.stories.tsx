import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Form, Input } from '../index.js';

import { Repeater } from './repeater.component.js';

const meta: Meta<typeof Repeater> = {
  title: 'Example/Repeater',
  component: Repeater,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-5">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    children: (
      <Form>
        <Form.Group>
          <Form.Label htmlFor={`test`}>Primary</Form.Label>
          <Form.Hint>Primary title text</Form.Hint>
          <Input name={`test`} onChange={(e: any) => console.log(e)} />
        </Form.Group>
      </Form>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {},
};

/**
 * > Example using the separator prop
 */
export const SeparatedRepeater: Story = {
  args: { separator: true },
};
