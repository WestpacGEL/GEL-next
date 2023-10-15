import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { Breadcrumb } from './breadcrumb.component.js';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * > Default usage example
 */
export const Default: Story = {
  args: {
    children: [
      <Breadcrumb.Item tag="button" onClick={() => alert('Folder 1')}>
        About us
      </Breadcrumb.Item>,
      <Breadcrumb.Item tag="a" href="#nogo">
        Innovation
      </Breadcrumb.Item>,
      <Breadcrumb.Item tag="a" href="#loko">
        Principal investments
      </Breadcrumb.Item>,
    ],
  },
};
