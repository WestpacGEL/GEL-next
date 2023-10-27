import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Form, Input } from '../index.js';

import { Repeater } from './repeater.component.js';

const meta: Meta<typeof Repeater> = {
  title: 'Components/Repeater',
  component: Repeater,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  args: {
    children: (
      <Form.Group>
        <Form.Label htmlFor={`test`}>Primary</Form.Label>
        <Form.Hint>Primary title text</Form.Hint>
        <Input className="w-full" name="test" onChange={e => console.log(e)} />
      </Form.Group>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {},
};

/**
 * > Example using the separator prop
 */
export const Separator: Story = {
  args: { separator: true },
};
