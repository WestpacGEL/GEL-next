/* eslint-disable react-hooks/rules-of-hooks */
import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import {
  type AdvancedTableColumnFiltersState,
  type AdvancedTablePaginationState,
  type AdvancedTableSortingState,
} from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(10);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <AdvancedTable caption="People" columns={columns} data={data} />,
};

/**
 * Table cells will render the value by default. Use the `render` column prop to provide a custom component to customise the render value.
 */
export const CustomCellRender: Story = {
  render: () => (
    <AdvancedTable
      caption="Custom cell rendering"
      columns={[
        { key: 'firstName', title: 'First Name' },
        { key: 'lastName', title: 'Last Name' },
        { key: 'status', title: 'Status', render: value => <span className="capitalize">{value ?? '—'}</span> },
        { key: 'progress', title: 'Profile Progress', render: value => <span>{value ?? 0}%</span> },
      ]}
      data={data}
    />
  ),
};

/**
 * An uncontrolled table will handle the sorting state inside the component and cannot be updated. This is good for render-and-forget
 * page elements eg. table of interest rates, states, etc.
 *
 * You can set the initial values by using the `default*` props — eg. `defaultSorting` and `defaultPagination` below.
 */
export const Uncontrolled: Story = {
  render: () => (
    <AdvancedTable
      caption="Uncontrolled (defaultData)"
      columns={columns}
      defaultData={data}
      defaultPagination={{ pageIndex: 0, pageSize: 5 }}
      defaultSorting={[{ id: 'firstName', desc: false }]}
      enableColumnFilter
      enableSorting
    />
  ),
};

const TOTAL_ROWS = 47;
const allRows = makePersonData(TOTAL_ROWS);

type AdvancedPersonFieldValue = string | number | undefined;

function applyColumnFilters(rows: typeof allRows, filters: AdvancedTableColumnFiltersState): typeof allRows {
  return filters.reduce((filteredRows, filter) => {
    const needle = filter.value.trim().toLowerCase();
    if (!needle) return filteredRows;
    return filteredRows.filter(row => {
      const value = row[filter.id as keyof AdvancedPerson] as AdvancedPersonFieldValue;
      return String(value ?? '')
        .toLowerCase()
        .includes(needle);
    });
  }, rows);
}

function applySorting(rows: typeof allRows, sorting: AdvancedTableSortingState): typeof allRows {
  if (!sorting.length) return rows;
  const { id, desc } = sorting[0];
  return [...rows].sort((a, b) => {
    const av = a[id as keyof AdvancedPerson] as AdvancedPersonFieldValue;
    const bv = b[id as keyof AdvancedPerson] as AdvancedPersonFieldValue;
    const cmp =
      typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av ?? '').localeCompare(String(bv ?? ''));
    return desc ? -cmp : cmp;
  });
}

function fetchPeoplePage(
  pageIndex: number,
  pageSize: number,
  sorting: AdvancedTableSortingState,
  columnFilters: AdvancedTableColumnFiltersState,
) {
  const matching = applySorting(applyColumnFilters(allRows, columnFilters), sorting);
  const start = pageIndex * pageSize;
  return new Promise<{ rows: typeof allRows; rowCount: number }>(resolve => {
    setTimeout(() => resolve({ rows: matching.slice(start, start + pageSize), rowCount: matching.length }), 400);
  });
}

/** Mock API a like to `useQuery`. */
function usePeopleQuery(
  pagination: AdvancedTablePaginationState,
  sorting: AdvancedTableSortingState,
  columnFilters: AdvancedTableColumnFiltersState,
) {
  const [data, setData] = useState<{ rows: typeof allRows; rowCount: number }>({ rows: [], rowCount: TOTAL_ROWS });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    void fetchPeoplePage(pagination.pageIndex, pagination.pageSize, sorting, columnFilters).then(response => {
      if (cancelled) return;
      setData(response);
      setIsLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [pagination, sorting, columnFilters]);

  return { data, isLoading };
}

/**
 * An example table with API pagination, sorting, and filtering. Mimics using a `useQuery`-style hook backed with a mocked API.
 */
export const ServerAPIExample: Story = {
  render: () => {
    const [pagination, setPagination] = useState<AdvancedTablePaginationState>({ pageIndex: 0, pageSize: 10 });
    const [sorting, setSorting] = useState<AdvancedTableSortingState>([]);
    const [columnFilters, setColumnFilters] = useState<AdvancedTableColumnFiltersState>([]);

    const { data, isLoading } = usePeopleQuery(pagination, sorting, columnFilters);

    const handleSortingChange = (next: AdvancedTableSortingState) => {
      setSorting(next);
      setPagination(prev => ({ ...prev, pageIndex: 0 }));
    };

    const handleColumnFiltersChange = (next: AdvancedTableColumnFiltersState) => {
      setColumnFilters(next);
      setPagination(prev => ({ ...prev, pageIndex: 0 }));
    };

    return (
      <AdvancedTable
        caption="People (server-paginated, -sorted, -filtered)"
        columnFilters={columnFilters}
        columns={columns}
        data={data.rows}
        enableColumnFilter
        enableSorting
        loading={isLoading}
        manualFiltering
        manualPagination
        manualSorting
        onColumnFiltersChange={handleColumnFiltersChange}
        onPaginationChange={setPagination}
        onSortingChange={handleSortingChange}
        pagination={pagination}
        rowCount={data.rowCount}
        sorting={sorting}
      />
    );
  },
};
