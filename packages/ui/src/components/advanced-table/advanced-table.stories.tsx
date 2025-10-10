import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';

import { AdvancedPerson, makeColumns, makeDataFromCols, makePersonData } from './story-utils/fakerData.js';
import { columnsExample, dataExample } from './story-utils/otherData.js';

import { AdvancedColumnProps, AdvancedTable } from './index.js';

const multiLevelColumns: AdvancedColumnProps<AdvancedPerson>[] = [
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
  { key: 'firstName', title: 'First Name' },
  { key: 'lastName', title: 'Last Name' },
  { key: 'age', title: 'Age' },
  { key: 'visits', title: 'Visits' },
  { key: 'status', title: 'Status' },
  { key: 'progress', title: 'Profile Progress' },
];

const editableColumns: AdvancedColumnProps<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name', editable: true },
  { key: 'lastName', title: 'Last Name', editable: true },
  { key: 'age', title: 'Age', editable: true },
  { key: 'visits', title: 'Visits', editable: true },
  { key: 'status', title: 'Status', editable: true },
  { key: 'progress', title: 'Profile Progress', editable: true },
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

const defaultData = makePersonData(100);
const expandableData = makePersonData(100, 10, 10);

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

export const ExpandableRows: Story = {
  render: () => <AdvancedTable data={expandableData} columns={columns} subRowKey="subRows" />,
};

export const EditableCells = () => {
  const [localData, setLocalData] = useState(defaultData);

  return <AdvancedTable data={localData} columns={editableColumns} onDataChange={setLocalData} />;
};

export const ExpandableRowsNotPaginating: Story = {
  render: () => (
    <AdvancedTable
      data={expandableData}
      columns={columns}
      subRowKey="subRows"
      tableOptions={{ paginateExpandedRows: false }}
    />
  ),
};

export const Grouping: Story = {
  render: () => <AdvancedTable data={defaultData} columns={columns} enableGrouping />,
};

export const MultiLevelColumnHeader: Story = {
  render: () => <AdvancedTable data={defaultData} columns={multiLevelColumns} />,
};

export const Filter: Story = {
  render: () => <AdvancedTable data={defaultData} columns={columns} enableColumnFilter />,
};

export const ReorderColumns: Story = {
  render: () => <AdvancedTable data={defaultData} columns={columns} enableColumnReordering />,
};

export const ScrollableColumns: Story = {
  render: () => <AdvancedTable data={dataForCols} columns={manyCols} scrollableColumns />,
};

export const ScrollableRows: Story = {
  render: () => <AdvancedTable data={dataForCols} columns={manyCols} scrollableRows />,
};

export const ScrollableRowsAndColumns: Story = {
  render: () => <AdvancedTable data={dataForCols} columns={manyCols} scrollableColumns scrollableRows />,
};

export const ScrollableRowsAndColumnsWithDifferentWidthAndHeight: Story = {
  render: () => (
    <AdvancedTable
      data={dataForCols}
      columns={manyCols}
      scrollableColumns
      scrollableRows
      fixedHeight="700px"
      fixedWidth="500px"
    />
  ),
};

export const PinnableColumns: Story = {
  render: () => (
    <AdvancedTable data={dataForCols} columns={manyCols} scrollableColumns scrollableRows enableColumnPinning />
  ),
};

export const KitchenSink: Story = {
  render: () => (
    <AdvancedTable
      data={dataForCols}
      columns={manyCols}
      enableRowSelection
      enableSorting
      enableResizing
      enableColumnPinning
      enableColumnFilter
      enableColumnReordering
      enableGrouping
      scrollableColumns
      scrollableRows
    />
  ),
};

export const Controlled = () => {
  const [, setTable] = useState<Table<AdvancedPerson>>();

  return <AdvancedTable data={defaultData} columns={columns} onTableReady={setTable} />;
};

export const ExampleCopy: Story = {
  render: () => (
    <AdvancedTable data={dataExample} enableRowSelection columns={columnsExample} enableResizing enableSorting />
  ),
};
