import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { BreadcrumbItem } from './breadcrumb-item.component.js';

const meta: Meta<typeof BreadcrumbItem> = {
  title: 'Components/Breadcrumb/BreadCrumbItem',
  component: BreadcrumbItem,
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
    isDisabled: false,
    children: 'Strategic partnerships',
  },
};

/**
 * > Disabled
 */
export const IsDisabled: Story = {
  args: {
    isDisabled: true,
    children: 'Open Banking',
  },
};
