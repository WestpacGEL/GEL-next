import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableColumn, type AdvancedTableColumnPinningState } from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData } from './story-utils/index.js';

const data = makePersonData(25);

// Generous fixed widths so the row overflows any reasonable viewport, giving
// the pinned columns' scroll-edge affordance something to demonstrate.
const columns: AdvancedTableColumn<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name', width: 200 },
  { key: 'lastName', title: 'Last Name', width: 200 },
  { key: 'age', title: 'Age', width: 200 },
  { key: 'visits', title: 'Visits', width: 200 },
  { key: 'status', title: 'Status', width: 200 },
  { key: 'progress', title: 'Profile Progress', width: 200 },
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Column Pinning',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `enableColumnPinning` adds pin left / pin right / unpin actions to every
 * column's menu. Scroll the table horizontally to see pinned columns stay
 * put, with a shadow marking the scroll boundary.
 */
export const Default: Story = {
  render: () => (
    <AdvancedTable
      data={data}
      columns={columns}
      caption="People"
      enableColumnPinning
      defaultColumnPinning={{ left: ['firstName'] }}
    />
  ),
};

/**
 * Per-column opt-out. Pinning is enabled at the table level, but one column
 * sets `enablePinning: false` to remove its pin menu items while the rest
 * stay pinnable.
 */
export const PerColumnOptOut: Story = {
  render: () => {
    const perColumn: AdvancedTableColumn<AdvancedPerson>[] = [
      { key: 'firstName', title: 'First Name', width: 200 },
      { key: 'lastName', title: 'Last Name', width: 200 },
      { key: 'age', title: 'Age', width: 200, enablePinning: false },
      { key: 'visits', title: 'Visits', width: 200, enablePinning: false },
      { key: 'status', title: 'Status', width: 200, enablePinning: false },
      { key: 'progress', title: 'Profile Progress', width: 200, enablePinning: false },
    ];
    return (
      <AdvancedTable
        data={data}
        columns={perColumn}
        caption="Pinning on, Profile Progress opted out"
        enableColumnPinning
      />
    );
  },
};

/**
 * Pinning alongside row selection: the reserved selection checkbox column is
 * always force-pinned left (and never appears in the pin menu itself).
 */
export const WithRowSelection: Story = {
  render: () => (
    <AdvancedTable
      data={data}
      columns={columns}
      caption="People"
      enableRowSelection
      rowKey="id"
      enableColumnPinning
      defaultColumnPinning={{ left: ['firstName'] }}
    />
  ),
};

/**
 * Pinning and filtering share the same column menu, sectioned separately
 * ("Filter by:" then "Pin").
 */
export const WithColumnFiltering: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" enableColumnPinning enableColumnFilter />,
};

function ControlledPinningExample() {
  const [columnPinning, setColumnPinning] = useState<AdvancedTableColumnPinningState>({ left: ['firstName'] });

  return (
    <>
      <p className="pb-2 typography-body-8">
        Parent owns pinning — left: {columnPinning.left?.join(', ') || 'none'}, right:{' '}
        {columnPinning.right?.join(', ') || 'none'}
      </p>
      <AdvancedTable
        data={data}
        columns={columns}
        caption="Controlled pinning"
        enableColumnPinning
        columnPinning={columnPinning}
        onColumnPinningChange={setColumnPinning}
      />
    </>
  );
}

/**
 * Controlled: the parent owns pin state via the `columnPinning` /
 * `onColumnPinningChange` pair.
 */
export const Controlled: Story = {
  render: () => <ControlledPinningExample />,
};
