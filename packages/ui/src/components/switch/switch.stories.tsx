import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Switch } from './switch.component.js';

const meta: Meta<typeof Switch> = {
  title: 'Example/Switch',
  component: Switch,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="flex p-3">
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
    size: 'medium',
    label: 'eStatements',
  },
};

export const ResponsiveSize = () => (
  <div>
    <Switch
      label="eStatements"
      size={{
        initial: 'medium',
        md: 'large',
        lg: 'large',
      }}
    />
  </div>
);
