import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps } from './advanced-table.types.js';
import { AdvancedPerson, makeColumns, makeDataFromCols, makePersonData } from './utils/fakerData.js';

const columns: AdvancedColumnProps<AdvancedPerson>[] = [
  {
    key: 'name',
    title: 'Name',
    enableSorting: false,
    columns: [
      { key: 'firstName', title: 'First Name' },
      { key: 'lastName', title: 'Last Name' },
    ],
  },
  {
    key: 'information',
    title: 'Information',
    enableSorting: false,
    columns: [
      { key: 'age', title: 'Age' },
      {
        key: 'moreInfo',
        title: 'More Info',
        enableSorting: false,
        columns: [
          { key: 'visits', title: 'Visits' },
          { key: 'status', title: 'Status' },
          { key: 'progress', title: 'Profile Progress' },
        ],
      },
    ],
  },
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

const defaultData = makePersonData(100);

const manyCols = makeColumns(100);
const dataForCols = makeDataFromCols(100, manyCols);

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AdvancedTable<AdvancedPerson> data={defaultData} columns={columns} resizable sortable subRowKey="subRows" />
  ),
};

export const Virtualized: Story = {
  render: () => (
    <AdvancedTable<ReturnType<typeof makeDataFromCols>[0]>
      data={dataForCols}
      columns={manyCols}
      resizable
      sortable
      scrollableColumns
      scrollableRows
      subRowKey="subRows"
    />
  ),
};
