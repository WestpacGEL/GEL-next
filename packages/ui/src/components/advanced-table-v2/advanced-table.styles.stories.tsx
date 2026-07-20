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

/**
 * Default: transparent background (hover highlight only), default padding, no
 * borders. Use the Controls panel to toggle `background`, `padding`, and `bordered` live.
 */
export const Default: Story = {
  args: {
    background: 'transparent',
    padding: 'default',
    bordered: false,
  },
  argTypes: {
    background: {
      control: 'radio',
      options: ['transparent', 'striped', 'filled'],
    },
    padding: {
      control: 'radio',
      options: ['default', 'large'],
    },
    bordered: {
      control: 'boolean',
    },
  },
  render: ({ background, padding, bordered }) => (
    <AdvancedTable
      background={background}
      bordered={bordered}
      caption="Default"
      columns={columns}
      data={data}
      padding={padding}
    />
  ),
};

export const Striped: Story = {
  render: () => <AdvancedTable background="striped" caption="Striped" columns={columns} data={data} />,
};

export const Filled: Story = {
  render: () => <AdvancedTable background="filled" caption="Filled" columns={columns} data={data} />,
};

export const Bordered: Story = {
  render: () => <AdvancedTable bordered caption="Bordered" columns={columns} data={data} />,
};

export const LargePadding: Story = {
  render: () => <AdvancedTable caption="Large padding" columns={columns} data={data} padding="large" />,
};

/**
 * `fillContainer={false}` — the table sizes itself intrinsically to its content
 * and sits within the parent without stretching to fill it.
 */
export const IntrinsicWidth: Story = {
  render: () => (
    <div
      style={{
        border: '1px dashed #ccc',
        padding: 8,
        width: 1200,
      }}
    >
      <AdvancedTable
        caption="Intrinsic width (fillContainer=false)"
        columns={columns}
        data={data}
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
    <div
      style={{
        border: '1px dashed #ccc',
        padding: 8,
        width: 1200,
      }}
    >
      <AdvancedTable caption="Fill container" columns={columns} data={data} fillContainer />
    </div>
  ),
};
