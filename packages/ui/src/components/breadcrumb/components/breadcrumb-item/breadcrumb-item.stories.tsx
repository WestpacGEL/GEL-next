import { type Meta, StoryFn, type StoryObj } from '@storybook/react';

import { BreadcrumbItem } from './breadcrumb-item.component.js';

const meta: Meta<typeof BreadcrumbItem> = {
  title: 'Components/Breadcrumb/BreadCrumbItem',
  component: BreadcrumbItem,
  tags: ['autodocs'],
  decorators: [
    (Story: StoryFn) => (
      <div className="p-2">
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
export const DefaultStory: Story = {
  args: {
    isDisabled: false,
    children: 'Default Crumb',
  },
};

/**
 * > Disabled
 */
export const IsDisabledStory: Story = {
  args: {
    isDisabled: true,
    children: 'Disabled Crumb',
  },
};
