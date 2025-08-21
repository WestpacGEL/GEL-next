import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps } from './advanced-table.types.js';

type Person = {
  firstName: string;
  lastName?: string;
  age?: number;
  visits?: number;
  status?: string;
  progress?: number;
  subRows?: Person[];
};

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    subRows: [
      {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
      },
    ],
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'Single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'Complicated',
    progress: 10,
  },
];

const columns: AdvancedColumnProps<Person>[] = [
  {
    key: 'name',
    title: 'Name',
    columns: [
      {
        key: 'name2',
        title: 'Name 2',
        columns: [
          { key: 'firstName', title: 'First Name' },
          { key: 'lastName', title: 'Last Name' },
        ],
      },
    ],
  },
  { key: 'age', title: 'Age' },
  { key: 'visits', title: 'Visits' },
  { key: 'status', title: 'Status' },
  { key: 'progress', title: 'Profile Progress' },
];

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <AdvancedTable<Person> data={defaultData} columns={columns} resizable sortable subRowKey="subRows" />,
};
