import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { ColumnPinningState } from '@tanstack/react-table';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps, TanstackTableOptions } from './advanced-table.types.js';
import { AdvancedPerson, makeColumns, makeDataFromCols, makePersonData } from './story-utils/fakerData.js';
import { columnsExample, dataExample } from './story-utils/otherData.js';

const columns: AdvancedColumnProps<AdvancedPerson>[] = [
  {
    key: 'name',
    title: 'Name',
    enableSorting: false,
    enableGrouping: false,
    columns: [
      { key: 'firstName', title: 'First Name' },
      { key: 'lastName', title: 'Last Name' },
    ],
  },
  {
    key: 'information',
    title: 'Information',
    enableSorting: false,
    enableGrouping: false,
    columns: [
      { key: 'age', title: 'Age' },
      {
        key: 'moreInfo',
        title: 'More Info',
        enableSorting: false,
        enableGrouping: false,
        columns: [
          { key: 'visits', title: 'Visits' },
          { key: 'status', title: 'Status' },
          { key: 'progress', title: 'Profile Progress' },
        ],
      },
    ],
  },
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

const defaultData = makePersonData(100, 20);

const manyCols = makeColumns(100);
const dataForCols = makeDataFromCols(100, manyCols);

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AdvancedTable
      data={defaultData}
      enableRowSelection
      columns={columns}
      enableResizing
      enableSorting
      subRowKey="subRows"
    />
  ),
};

export const ExampleCopy: Story = {
  render: () => (
    <AdvancedTable
      data={dataExample}
      enableRowSelection
      columns={columnsExample}
      enableResizing
      enableSorting
      subRowKey="subRows"
    />
  ),
};

export const Virtualized: Story = {
  render: () => (
    <AdvancedTable
      data={dataForCols}
      columns={manyCols}
      enableResizing
      enableColumnPinning
      enableSorting
      enableRowSelection
      scrollableColumns
      scrollableRows
      subRowKey="subRows"
    />
  ),
};

export const TestControlled = () => {
  const [pinned, setPinned] = useState<ColumnPinningState>({});
  const tableProps: TanstackTableOptions<ReturnType<typeof makeDataFromCols>[0]> = {
    state: {
      columnPinning: pinned,
    },
    onColumnPinningChange: setPinned,
  };

  return (
    <AdvancedTable
      data={dataForCols}
      columns={manyCols}
      enableResizing
      enableColumnPinning
      enableSorting
      enableRowSelection
      scrollableColumns
      scrollableRows
      tableOptions={tableProps}
      subRowKey="subRows"
    />
  );
};
