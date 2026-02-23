import { faker } from '@faker-js/faker';

const range = (len: number) => {
  const arr: number[] = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

export type AdvancedPerson = {
  firstName: string;
  lastName?: string;
  age?: number;
  visits?: number;
  status?: 'relationship' | 'complicated' | 'single';
  progress?: number;
  subRows?: AdvancedPerson[];
};

const newPerson = (): AdvancedPerson => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<AdvancedPerson['status']>(['relationship', 'complicated', 'single'])[0],
  };
};

export function makePersonData(...lens: number[]) {
  const makeDataLevel = (depth = 0): AdvancedPerson[] => {
    const len = lens[depth];
    return range(len).map((_d): AdvancedPerson => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      };
    });
  };

  return makeDataLevel();
}

export const makeColumns = (num: number) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  [...Array(num)].map((_, i) => {
    return {
      key: i.toString(),
      title: 'Column ' + i.toString(),
    };
  });

export const makeDataFromCols = (num: number, columns: ReturnType<typeof makeColumns>) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  [...Array(num)].map(() => ({
    ...Object.fromEntries(columns.map(col => [col.key, faker.person.firstName()])),
  }));
