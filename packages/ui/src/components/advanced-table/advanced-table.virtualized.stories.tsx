import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { dataForColsSB, dataForRowsColsSB, manyColsSB, manyRowsColsSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Scrollable (Virtualized)',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const VirtualizedColumns: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForColsSB.length * manyColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyColsSB.length}</p>
      <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns showPagination />
    </>
  ),
};

export const VirtualizedRows: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForRowsColsSB.length * manyRowsColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForRowsColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyRowsColsSB.length}</p>
      <AdvancedTable data={dataForRowsColsSB} columns={manyRowsColsSB} scrollableRows fixedHeight="300px" />
    </>
  ),
};

export const VirtualizedRowsAndColumns: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForColsSB.length * manyColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyColsSB.length}</p>
      <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableRows scrollableColumns />
    </>
  ),
};

export const VirtualizedWithCustomHeightAndWidth: Story = {
  render: () => (
    <>
      <p className="typography-body-9 font-bold">Total cells: {dataForColsSB.length * manyColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total rows: {dataForColsSB.length}</p>
      <p className="typography-body-9 font-bold">Total columns: {manyColsSB.length}</p>
      <AdvancedTable
        data={dataForColsSB}
        columns={manyColsSB}
        scrollableRows
        scrollableColumns
        fixedHeight="700px"
        fixedWidth="500px"
      />
    </>
  ),
};

export const VirtualizedRowsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={dataForRowsColsSB} columns={manyRowsColsSB} scrollableRows fixedHeight="400px" enableSorting />
  ),
};

export const VirtualizedRowsWithSelection: Story = {
  render: () => (
    <AdvancedTable
      data={dataForRowsColsSB}
      columns={manyRowsColsSB}
      scrollableRows
      fixedHeight="400px"
      enableRowSelection
    />
  ),
};

export const VirtualizedRowsBordered: Story = {
  render: () => (
    <AdvancedTable data={dataForRowsColsSB} columns={manyRowsColsSB} scrollableRows fixedHeight="400px" bordered />
  ),
};

export const VirtualizedColumnsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns enableSorting showPagination />
  ),
};

export const VirtualizedRowsAndColumnsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableRows scrollableColumns enableSorting />
  ),
};

export const VirtualizedColumnsWithPinning: Story = {
  render: () => (
    <AdvancedTable data={dataForColsSB} columns={manyColsSB} scrollableColumns enableColumnPinning showPagination />
  ),
};

export const VirtualizedColumnsWithPinningAndSelection: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableColumns
      enableColumnPinning
      enableRowSelection
      showPagination
    />
  ),
};

export const VirtualizedColumnsWithPinningAndRowPinning: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableColumns
      enableColumnPinning
      enableRowPinning
      showPagination
    />
  ),
};

export const VirtualizedColumnsWithAllPinningOptions: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableColumns
      enableColumnPinning
      enableRowSelection
      enableRowPinning
      showPagination
    />
  ),
};

export const VirtualizedRowsAndColumnsWithPinning: Story = {
  render: () => (
    <AdvancedTable
      data={dataForColsSB}
      columns={manyColsSB}
      scrollableRows
      scrollableColumns
      enableColumnPinning
      enableRowSelection
      enableRowPinning
    />
  ),
};
