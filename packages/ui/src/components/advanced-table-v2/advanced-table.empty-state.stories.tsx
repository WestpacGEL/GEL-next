import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { Button } from '../button/index.js';
import { ArchiveBoxIcon } from '../icon/index.js';

import { AdvancedTable } from './advanced-table.component.js';
import { personColumns } from './story-utils/index.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Empty State',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AdvancedTable caption="Empty state (default)" columns={personColumns} data={[]} />,
};

export const Custom: Story = {
  render: () => (
    <AdvancedTable
      caption="Empty state (custom)"
      columns={personColumns}
      data={[]}
      emptyState={{
        children: <Button onClick={() => null}>Add person</Button>,
        description: 'Try adjusting your filters or add a new person.',
        icon: <ArchiveBoxIcon size="large" aria-label="Archive empty" />,
        title: 'No people found',
      }}
    />
  ),
};
