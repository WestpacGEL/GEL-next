/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { FormGroup, Hint, Input, Label } from '../index.js';

import { Repeater } from './repeater.component.js';

const meta: Meta<typeof Repeater> = {
  title: 'Components/Repeater',
  component: Repeater,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  args: {
    children: (
      <FormGroup>
        <Label htmlFor={`test`}>Primary</Label>
        <Hint>Primary title text</Hint>
        <Input className="w-full" name="test" onChange={e => console.log(e)} />
      </FormGroup>
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
