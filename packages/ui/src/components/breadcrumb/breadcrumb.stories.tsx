import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Breadcrumb } from './breadcrumb.component.js';
import { BreadcrumbItem } from './components/breadcrumb-item/breadcrumb-item.component.js';

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
      <BreadcrumbItem key="one" tag="button" onClick={() => alert('Folder 1')}>
        About us
      </BreadcrumbItem>,
      <BreadcrumbItem key="two" tag="a" href="#nogo">
        Innovation
      </BreadcrumbItem>,
      <BreadcrumbItem key="three" tag="a" href="#loko">
        Principal investments
      </BreadcrumbItem>,
    ],
  },
};
