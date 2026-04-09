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
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering />,
};

export const ReorderingExtraCellPadding: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering extraCellPadding />,
};

export const ReorderingBordered: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering bordered />,
};

export const ReorderingBorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableColumnReordering extraCellPadding bordered />
  ),
};
