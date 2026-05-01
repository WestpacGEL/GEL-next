import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { ArchiveBoxIcon } from '../icon/index.js';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Empty State',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const Default: Story = {
  render: () => <AdvancedTable data={[]} columns={columnsSB} emptyState={{ title: 'No data to display' }} />,
};

export const WithDescription: Story = {
  render: () => (
    <AdvancedTable
      data={[]}
      columns={columnsSB}
      emptyState={{
        title: 'No results found',
        description: 'Try adjusting your filters or search terms to find what you are looking for.',
      }}
    />
  ),
};

export const WithCustomIcon: Story = {
  render: () => (
    <AdvancedTable
      data={[]}
      columns={columnsSB}
      emptyState={{
        title: 'Your archive is empty',
        description: 'Items you archive will appear here.',
        icon: <ArchiveBoxIcon size="large" aria-label="Archive empty" />,
      }}
    />
  ),
};
