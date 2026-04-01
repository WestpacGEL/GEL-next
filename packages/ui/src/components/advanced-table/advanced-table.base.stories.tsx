import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { Table } from '@tanstack/react-table';
import { useState } from 'react';

import { AdvancedPerson } from './story-utils/fakerData.js';
import { columnsExample, dataExample } from './story-utils/otherData.js';
import {
  columnsSB,
  dataForColsSB,
  defaultDataSB,
  editableColumnsSB,
  expandableDataSB,
  manyColsSB,
  multiLevelColumnsSB,
} from './story-utils/storyData.js';

import { AdvancedTable } from './index.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicTable: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} />,
};

// export const Resizeable: Story = {
//   render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableResizing />,
// };

// export const Sortable: Story = {
//   render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting />,
// };

// export const SelectableRows: Story = {
//   render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection />,
// };

// export const ExpandableRows: Story = {
//   render: () => <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" />,
// };

// export const EditableCells = () => {
//   const [localData, setLocalData] = useState(defaultDataSB);

//   return <AdvancedTable data={localData} columns={editableColumnsSB} onDataChange={setLocalData} />;
// };

// export const ExpandableRowsNotPaginating: Story = {
//   render: () => (
//     <AdvancedTable
//       data={expandableDataSB}
//       columns={columnsSB}
//       subRowKey="subRows"
//       tableOptions={{ paginateExpandedRows: false }}
//     />
//   ),
// };

// export const Grouping: Story = {
//   render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableGrouping />,
// };

// export const MultiLevelColumnHeader: Story = {
//   render: () => <AdvancedTable data={defaultDataSB} columns={multiLevelColumnsSB} />,
// };

// export const Filter: Story = {
//   render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnFilter />,
// };

// export const ReorderColumns: Story = {
//   render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering />,
// };

// export const ScrollableColumns: Story = {
//   render: () => <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns />,
// };

// export const ScrollableRows: Story = {
//   render: () => <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableRows />,
// };

// export const ScrollableRowsAndColumns: Story = {
//   render: () => <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns scrollableRows />,
// };

// export const ScrollableRowsAndColumnsWithDifferentWidthAndHeight: Story = {
//   render: () => (
//     <AdvancedTable
//       data={dataForColsSB}
//       columns={manyColsSB}
//       scrollableColumns
//       scrollableRows
//       fixedHeight="700px"
//       fixedWidth="500px"
//     />
//   ),
// };

// export const PinnableColumns: Story = {
//   render: () => (
//     <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns scrollableRows enableColumnPinning />
//   ),
// };

// export const KitchenSink: Story = {
//   render: () => (
//     <AdvancedTable
//       data={dataForColsSB}
//       columns={manyColsSB}
//       enableRowSelection
//       enableSorting
//       enableResizing
//       enableColumnPinning
//       enableColumnFilter
//       enableColumnReordering
//       enableGrouping
//       scrollableColumns
//       scrollableRows
//     />
//   ),
// };

// export const Controlled = () => {
//   const [, setTable] = useState<Table<AdvancedPerson>>();

//   return <AdvancedTable data={defaultDataSB} columns={columnsSB} onTableReady={setTable} />;
// };

// export const ExampleCopy: Story = {
//   render: () => (
//     <AdvancedTable data={dataExample} enableRowSelection columns={columnsExample} enableResizing enableSorting />
//   ),
// };
