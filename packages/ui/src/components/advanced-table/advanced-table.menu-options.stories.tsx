import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Menu Options',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const AllOptions: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnPinning enableColumnFilter enableGrouping />
  ),
};

export const FilterOnly: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnFilter />,
};

export const PinningOnly: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnPinning />,
};

export const GroupingOnly: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableGrouping />,
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
    />
  ),
};

export const FilterWithSorting: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnFilter enableSorting />,
};
