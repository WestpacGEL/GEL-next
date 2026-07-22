import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableColumnSizingState } from './advanced-table.types.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(25);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Column Resizing',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `enableColumnResizing` adds a handle at each header's right edge. Drag it,
 * or focus it and use the arrow keys (Shift for a larger step). Double-click,
 * or Enter/Space while focused, resets the column to its default width.
 *
 * Please not that column resizing and `%` widths do not work together, you must use no or numeric values.
 */
export const Default: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" enableColumnResizing />,
};

/**
 * Resizing alongside row selection, row pinning, and an explicitly pinned
 * column: none of the reserved leading columns or the pinned column get a
 * resize handle.
 */
export const WithReservedColumnsAndPinning: Story = {
  render: () => (
    <AdvancedTable
      data={data}
      columns={columns}
      caption="People"
      rowKey="id"
      enableRowSelection
      enableRowPinning
      enableColumnPinning
      columnPinning={{ left: ['firstName'] }}
      enableColumnResizing
    />
  ),
};

function ControlledResizingExample() {
  const [columnSizing, setColumnSizing] = useState<AdvancedTableColumnSizingState>({ firstName: 200 });

  return (
    <>
      <p className="pb-2 typography-body-8">
        Parent owns column widths —{' '}
        {Object.entries(columnSizing)
          .map(([id, size]) => `${id}: ${size}px`)
          .join(', ')}
      </p>
      <AdvancedTable
        data={data}
        columns={columns}
        caption="Controlled column widths"
        enableColumnResizing
        columnSizing={columnSizing}
        onColumnSizingChange={setColumnSizing}
      />
    </>
  );
}

/**
 * Controlled: the parent owns column widths via the `columnSizing` /
 * `onColumnSizingChange` pair.
 */
export const Controlled: Story = {
  render: () => <ControlledResizingExample />,
};

/**
 * Per-column `minWidth` override: the first column has a custom minimum width
 * of 150px, enforced during drag and keyboard resize.
 */
export const CustomMinWidth: Story = {
  render: () => (
    <AdvancedTable
      data={data}
      columns={[
        {
          key: 'firstName',
          title: 'First Name',
          minWidth: 150,
          enableColumnFilter: true,
          enablePinning: true,
          enableGrouping: true,
        },
        {
          key: 'lastName',
          title: 'Last Name',
          enableColumnFilter: true,
          enablePinning: true,
          enableGrouping: true,
        },
        {
          key: 'age',
          title: 'Age',
          enableColumnFilter: true,
          enablePinning: true,
          enableGrouping: true,
        },
        {
          key: 'visits',
          title: 'Visits',
          enableColumnFilter: true,
          enablePinning: true,
          enableGrouping: true,
        },
        {
          key: 'status',
          title: 'Status',
          enableColumnFilter: true,
          enablePinning: true,
          enableGrouping: true,
        },
        {
          key: 'progress',
          title: 'Profile Progress',
          enableColumnFilter: true,
          enablePinning: true,
          enableGrouping: true,
        },
      ]}
      caption="People"
      enableColumnResizing
    />
  ),
};
