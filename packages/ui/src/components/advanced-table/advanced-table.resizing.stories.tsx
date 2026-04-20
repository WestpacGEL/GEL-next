import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Resizing',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const ResizingColumns: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableResizing showPagination />,
};

export const ExtraCellPadding: Story = {
  render: () => (
    <AdvancedTable extraCellPadding data={defaultDataSB} columns={columnsSB} enableResizing showPagination />
  ),
};

export const Bordered: Story = {
  render: () => <AdvancedTable bordered data={defaultDataSB} columns={columnsSB} enableResizing showPagination />,
};

export const BorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} extraCellPadding bordered enableResizing showPagination />
  ),
};

export const ResizingWithSorting: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableResizing enableSorting showPagination />,
};

export const ResizingWithSelection: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableResizing enableRowSelection showPagination />
  ),
};

export const ResizingWithReordering: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableResizing enableColumnReordering showPagination />
  ),
};

export const ResizingWithSortingAndSelection: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableResizing
      enableSorting
      enableRowSelection
      showPagination
    />
  ),
};
