import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTablePinnedRowsState } from './advanced-table.types.js';
import { makePersonData, personColumns } from './story-utils/index.js';

// Two levels of subRows so pinning-cascades-to-sub-rows has something to demonstrate.
const data = makePersonData(20, 2);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Row Pinning',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * A pin toggle renders in a reserved leading column on every top-level row.
 * Pinning a row lifts it (and its sub-rows) into a pinned section above the
 * body, where it stays visible across sorting, filtering, and pagination.
 */
export const Default: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" rowKey="id" enableRowPinning />,
};

/** `defaultPinnedRows` sets the initial pinned rows when the table manages its own state. */
export const DefaultPinnedRows: Story = {
  render: () => (
    <AdvancedTable
      data={data}
      columns={columns}
      caption="People"
      rowKey="id"
      enableRowPinning
      defaultPinnedRows={[data[0].id]}
    />
  ),
};

function ControlledRowPinningExample() {
  const [pinnedRows, setPinnedRows] = useState<AdvancedTablePinnedRowsState>([]);

  return (
    <>
      <p className="pb-2 typography-body-8">Parent owns pinning. Pinned ids: {pinnedRows.join(', ') || 'none'}</p>
      <AdvancedTable
        data={data}
        columns={columns}
        caption="Controlled row pinning"
        rowKey="id"
        enableRowPinning
        pinnedRows={pinnedRows}
        onPinnedRowsChange={setPinnedRows}
      />
    </>
  );
}

/**
 * Controlled: the parent owns pinning state via the `pinnedRows` /
 * `onPinnedRowsChange` pair, keyed by `rowKey`. Only top-level ids are ever
 * listed — pinning a row pins its sub-rows too, but they're never reported
 * individually.
 */
export const Controlled: Story = {
  render: () => <ControlledRowPinningExample />,
};

/**
 * Row selection and row pinning coexist as reserved leading columns: the
 * selection checkbox renders first (leftmost), the pin toggle second.
 */
export const WithSelectionAndPinning: Story = {
  render: () => (
    <AdvancedTable data={data} columns={columns} caption="People" rowKey="id" enableRowSelection enableRowPinning />
  ),
};
