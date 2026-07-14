import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { ArchiveBoxIcon } from '../icon/index.js';

import { AdvancedTable } from './advanced-table.component.js';
import { personColumns } from './story-utils/index.js';

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Empty State',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AdvancedTable data={[]} columns={columns} caption="Empty state (default)" />,
};

export const Custom: Story = {
  render: () => (
    <AdvancedTable
      data={[]}
      columns={columns}
      caption="Empty state (custom)"
      emptyState={{
        title: 'No people found',
        description: 'Try adjusting your filters or add a new person.',
        icon: <ArchiveBoxIcon size="large" aria-label="Archive empty" />,
      }}
    />
  ),
};
