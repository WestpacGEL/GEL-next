import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Link } from '../index.js';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps } from './advanced-table.types.js';
import { AdvancedPerson } from './story-utils/fakerData.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Sub-menu Options',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const Sortable: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnPinning />,
};
