/* eslint-disable react-hooks/rules-of-hooks */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableColumnOrderState } from './advanced-table.types.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(25);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Reordering',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `enableColumnReordering` lets a user drag a header's title to reorder
 * columns, do the same with the keyboard (Space to pick up, arrow keys to
 * move, Space to drop), or use "Move left" / "Move right" in the column menu.
 */
export const Default: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" enableColumnReordering />,
};

/**
 * Reordering alongside row selection and row pinning: the reserved leading
 * columns always stay first and are never draggable or menu-movable.
 */
export const WithReservedColumns: Story = {
  render: () => (
    <AdvancedTable
      caption="People"
      columns={columns}
      data={data}
      enableColumnReordering
      enableRowPinning
      enableRowSelection
      rowKey="id"
    />
  ),
};

const initialColumnOrder: AdvancedTableColumnOrderState = ['firstName', 'dateOfBirth', 'status', 'email', 'id'];

/**
 * Controlled: the parent owns column order via the `columnOrder` /
 * `onColumnOrderChange` pair.
 */
export const Controlled: Story = {
  render: () => {
    const [columnOrder, setColumnOrder] = useState<AdvancedTableColumnOrderState>(initialColumnOrder);

    return (
      <>
        <p className="pb-2 typography-body-8">Parent owns column order — {columnOrder.join(', ')}</p>
        <AdvancedTable
          data={data}
          columns={columns}
          caption="Controlled column order"
          enableColumnReordering
          columnOrder={columnOrder}
          onColumnOrderChange={setColumnOrder}
        />
      </>
    );
  },
};
