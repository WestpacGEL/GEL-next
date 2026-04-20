import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, dataForColsSB, defaultDataSB, manyColsSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Menu Options',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const AllOptions: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnPinning
      enableColumnFilter
      enableGrouping
      showPagination
    />
  ),
};

export const FilterOnly: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnFilter showPagination />,
};

export const ColumnPinningOnly: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnPinning showPagination />,
};

export const ColumnPinningWithScrollable: Story = {
  render: () => (
    <AdvancedTable data={dataForColsSB} columns={manyColsSB} enableColumnPinning scrollableColumns scrollableRows />
  ),
};

export const GroupingOnly: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableGrouping showPagination />,
};

export const AllOptionsBordered: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnPinning
      enableColumnFilter
      enableGrouping
      bordered
      showPagination
    />
  ),
};

export const AllOptionsExtraPadding: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnPinning
      enableColumnFilter
      enableGrouping
      extraCellPadding
      showPagination
    />
  ),
};

export const AllOptionsWithSorting: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnPinning
      enableColumnFilter
      enableGrouping
      enableSorting
      showPagination
    />
  ),
};

export const AllOptionsWithSelection: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnPinning
      enableColumnFilter
      enableGrouping
      enableRowSelection
      showPagination
    />
  ),
};

export const AllOptionsWithRowPinning: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableColumnPinning
      enableColumnFilter
      enableGrouping
      enableRowPinning
      showPagination
    />
  ),
};

export const FilterWithSorting: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnFilter enableSorting showPagination />
  ),
};
