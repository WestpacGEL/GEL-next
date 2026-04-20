import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB, dataForRowsColsSB, manyRowsColsSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Row Pinning',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const RowPinning: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowPinning showPagination />,
};

export const RowPinningWithSelection: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowPinning enableRowSelection showPagination />
  ),
};

export const RowPinningWithSorting: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowPinning enableSorting showPagination />
  ),
};

export const RowPinningWithScrollableRows: Story = {
  render: () => (
    <AdvancedTable
      data={dataForRowsColsSB}
      columns={manyRowsColsSB}
      enableRowPinning
      scrollableRows
      fixedHeight="400px"
    />
  ),
};

export const RowPinningWithScrollableRowsAndSelection: Story = {
  render: () => (
    <AdvancedTable
      data={dataForRowsColsSB}
      columns={manyRowsColsSB}
      enableRowPinning
      enableRowSelection
      scrollableRows
      fixedHeight="400px"
    />
  ),
};

export const RowPinningBordered: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowPinning bordered showPagination />,
};

export const RowPinningExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowPinning extraCellPadding showPagination />
  ),
};

export const RowPinningPrePinned: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableRowPinning
      initialPinnedRows={['0', '3']}
      showPagination
    />
  ),
};

export const RowPinningStriped: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowPinning striped showPagination />,
};
