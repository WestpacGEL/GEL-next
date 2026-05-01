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

/**
 * Default width: the table sizes itself to the sum of its column widths and
 * sits within the parent without stretching.
 */
export const ColumnSumWidth: Story = {
  render: () => (
    <div style={{ width: 1200, border: '1px dashed #ccc', padding: 8 }}>
      <AdvancedTable data={defaultDataSB} columns={columnsSB} fillContainer={false} showPagination />
    </div>
  ),
};

/**
 * `fillContainer` makes the table stretch to 100% of its parent container
 * (only when virtualization is off, the table itself goes 100%).
 */
export const FillContainer: Story = {
  render: () => (
    <div style={{ width: 1200, border: '1px dashed #ccc', padding: 8 }}>
      <AdvancedTable data={defaultDataSB} columns={columnsSB} fillContainer showPagination />
    </div>
  ),
};

/**
 * `fillContainer` with `scrollableRows`: the outer scroll container fills the
 * parent, header/body cells flex to consume any trailing space, and rows are
 * still virtualized vertically.
 */
export const FillContainerScrollableRows: Story = {
  render: () => (
    <div style={{ width: 1200, border: '1px dashed #ccc', padding: 8 }}>
      <AdvancedTable data={defaultDataSB} columns={columnsSB} fillContainer scrollableRows fixedHeight="400px" />
    </div>
  ),
};

/**
 * `fillContainer` with `scrollableColumns`: the outer scroll container fills
 * the parent while the inner table keeps its pixel width to drive horizontal
 * virtualization (so horizontal scrolling still works).
 */
export const FillContainerScrollableColumns: Story = {
  render: () => (
    <div style={{ width: 600, border: '1px dashed #ccc', padding: 8 }}>
      <AdvancedTable data={defaultDataSB} columns={columnsSB} fillContainer scrollableColumns showPagination />
    </div>
  ),
};
