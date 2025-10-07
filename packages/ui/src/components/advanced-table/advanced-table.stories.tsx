import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { ColumnPinningState, Table } from '@tanstack/react-table';
import { useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps, TanstackTableOptions } from './advanced-table.types.js';
import { AdvancedPerson, makeColumns, makeDataFromCols, makePersonData } from './story-utils/fakerData.js';
import { columnsExample, dataExample } from './story-utils/otherData.js';

const multLevelColumns: AdvancedColumnProps<AdvancedPerson>[] = [
  {
    key: 'name',
    title: 'Name',
    columns: [
      { key: 'firstName', title: 'First Name' },
      { key: 'lastName', title: 'Last Name' },
    ],
  },
  {
    key: 'information',
    title: 'Information',
    columns: [
      { key: 'age', title: 'Age' },
      {
        key: 'moreInfo',
        title: 'More Info',
        columns: [
          { key: 'visits', title: 'Visits' },
          { key: 'status', title: 'Status' },
          { key: 'progress', title: 'Profile Progress' },
        ],
      },
    ],
  },
];

const columns: AdvancedColumnProps<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name', editable: true },
  { key: 'lastName', title: 'Last Name' },
  { key: 'age', title: 'Age' },
  { key: 'visits', title: 'Visits' },
  { key: 'status', title: 'Status' },
  { key: 'progress', title: 'Profile Progress' },
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

const defaultData = makePersonData(100);

const manyCols = makeColumns(100);
const dataForCols = makeDataFromCols(100, manyCols);

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTable: Story = {
  render: () => <AdvancedTable data={defaultData} columns={columns} />,
};

export const Resizeable: Story = {
  render: () => <AdvancedTable data={defaultData} columns={columns} enableResizing />,
};

export const Sortable: Story = {
  render: () => <AdvancedTable data={defaultData} columns={columns} enableSorting />,
};

export const SelectableRows: Story = {
  render: () => <AdvancedTable data={defaultData} columns={columns} enableRowSelection />,
};

export const ExampleCopy: Story = {
  render: () => (
    <AdvancedTable data={dataExample} enableRowSelection columns={columnsExample} enableResizing enableSorting />
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
  const [testData, setTestData] = useState(defaultData);
  const [_, setTable] = useState<Table<AdvancedPerson>>();

  return <AdvancedTable data={testData} columns={columns} onDataChange={setTestData} onTableReady={setTable} />;
};
