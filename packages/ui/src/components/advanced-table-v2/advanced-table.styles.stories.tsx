import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(10);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Styles',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/** Default: transparent background (hover highlight only), default padding, no borders. */
export const Default: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="Default" />,
};

export const Striped: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="Striped" background="striped" />,
};

export const Filled: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="Filled" background="filled" />,
};

export const Bordered: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="Bordered" bordered />,
};

export const LargePadding: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="Large padding" padding="large" />,
};

/**
 * `fillContainer={false}` — the table sizes itself intrinsically to its content
 * and sits within the parent without stretching to fill it.
 */
export const IntrinsicWidth: Story = {
  render: () => (
    <div style={{ width: 1200, border: '1px dashed #ccc', padding: 8 }}>
      <AdvancedTable
        data={data}
        columns={columns}
        caption="Intrinsic width (fillContainer=false)"
        fillContainer={false}
      />
    </div>
  ),
};

/**
 * `fillContainer` (default) — the table stretches to 100% of its parent container.
 */
export const FillContainer: Story = {
  render: () => (
    <div style={{ width: 1200, border: '1px dashed #ccc', padding: 8 }}>
      <AdvancedTable data={data} columns={columns} caption="Fill container" fillContainer />
    </div>
  ),
};
