/* eslint-disable react-hooks/rules-of-hooks */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import {
  type AdvancedTableColumn,
  type AdvancedTableColumnFiltersState,
  type AdvancedTableColumnPinningState,
  type AdvancedTableGroupingState,
} from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(25);

// Widened so the row overflows the viewport, giving pinned columns' scroll-edge
// affordance something to demonstrate.
const columns = personColumns.map(column => ({ ...column, width: 200 })) as AdvancedTableColumn<AdvancedPerson>[];

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Column Menu',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Filtering, pinning, and grouping share the same per-column menu, each as its
 * own section ("Filter by:", "Pin", "Group") — only the sections a column
 * supports appear.
 */
export const Default: Story = {
  render: () => (
    <AdvancedTable
      caption="Employee dashboard"
      columns={columns}
      data={data}
      enableColumnFilter
      enableColumnPinning
      enableGrouping
    />
  ),
};

/**
 * Per-column opt-in. Each feature is enabled at the table level, but a column
 * only gets that section in its menu if it also sets the matching
 * `enableColumnFilter` / `enablePinning` / `enableGrouping` flag.
 */
export const PerColumnOptIn: Story = {
  render: () => {
    const perColumn: AdvancedTableColumn<AdvancedPerson>[] = [
      { key: 'firstName', title: 'First Name', width: 200, enableColumnFilter: true },
      { key: 'lastName', title: 'Last Name', width: 200, enablePinning: true },
      { key: 'age', title: 'Age', width: 200, enableGrouping: true },
      { key: 'visits', title: 'Visits', width: 200 },
      { key: 'status', title: 'Status', width: 200, enableColumnFilter: true, enablePinning: true },
      { key: 'progress', title: 'Profile Progress', width: 200, enableGrouping: true },
    ];
    return (
      <AdvancedTable
        caption="Each column opts into a different subset of filter/pin/group"
        columns={perColumn}
        data={data}
        enableColumnFilter
        enableColumnPinning
        enableGrouping
      />
    );
  },
};

/** Applies each active column filter as a case-insensitive substring match — the same
 * default comparator the table itself uses — but against the parent's own copy of `data`. */
function applyColumnFilters(rows: AdvancedPerson[], filters: AdvancedTableColumnFiltersState): AdvancedPerson[] {
  return filters.reduce((filteredRows, filter) => {
    const needle = filter.value.trim().toLowerCase();
    if (!needle) return filteredRows;
    return filteredRows.filter(row => {
      const value = row[filter.id as keyof AdvancedPerson] as string | number | undefined;
      return String(value ?? '')
        .toLowerCase()
        .includes(needle);
    });
  }, rows);
}

function ControlledColumnMenuExample() {
  const [columnFilters, setColumnFilters] = useState<AdvancedTableColumnFiltersState>([]);
  const [grouping, setGrouping] = useState<AdvancedTableGroupingState>([]);
  const [columnPinning, setColumnPinning] = useState<AdvancedTableColumnPinningState>({ left: ['firstName'] });
  // The parent filters its own data — `manualFiltering` tells the table not to
  // also filter internally, since `data` here is already the filtered result.
  const filteredData = useMemo(() => applyColumnFilters(data, columnFilters), [columnFilters]);

  return (
    <>
      <p className="pb-2 typography-body-8">
        Parent owns filter/group/pin state — {filteredData.length} of {data.length} rows shown, grouped by:{' '}
        {grouping[0] ?? 'none'}, pinned left: {columnPinning.left?.join(', ') || 'none'}
      </p>
      <AdvancedTable
        caption="Controlled filtering, grouping and pinning"
        columnFilters={columnFilters}
        columnPinning={columnPinning}
        columns={columns}
        data={filteredData}
        enableColumnFilter
        enableColumnPinning
        enableGrouping
        grouping={grouping}
        manualFiltering
        onColumnFiltersChange={setColumnFilters}
        onColumnPinningChange={setColumnPinning}
        onGroupingChange={setGrouping}
      />
    </>
  );
}

/**
 * Controlled: the parent owns all three menu-driven states via their
 * respective `state` / `onStateChange` pairs, and performs the actual
 * filtering itself (`manualFiltering`).
 */
export const Controlled: Story = {
  render: () => {
    const [columnFilters, setColumnFilters] = useState<AdvancedTableColumnFiltersState>([]);
    const [grouping, setGrouping] = useState<AdvancedTableGroupingState>([]);
    const [columnPinning, setColumnPinning] = useState<AdvancedTableColumnPinningState>({ left: ['firstName'] });
    // The parent filters its own data — `manualFiltering` tells the table not to
    // also filter internally, since `data` here is already the filtered result.
    const filteredData = useMemo(() => applyColumnFilters(data, columnFilters), [columnFilters]);

    return (
      <>
        <p className="pb-2 typography-body-8">
          Parent owns filter/group/pin state — {filteredData.length} of {data.length} rows shown, grouped by:{' '}
          {grouping[0] ?? 'none'}, pinned left: {columnPinning.left?.join(', ') || 'none'}
        </p>
        <AdvancedTable
          caption="Controlled filtering, grouping and pinning"
          columnFilters={columnFilters}
          columnPinning={columnPinning}
          columns={columns}
          data={filteredData}
          enableColumnFilter
          enableColumnPinning
          enableGrouping
          grouping={grouping}
          manualFiltering
          onColumnFiltersChange={setColumnFilters}
          onColumnPinningChange={setColumnPinning}
          onGroupingChange={setGrouping}
        />
      </>
    );
  },
};
