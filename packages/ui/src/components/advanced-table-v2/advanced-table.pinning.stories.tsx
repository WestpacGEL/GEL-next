import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableColumn, type AdvancedTableColumnPinningState } from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData } from './story-utils/index.js';

const data = makePersonData(25);

// Generous fixed widths so the row overflows any reasonable viewport, giving
// the pinned columns' scroll-edge affordance something to demonstrate.
const columns: AdvancedTableColumn<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name', width: 200, enablePinning: true, enableColumnFilter: true },
  { key: 'lastName', title: 'Last Name', width: 200, enablePinning: true, enableColumnFilter: true },
  { key: 'age', title: 'Age', width: 200, enablePinning: true, enableColumnFilter: true },
  { key: 'visits', title: 'Visits', width: 200, enablePinning: true, enableColumnFilter: true },
  { key: 'status', title: 'Status', width: 200, enablePinning: true, enableColumnFilter: true },
  { key: 'progress', title: 'Profile Progress', width: 200, enablePinning: true, enableColumnFilter: true },
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Column Menu/Pinning',
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
      caption="People"
      columns={columns}
      data={data}
      defaultColumnPinning={{ left: ['firstName'] }}
      enableColumnPinning
    />
  ),
};

/**
 * Pinning alongside row selection: the reserved selection checkbox column is
 * always force-pinned left (and never appears in the pin menu itself).
 */
export const WithRowSelection: Story = {
  render: () => (
    <AdvancedTable
      caption="People"
      columns={columns}
      data={data}
      defaultColumnPinning={{ left: ['firstName'] }}
      enableColumnPinning
      enableRowSelection
      rowKey="id"
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

/**
 * Controlled: the parent owns pin state via the `columnPinning` /
 * `onColumnPinningChange` pair.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [columnPinning, setColumnPinning] = useState<AdvancedTableColumnPinningState>({ left: ['firstName'] });

    return (
      <>
        <p className="pb-2 typography-body-8">
          Parent owns pinning — left: {columnPinning.left?.join(', ') || 'none'}, right:{' '}
          {columnPinning.right?.join(', ') || 'none'}
        </p>
        <AdvancedTable
          caption="Controlled pinning"
          columnPinning={columnPinning}
          columns={columns}
          data={data}
          enableColumnPinning
          onColumnPinningChange={setColumnPinning}
        />
      </>
    );
  },
};
