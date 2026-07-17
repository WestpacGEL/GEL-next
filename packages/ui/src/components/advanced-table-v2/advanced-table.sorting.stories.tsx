import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableColumn, type AdvancedTableSortingState } from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(8);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Sorting',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `enableSorting` makes columns that also opt in (`enableSorting: true` on
 * the column) sortable. Click a header to cycle ascending, descending, unsorted.
 */
export const Sortable: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="Sortable" enableSorting />,
};

/**
 * Per-column opt-in. Sorting is enabled at the table level, but only columns
 * that also set `enableSorting: true` get a sort control — it's not enough
 * for the table alone to turn the feature on.
 */
export const PerColumnOptIn: Story = {
  render: () => {
    const perColumn: AdvancedTableColumn<AdvancedPerson>[] = [
      { key: 'firstName', title: 'First Name', enableSorting: true },
      { key: 'lastName', title: 'Last Name', enableSorting: true },
      { key: 'age', title: 'Age' },
      { key: 'visits', title: 'Visits' },
      { key: 'status', title: 'Status' },
      { key: 'progress', title: 'Profile Progress' },
    ];
    return (
      <AdvancedTable
        data={data}
        columns={perColumn}
        caption="Sorting on, only First Name and Last Name opted in"
        enableSorting
      />
    );
  },
};

function ControlledSortingExample() {
  const [sorting, setSorting] = useState<AdvancedTableSortingState>([{ id: 'age', desc: false }]);

  // Manual sorting: the parent owns the data order. The table only reports the
  // sort descriptor and emits changes — it never reorders rows itself.
  const sortedData = useMemo(() => {
    if (!sorting.length) return data;
    const { id, desc } = sorting[0];
    return [...data].sort((a, b) => {
      const av = a[id as keyof AdvancedPerson] as string | number | undefined;
      const bv = b[id as keyof AdvancedPerson] as string | number | undefined;
      const cmp =
        typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''));
      return desc ? -cmp : cmp;
    });
  }, [sorting]);

  let current = 'none';
  if (sorting.length) current = `${sorting[0].id} ${sorting[0].desc ? 'desc' : 'asc'}`;

  return (
    <>
      <p className="pb-2 typography-body-8">Parent-sorted (manual). Current sort: {current}</p>
      <AdvancedTable
        data={sortedData}
        columns={columns}
        caption="Controlled + manual sorting"
        enableSorting
        manualSorting
        sorting={sorting}
        onSortingChange={setSorting}
      />
    </>
  );
}

/**
 * Controlled + manual: the parent owns both the sort state and the data order,
 * sorting the array itself in response to `onSortingChange`. The table renders
 * the rows as given (`manualSorting`) and never reorders them internally.
 */
export const Controlled: Story = {
  render: () => <ControlledSortingExample />,
};
