/* eslint-disable no-console */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Field, Input } from '../index.js';

import { Repeater } from './repeater.component.js';

const meta: Meta<typeof Repeater> = {
  title: 'Components/Repeater',
  component: Repeater,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  args: {
    children: (
      <Field label="Primary" hintMessage="Primary title text">
        <Input className="w-full" name="test" onChange={e => console.log(e)} />
      </Field>
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
