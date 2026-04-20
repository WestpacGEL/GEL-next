import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, expandableDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Expanding Rows',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const ExpandableRows: Story = {
  render: () => <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" showPagination />,
};

export const ExpandableRowsNotPaginating: Story = {
  render: () => (
    <>
      <p className="typography-body-8 underline">
        This version of expansion does not add pagination for expanded rows, it instead keeps them on the current page
        and extends the height of the table.
      </p>
      <AdvancedTable
        data={expandableDataSB}
        columns={columnsSB}
        subRowKey="subRows"
        tableOptions={{ paginateExpandedRows: false }}
        showPagination
      />
    </>
  ),
};

export const ExpandableRowsExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" extraCellPadding showPagination />
  ),
};

export const ExpandableRowsBordered: Story = {
  render: () => (
    <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" bordered showPagination />
  ),
};

export const ExpandableRowsBorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable
      data={expandableDataSB}
      columns={columnsSB}
      subRowKey="subRows"
      extraCellPadding
      bordered
      showPagination
    />
  ),
};

export const ExpandableRowsWithSorting: Story = {
  render: () => (
    <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" enableSorting showPagination />
  ),
};

export const ExpandableRowsWithSelection: Story = {
  render: () => (
    <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" enableRowSelection showPagination />
  ),
};

export const ExpandableRowsWithSortingAndSelection: Story = {
  render: () => (
    <AdvancedTable
      data={expandableDataSB}
      columns={columnsSB}
      subRowKey="subRows"
      enableSorting
      enableRowSelection
      showPagination
    />
  ),
};

export const ExpandableRowsWithResizing: Story = {
  render: () => (
    <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" enableResizing showPagination />
  ),
};
