import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Styles',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const DefaultStyle: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} showPagination />,
};

export const ExtraCellPadding: Story = {
  render: () => <AdvancedTable extraCellPadding data={defaultDataSB} columns={columnsSB} showPagination />,
};

export const Bordered: Story = {
  render: () => <AdvancedTable bordered data={defaultDataSB} columns={columnsSB} showPagination />,
};

export const BorderedExtraPadding: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} extraCellPadding bordered showPagination />,
};

export const Striped: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} striped showPagination />,
};

export const StripedBordered: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} striped bordered showPagination />,
};

export const StripedBorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} striped bordered extraCellPadding showPagination />
  ),
};
