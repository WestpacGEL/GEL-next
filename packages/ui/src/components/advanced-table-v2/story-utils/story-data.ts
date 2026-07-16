import { faker } from '@faker-js/faker';

import { AdvancedTableColumn } from '../advanced-table.types.js';

export type AdvancedPerson = {
  id: string;
  firstName: string;
  lastName?: string;
  age?: number;
  visits?: number;
  status?: 'relationship' | 'complicated' | 'single';
  progress?: number;
  subRows?: AdvancedPerson[];
};

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = (): Omit<AdvancedPerson, 'id'> => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int(40),
  visits: faker.number.int(1000),
  progress: faker.number.int(100),
  status: faker.helpers.shuffle<AdvancedPerson['status']>(['relationship', 'complicated', 'single'])[0],
});

export function makePersonData(...lens: number[]) {
  // Deterministic ids (not faker) so story output — and any `rowKey` demo —
  // stays stable across reloads.
  const makeDataLevel = (depth = 0, parentId = ''): AdvancedPerson[] => {
    const len = lens[depth];
    return range(len).map((_, index): AdvancedPerson => {
      const id = parentId ? `${parentId}-${index}` : `${index}`;
      return {
        ...newPerson(),
        id,
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1, id) : undefined,
      };
    });
  };

  return makeDataLevel();
}

// Filter/pin/group are table opt-in AND column opt-in.
const optIn = { enableColumnFilter: true, enablePinning: true, enableGrouping: true } as const;

/** Shared column set used across the v2 stories. */
export const personColumns: AdvancedTableColumn<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name', ...optIn },
  { key: 'lastName', title: 'Last Name', ...optIn },
  { key: 'age', title: 'Age', ...optIn },
  { key: 'visits', title: 'Visits', ...optIn },
  { key: 'status', title: 'Status', ...optIn },
  { key: 'progress', title: 'Profile Progress', ...optIn },
];
