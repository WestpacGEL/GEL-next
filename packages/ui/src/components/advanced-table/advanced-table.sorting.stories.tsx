import { Meta, StoryFn, StoryObj } from '@storybook/react-vite';

import { Link } from '../index.js';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps } from './advanced-table.types.js';
import { AdvancedPerson } from './story-utils/fakerData.js';
import { columnsSB, defaultDataSB } from './story-utils/storyData.js';

const meta: Meta<typeof AdvancedTable> = {
  title: 'Components/Advanced Table/Sorting',
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<unknown>;

export const Sortable: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting showPagination />,
};

export const SortableExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting extraCellPadding showPagination />
  ),
};

export const SortableBordered: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting bordered showPagination />,
};

export const SortableBorderedExtraPadding: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting extraCellPadding bordered showPagination />
  ),
};

export const SortableStriped: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting striped showPagination />,
};

export const SortableWithSelection: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting enableRowSelection showPagination />
  ),
};

export const SortableWithResizing: Story = {
  render: () => <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting enableResizing showPagination />,
};

export const SortableWithReordering: Story = {
  render: () => (
    <AdvancedTable data={defaultDataSB} columns={columnsSB} enableSorting enableColumnReordering showPagination />
  ),
};

export const SortableWithSelectionAndResizing: Story = {
  render: () => (
    <AdvancedTable
      data={defaultDataSB}
      columns={columnsSB}
      enableSorting
      enableRowSelection
      enableResizing
      showPagination
    />
  ),
};

export const SortingFunctionality: Story = {
  render: () => {
    const columnsSortingExample: AdvancedColumnProps<AdvancedPerson>[] = [
      { key: 'firstName', title: 'Inverted', invertSorting: true },
      { key: 'lastName', title: 'Desc First', sortDescFirst: true },
      { key: 'age', title: 'SortingFn', sortingFn: 'alphanumeric' },
      { key: 'visits', title: 'MultiSort', enableMultiSort: true },
      { key: 'status', title: 'MultiSort', enableMultiSort: true },
      { key: 'progress', title: 'SortDisabled', enableSorting: false },
    ];
    return (
      <>
        <p className="pb-1 typography-body-8">
          Additional sorting functionality can be handled using the following props from TanStack Table in your column
          definition (some of these props can be used together):
        </p>
        <div className="w-fit rounded border border-border-muted-mild bg-background-pale p-1 pb-1">
          <code>
            invertSorting <br /> sortDescFirst <br /> sortingFn (as Tanstack built-in or custom fn) <br /> sortUndefined{' '}
            <br /> enableSorting <br />
            enableMultiSort
          </code>
        </div>
        <p className="pt-1 typography-body-8">
          For more information on these props, please refer to the TanStack Table{' '}
          <Link href="https://tanstack.com/table/latest/docs/guide/sorting#sorting-fns" type="inline">
            documentation
          </Link>
          .
        </p>
        <AdvancedTable data={defaultDataSB} columns={columnsSortingExample} enableSorting showPagination />
      </>
    );
  },
};
