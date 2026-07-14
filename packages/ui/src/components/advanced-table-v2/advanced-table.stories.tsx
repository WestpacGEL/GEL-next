import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AdvancedPerson, makePersonData } from '../advanced-table/story-utils/fakerData.js';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedTableColumn } from './advanced-table.types.js';

const data = makePersonData(10);

const columns: AdvancedTableColumn<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name' },
  { key: 'lastName', title: 'Last Name' },
  { key: 'age', title: 'Age' },
  { key: 'visits', title: 'Visits' },
  { key: 'status', title: 'Status' },
  { key: 'progress', title: 'Profile Progress' },
];

const groupedColumns: AdvancedTableColumn<AdvancedPerson>[] = [
  {
    key: 'name',
    title: 'Name',
    columns: [
      { key: 'firstName', title: 'First Name' },
      { key: 'lastName', title: 'Last Name' },
    ],
  },
  {
    key: 'information',
    title: 'Information',
    columns: [
      { key: 'age', title: 'Age' },
      {
        key: 'moreInfo',
        title: 'More Info',
        columns: [
          { key: 'visits', title: 'Visits' },
          { key: 'status', title: 'Status' },
          { key: 'progress', title: 'Profile Progress' },
        ],
      },
    ],
  },
];

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

export const GroupedHeaders: Story = {
  render: () => <AdvancedTable data={data} columns={groupedColumns} caption="Grouped headers" />,
};

export const Uncontrolled: Story = {
  render: () => <AdvancedTable defaultData={data} columns={columns} caption="Uncontrolled (defaultData)" />,
};
