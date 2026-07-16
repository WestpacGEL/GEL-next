import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(10);

const columns = personColumns;

// Distinct title so it does not collide with the existing (legacy) Advanced Table stories.
const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <AdvancedTable data={data} columns={columns} caption="People" />,
};

export const CustomCellRender: Story = {
  render: () => (
    <AdvancedTable
      data={data}
      caption="Custom cell rendering"
      columns={[
        { key: 'firstName', title: 'First Name' },
        { key: 'lastName', title: 'Last Name' },
        { key: 'status', title: 'Status', render: value => <span className="capitalize">{value ?? '—'}</span> },
        { key: 'progress', title: 'Profile Progress', render: value => <span>{value ?? 0}%</span> },
      ]}
    />
  ),
};

export const Uncontrolled: Story = {
  render: () => <AdvancedTable defaultData={data} columns={columns} caption="Uncontrolled (defaultData)" />,
};
