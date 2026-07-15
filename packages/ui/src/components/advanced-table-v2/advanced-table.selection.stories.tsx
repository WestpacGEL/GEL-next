import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(10);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Row Selection',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * It is recommended to use the controlled variant unless you do not need to action on selected items.
 * Pass in `selectedRows` / `onSelectionChange` so selection can be synced elsewhere in the page.
 */
export const Default: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    return (
      <>
        <p className="pb-2 typography-body-8">
          Parent owns selection. Selected ids: {selectedRows.join(', ') || 'none'}
        </p>
        <AdvancedTable
          data={data}
          columns={columns}
          caption="Controlled selection"
          enableRowSelection
          rowKey="id"
          selectedRows={selectedRows}
          onSelectionChange={setSelectedRows}
        />
      </>
    );
  },
};

/** `defaultSelectedRows` sets the initial selection when the table manages its own state. */
export const DefaultSelectedRows: Story = {
  render: () => (
    <AdvancedTable
      data={data}
      columns={columns}
      caption="People"
      enableRowSelection
      rowKey="id"
      defaultSelectedRows={[data[0].id, data[2].id]}
    />
  ),
};

/**
 * Uncontrolled: The selection state can also be managed by the component but cannot be easily accessed.
 * Use the controlled state for action items.
 */
export const Uncontrolled: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" enableRowSelection rowKey="id" />,
};
