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
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection />,
};

export const SelectableRowsExtraPadding: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection extraCellPadding />,
};

export const SelectableRowsBordered: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection bordered />,
};

export const SelectableRowsBorderedExtraPadding: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableRowSelection extraCellPadding bordered />,
};
