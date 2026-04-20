import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Reordering Columns',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const Reordering: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering showPagination />,
};

export const ReorderingExtraCellPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering extraCellPadding showPagination />
  ),
};

export const ReorderingBordered: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering bordered showPagination />
  ),
};

export const ReorderingBorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnReordering
      extraCellPadding
      bordered
      showPagination
    />
  ),
};

export const ReorderingWithSorting: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering enableSorting showPagination />
  ),
};

export const ReorderingWithSelection: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering enableRowSelection showPagination />
  ),
};

export const ReorderingWithResizing: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering enableResizing showPagination />
  ),
};

export const ReorderingWithSortingAndSelection: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnReordering
      enableSorting
      enableRowSelection
      showPagination
    />
  ),
};
