import { AdvancedColumnProps } from '../advanced-table.types.js';

import { AdvancedPerson, makeColumns, makeDataFromCols, makePersonData } from './fakerData.js';

export const multiLevelColumnsSB: AdvancedColumnProps<AdvancedPerson>[] = [
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

export const columnsSB: AdvancedColumnProps<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name' },
  { key: 'lastName', title: 'Last Name' },
  { key: 'age', title: 'Age' },
  { key: 'visits', title: 'Visits' },
  { key: 'status', title: 'Status' },
  { key: 'progress', title: 'Profile Progress' },
];

export const editableColumnsSB: AdvancedColumnProps<AdvancedPerson>[] = [
  { key: 'firstName', title: 'First Name', editable: true },
  { key: 'lastName', title: 'Last Name', editable: true },
  { key: 'age', title: 'Age', editable: true },
  { key: 'visits', title: 'Visits', editable: true },
  { key: 'status', title: 'Status', editable: true },
  { key: 'progress', title: 'Profile Progress', editable: true },
];

export const defaultDataSB = makePersonData(100);
export const expandableDataSB = makePersonData(10, 10, 10, 10, 10);

export const manyColsSB = makeColumns(100);
export const dataForColsSB = makeDataFromCols(100, manyColsSB);

export const manyRowsColsSB = makeColumns(5);
export const dataForRowsColsSB = makeDataFromCols(1000, manyRowsColsSB);
