import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Selectable Rows',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const SelectableRows: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection showPagination />,
};

export const SelectableRowsExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection extraCellPadding showPagination />
  ),
};

export const SelectableRowsBordered: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection bordered showPagination />,
};

export const SelectableRowsBorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableRowSelection
      extraCellPadding
      bordered
      showPagination
    />
  ),
};

export const SelectableRowsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection enableSorting showPagination />
  ),
};

export const SelectableRowsWithResizing: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection enableResizing showPagination />
  ),
};

export const SelectableRowsWithReordering: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection enableColumnReordering showPagination />
  ),
};

export const SelectableRowsWithRowPinning: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection enableRowPinning showPagination />
  ),
};

export const SelectableRowsWithSortingBordered: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection enableSorting bordered showPagination />
  ),
};
