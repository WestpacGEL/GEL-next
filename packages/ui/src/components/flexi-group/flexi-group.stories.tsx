import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { FlexiGroup } from './flexi-group.component.js';

const meta: Meta<typeof FlexiGroup> = {
  title: 'Components/FlexiGroup',
  component: FlexiGroup,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const DefaultStory: Story = {
  args: {
    flexiFields: [
      { label: 'Bernett Greet', value: 'bernett' },
      { label: 'Jason Mona', value: 'jason' },
    ],
    onChange: () => console.log('here'),
    label: 'Select a person',
  },
};
