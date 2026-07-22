import { faker } from '@faker-js/faker';

import { Badge } from '../../badge/index.js';
import { Button } from '../../button/index.js';
import { DeleteIcon, EditIcon } from '../../icon/index.js';
import { Link } from '../../link/index.js';
import { AdvancedTableColumn } from '../advanced-table.types.js';

export type AdvancedPerson = {
  age?: number;
  dateOfBirth: string;
  email: string;
  firstName: string;
  id: string;
  lastName?: string;
  progress?: number;
  status?: 'active' | 'inactive' | 'deactivated';
  subRows?: AdvancedPerson[];
  visits?: number;
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Omit<AdvancedPerson, 'id'> => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  return {
    age: faker.number.int(40),
    dateOfBirth: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }).toISOString().slice(0, 10),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    firstName,
    lastName,
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<AdvancedPerson['status']>(['active', 'inactive', 'deactivated'])[0],
    visits: faker.number.int(1000),
  };
};

export function makePersonData(...lens: number[]) {
  const makeDataLevel = (depth = 0, parentId = ''): AdvancedPerson[] => {
    const len = lens[depth];
    return range(len).map((_, index): AdvancedPerson => {
      const id = parentId
        ? `${parentId}-${String(index + 1).padStart(2, '0')}`
        : `employee-${String(index + 1).padStart(2, '0')}`;
      return {
        ...newPerson(),
        id,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1, id) : undefined,
      };
    });
  };

  return makeDataLevel();
}

const STATUS_LABEL: Record<NonNullable<AdvancedPerson['status']>, string> = {
  active: 'Active',
  deactivated: 'Deactivated',
  inactive: 'Inactive',
};

const STATUS_COLOR: Record<NonNullable<AdvancedPerson['status']>, 'info' | 'muted' | 'warning'> = {
  active: 'info',
  deactivated: 'muted',
  inactive: 'warning',
};

function formatDateOfBirth(value: string) {
  return new Date(value).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Sorting/filter/pin/group are all table opt-in AND column opt-in.
const optIn = {
  enableColumnFilter: true,
  enableGrouping: true,
  enablePinning: true,
  enableSorting: true,
} as const;

export const personColumns: AdvancedTableColumn<AdvancedPerson>[] = [
  {
    key: 'firstName',
    title: 'Name',
    ...optIn,
    render: (value, row) => (row.lastName ? `${value} ${row.lastName}` : value),
  },
  { key: 'dateOfBirth', title: 'Date of Birth', ...optIn, render: value => formatDateOfBirth(value) },
  {
    key: 'status',
    title: 'Status',
    ...optIn,
    render: value =>
      value ? (
        <Badge soft color={STATUS_COLOR[value]}>
          {STATUS_LABEL[value]}
        </Badge>
      ) : null,
  },
  {
    key: 'email',
    title: 'Email',
    ...optIn,
    render: value => (
      <Link href={`mailto:${value}`} type="inline" underline={false} className="block truncate" title={value}>
        {value}
      </Link>
    ),
  },
  {
    enableColumnFilter: false,
    enableGrouping: false,
    enablePinning: false,
    enableSorting: false,
    key: 'id',
    render: (_value, row) => {
      const fullName = row.lastName ? `${row.firstName} ${row.lastName}` : row.firstName;
      return (
        <div className="flex gap-2">
          <Button
            aria-label={`Edit ${fullName}`}
            iconBefore={EditIcon}
            iconColor="hero"
            look="unstyled"
            onClick={() => alert(`Edit ${fullName}`)}
            size="medium"
          />
          <Button
            aria-label={`Delete ${fullName}`}
            iconBefore={DeleteIcon}
            iconColor="hero"
            look="unstyled"
            onClick={() => alert(`Delete ${fullName}`)}
            size="medium"
          />
        </div>
      );
    },
    title: 'Actions',
  },
];
