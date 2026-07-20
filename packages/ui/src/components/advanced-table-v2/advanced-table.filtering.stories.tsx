import { type Meta, StoryFn, type StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';

import { AdvancedTable } from './advanced-table.component.js';
import { type AdvancedTableColumnFiltersState } from './advanced-table.types.js';
import { type AdvancedPerson, makePersonData, personColumns } from './story-utils/index.js';

const data = makePersonData(25);

const columns = personColumns;

const meta: Meta<typeof AdvancedTable> = {
  title: 'WIP/Advanced Table v2/Column Menu/Filtering',
  component: AdvancedTable,
  tags: ['autodocs'],
  decorators: [(Story: StoryFn) => <Story />],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `enableColumnFilter` adds a menu to every column header with a filter input
 * that narrows visible rows as you type.
 */
export const Default: Story = {
  render: () => <AdvancedTable caption="People" columns={columns} data={data} enableColumnFilter />,
};

/** Applies each active column filter as a case-insensitive substring match — the same
 * default comparator the table itself uses — but against the parent's own copy of `data`. */
function applyColumnFilters(rows: AdvancedPerson[], filters: AdvancedTableColumnFiltersState): AdvancedPerson[] {
  return filters.reduce((filteredRows, filter) => {
    const needle = filter.value.trim().toLowerCase();
    if (!needle) return filteredRows;
    return filteredRows.filter(row => {
      const value = row[filter.id as keyof AdvancedPerson] as string | number | undefined;
      return String(value ?? '')
        .toLowerCase()
        .includes(needle);
    });
  }, rows);
}

/**
 * Controlled + manual: the parent owns filter state via the `columnFilters` /
 * `onColumnFiltersChange` triple AND performs the actual filtering itself
 * (`manualFiltering`), passing back only the matching rows. Useful when
 * filtering needs custom logic or happens server-side.
 */
export const Controlled: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [columnFilters, setColumnFilters] = useState<AdvancedTableColumnFiltersState>([]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const filteredData = useMemo(() => applyColumnFilters(data, columnFilters), [columnFilters]);

    return (
      <>
        <p className="pb-2 typography-body-8">
          Parent owns filtering — {filteredData.length} of {data.length} rows shown. Active filters:{' '}
          {columnFilters.length ? columnFilters.map(f => `${f.id}="${f.value}"`).join(', ') : 'none'}
        </p>
        <AdvancedTable
          caption="Controlled filtering (filtered in the parent)"
          columnFilters={columnFilters}
          columns={columns}
          data={filteredData}
          enableColumnFilter
          manualFiltering
          onColumnFiltersChange={setColumnFilters}
        />
      </>
    );
  },
};
