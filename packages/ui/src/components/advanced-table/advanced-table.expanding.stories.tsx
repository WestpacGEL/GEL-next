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
  render: () => <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" />,
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
      />
    </>
  ),
};

export const ExpandableRowsExtraPadding: Story = {
  render: () => <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" extraCellPadding />,
};

export const ExpandableRowsBordered: Story = {
  render: () => <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" bordered />,
};

export const ExpandableRowsBorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={expandableDataSB} columns={columnsSB} subRowKey="subRows" extraCellPadding bordered />
  ),
};
