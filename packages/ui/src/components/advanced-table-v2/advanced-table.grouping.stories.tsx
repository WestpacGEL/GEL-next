import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableColumn, type AdvancedTableGroupingState } from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(25);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Grouping',
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
    <AdvancedTable data={data} columns={columns} caption="People" enableGrouping defaultGrouping={['status']} />
  ),
};

/**
 * Per-column opt-in. Grouping is enabled at the table level, but only columns
 * that also set `enableGrouping: true` get a group menu item — it's not
 * enough for the table alone to turn the feature on.
 */
export const PerColumnOptIn: Story = {
  render: () => {
    const perColumn: AdvancedTableColumn<AdvancedPerson>[] = [
      { key: 'firstName', title: 'First Name' },
      { key: 'lastName', title: 'Last Name' },
      { key: 'age', title: 'Age' },
      { key: 'visits', title: 'Visits' },
      { key: 'status', title: 'Status', enableGrouping: true },
      { key: 'progress', title: 'Profile Progress' },
    ];
    return <AdvancedTable data={data} columns={perColumn} caption="Grouping on, only Status opted in" enableGrouping />;
  },
};

/**
 * Grouping and filtering share the same column menu, sectioned separately
 * ("Filter by:" then "Group").
 */
export const WithColumnFiltering: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" enableGrouping enableColumnFilter />,
};

function ControlledGroupingExample() {
  const [grouping, setGrouping] = useState<AdvancedTableGroupingState>(['status']);

  return (
    <>
      <p className="pb-2 typography-body-8">Parent owns grouping — grouped by: {grouping[0] ?? 'none'}</p>
      <AdvancedTable
        data={data}
        columns={columns}
        caption="Controlled grouping"
        enableGrouping
        grouping={grouping}
        onGroupingChange={setGrouping}
      />
    </>
  );
}

/**
 * Controlled: the parent owns grouping state via the `grouping` /
 * `onGroupingChange` pair.
 */
export const Controlled: Story = {
  render: () => <ControlledGroupingExample />,
};
