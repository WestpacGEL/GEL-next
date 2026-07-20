import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableGroupingState } from './advanced-table.types.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(25);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Column Menu/Grouping',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `enableGrouping` adds group/ungroup actions to every column's menu. Only
 * one column can be grouped at a time — grouping by a new column replaces
 * the previous grouping. Grouped rows render fully expanded under a
 * full-width group-header banner.
 */
export const Default: Story = {
  render: () => (
    <AdvancedTable caption="People" columns={columns} data={data} defaultGrouping={['status']} enableGrouping />
  ),
};

/**
 * Controlled: the parent owns grouping state via the `grouping` /
 * `onGroupingChange` pair.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [grouping, setGrouping] = useState<AdvancedTableGroupingState>(['status']);

    return (
      <>
        <p className="pb-2 typography-body-8">Parent owns grouping — grouped by: {grouping[0] ?? 'none'}</p>
        <AdvancedTable
          caption="Controlled grouping"
          columns={columns}
          data={data}
          enableGrouping
          grouping={grouping}
          onGroupingChange={setGrouping}
        />
      </>
    );
  },
};
