/**
 * Tests for the AdvancedTable rebuild.
 *
 * Spec: _plan/reconciled-spec.md · Delivery: _plan/tickets.md
 *
 * Single seam: render <AdvancedTable> with React Testing Library and drive it
 * exclusively through accessible roles and userEvent. Assert user-observable
 * behavior only — never internal sub-components, hooks, utils, or the engine.
 *
 * Convert each it.todo to a real test red-green as its feature ticket is built.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedTableColumn, AdvancedTableProps } from './advanced-table.types.js';

type TestData = { name: string; age: number };

const testColumns: AdvancedTableColumn<TestData>[] = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
];

const testData: TestData[] = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 40 },
];

const groupedColumns: AdvancedTableColumn<TestData>[] = [
  {
    key: 'group',
    title: 'Group',
    columns: [
      { key: 'name', title: 'Name' },
      { key: 'age', title: 'Age' },
    ],
  },
];

describe('AdvancedTable', () => {
  describe('rendering', () => {
    it('renders column headers and one row per data item from data + columns', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(4);
    });

    it('renders cell values resolved from each column key', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
    });

    it('renders custom cell content via a column render(value, row) function', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name', render: value => <span>NAME:{value}</span> },
        { key: 'age', title: 'Age' },
      ];
      render(<AdvancedTable columns={columns} data={testData} />);
      expect(screen.getByText('NAME:John')).toBeInTheDocument();
    });

    it('renders grouped multi-level headers from nested column definitions', () => {
      render(<AdvancedTable columns={groupedColumns} data={testData} />);
      expect(screen.getByText('Group')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Age')).toBeInTheDocument();
      // two header rows: the group band and the leaf columns
      const thead = screen.getByRole('table').querySelector('thead') as HTMLElement;
      expect(within(thead).getAllByRole('row')).toHaveLength(2);
      // the group header spans both leaf columns
      expect(screen.getByText('Group').closest('th')).toHaveAttribute('colspan', '2');
    });

    it('exposes an accessible name (caption) for the table', () => {
      render(<AdvancedTable columns={testColumns} data={testData} caption="People" />);
      expect(screen.getByRole('table', { name: 'People' })).toBeInTheDocument();
    });

    it('renders two tables on one page without duplicate DOM ids', () => {
      const { container } = render(
        <>
          <AdvancedTable columns={testColumns} data={testData} />
          <AdvancedTable columns={testColumns} data={testData} />
        </>,
      );
      const tables = container.querySelectorAll('table');
      expect(tables).toHaveLength(2);
      expect(tables[0].id).toBeTruthy();
      expect(tables[0].id).not.toBe(tables[1].id);
    });
  });

  describe('data (controlled / uncontrolled)', () => {
    it('re-renders rows when a controlled data prop changes', () => {
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} />);
      expect(screen.getByText('John')).toBeInTheDocument();

      rerender(<AdvancedTable columns={testColumns} data={[{ name: 'Alice', age: 28 }]} />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });

    it('renders rows from defaultData when uncontrolled', () => {
      render(<AdvancedTable columns={testColumns} defaultData={testData} />);
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it.todo('with controlled data, edits emit onDataChange and do not mutate rendered rows until data is fed back');
    it.todo('with defaultData, edits update the rendered rows internally');
    it.todo('row deletion emits onDataChange with the row removed');
  });

  describe('sorting', () => {
    // Names in body order, read from the first cell of each tbody row.
    const bodyOrder = () => {
      const tbody = screen.getByRole('table').querySelector('tbody') as HTMLElement;
      return within(tbody)
        .getAllByRole('row')
        .map(row => within(row).getAllByRole('cell')[0].textContent);
    };
    // The Age column is the second header; it holds a single sort button.
    const ageSortButton = () => within(screen.getAllByRole('columnheader')[1]).getByRole('button');

    it('does not render sort controls when sorting is disabled', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);
      // Scope to the table: pagination (on by default) renders its own controls.
      expect(within(screen.getByRole('table')).queryAllByRole('button')).toHaveLength(0);
      expect(screen.getAllByRole('columnheader')[0]).not.toHaveAttribute('aria-sort');
    });

    it('a column cannot enable sorting on its own when the table flag is off', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name' },
        { key: 'age', title: 'Age', enableSorting: true },
      ];
      render(<AdvancedTable columns={columns} data={testData} />);
      // No table-level enableSorting: the column's own flag must not activate sorting.
      // Scope to the table: pagination (on by default) renders its own controls.
      expect(within(screen.getByRole('table')).queryAllByRole('button')).toHaveLength(0);
      expect(screen.getAllByRole('columnheader')[1]).not.toHaveAttribute('aria-sort');
      // Order stays as provided.
      expect(bodyOrder()).toEqual(['John', 'Jane', 'Bob']);
    });

    it('clicking a header cycles ascending, descending, then unsorted, reordering visible rows', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);
      expect(bodyOrder()).toEqual(['John', 'Jane', 'Bob']);

      await user.click(ageSortButton()); // ascending: 25, 30, 40
      expect(bodyOrder()).toEqual(['Jane', 'John', 'Bob']);

      await user.click(ageSortButton()); // descending: 40, 30, 25
      expect(bodyOrder()).toEqual(['Bob', 'John', 'Jane']);

      await user.click(ageSortButton()); // cleared: original order
      expect(bodyOrder()).toEqual(['John', 'Jane', 'Bob']);
    });

    it('exposes the current sort via aria-sort on the sorted column header', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);
      const ageHeader = () => screen.getAllByRole('columnheader')[1];
      // Sortable but unsorted headers report "none".
      expect(ageHeader()).toHaveAttribute('aria-sort', 'none');

      await user.click(ageSortButton());
      expect(ageHeader()).toHaveAttribute('aria-sort', 'ascending');

      await user.click(ageSortButton());
      expect(ageHeader()).toHaveAttribute('aria-sort', 'descending');
    });

    it('announces sort changes via a live region', async () => {
      const user = userEvent.setup();
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();

      await user.click(ageSortButton());
      expect(liveRegion).toHaveTextContent('Age sorted ascending');

      await user.click(ageSortButton()); // descending
      expect(liveRegion).toHaveTextContent('Age sorted descending');

      await user.click(ageSortButton()); // cleared -> announced
      expect(liveRegion).toHaveTextContent('Sorting cleared.');
    });

    it('announces the column title (not the raw key) when a grouped column is sorted', async () => {
      const user = userEvent.setup();
      const { container } = render(<AdvancedTable columns={groupedColumns} data={testData} enableSorting />);
      const liveRegion = container.querySelector('[aria-live="polite"]');

      // "Age" is a leaf nested under the "Group" header; its title must resolve.
      await user.click(screen.getByRole('button', { name: /Age/ }));
      expect(liveRegion).toHaveTextContent('Age sorted ascending');
    });

    it('does not expose aria-sort on placeholder header cells in grouped layouts', () => {
      // Mixing a grouped column with an ungrouped leaf makes TanStack insert a
      // placeholder cell for the leaf ("Age") in the group-header row.
      const mixed: AdvancedTableColumn<TestData>[] = [
        { key: 'grp', title: 'Group', columns: [{ key: 'name', title: 'Name' }] },
        { key: 'age', title: 'Age' },
      ];
      render(<AdvancedTable columns={mixed} data={testData} enableSorting />);
      const withAriaSort = screen.getAllByRole('columnheader').filter(th => th.hasAttribute('aria-sort'));
      // Exactly the two real sortable leaf headers (Name, Age) — the placeholder Age
      // cell in the group row must not also carry aria-sort.
      expect(withAriaSort).toHaveLength(2);
    });

    it('sorting is operable with the keyboard alone', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);

      await user.tab(); // Name sort button
      await user.tab(); // Age sort button
      expect(ageSortButton()).toHaveFocus();

      await user.keyboard('{Enter}'); // ascending
      expect(bodyOrder()).toEqual(['Jane', 'John', 'Bob']);

      await user.keyboard(' '); // Space -> descending
      expect(bodyOrder()).toEqual(['Bob', 'John', 'Jane']);
    });

    it('sorts a single column only: shift-clicking another header replaces the sort rather than adding a key', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);
      const headers = () => screen.getAllByRole('columnheader');
      const nameSortButton = () => within(headers()[0]).getByRole('button');

      await user.click(ageSortButton()); // age ascending
      expect(headers()[1]).toHaveAttribute('aria-sort', 'ascending');

      // Shift+click a second column — single-sort replaces, it does not accumulate.
      await user.keyboard('{Shift>}');
      await user.click(nameSortButton());
      await user.keyboard('{/Shift}');

      expect(headers()[0]).toHaveAttribute('aria-sort', 'ascending'); // name now sorted
      expect(headers()[1]).toHaveAttribute('aria-sort', 'none'); // age sort cleared
      expect(bodyOrder()).toEqual(['Bob', 'Jane', 'John']); // ordered by name only
    });

    it('controlled sorting: renders order from the sorting prop and emits onSortingChange without reordering on its own', async () => {
      const user = userEvent.setup();
      const onSortingChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableSorting
          sorting={[{ id: 'age', desc: false }]}
          onSortingChange={onSortingChange}
        />,
      );
      // Reflects the controlled prop (age ascending).
      expect(bodyOrder()).toEqual(['Jane', 'John', 'Bob']);

      await user.click(ageSortButton());
      // Emits the next state but does not reorder itself while controlled.
      expect(onSortingChange).toHaveBeenCalledWith([{ id: 'age', desc: true }]);
      expect(bodyOrder()).toEqual(['Jane', 'John', 'Bob']);

      // Feeding the new state back updates the rendered order.
      rerender(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableSorting
          sorting={[{ id: 'age', desc: true }]}
          onSortingChange={onSortingChange}
        />,
      );
      expect(bodyOrder()).toEqual(['Bob', 'John', 'Jane']);
    });

    it('manual sorting: the table does not reorder rows itself, but still tracks and emits sort state', async () => {
      const user = userEvent.setup();
      const onSortingChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableSorting
          manualSorting
          sorting={[{ id: 'age', desc: false }]}
          onSortingChange={onSortingChange}
        />,
      );
      // The descriptor says age-ascending, but with manual sorting the table renders
      // the data in the order given — the consumer owns the sort.
      expect(bodyOrder()).toEqual(['John', 'Jane', 'Bob']);
      // State is still reflected and changes are still emitted.
      expect(screen.getAllByRole('columnheader')[1]).toHaveAttribute('aria-sort', 'ascending');
      await user.click(ageSortButton());
      expect(onSortingChange).toHaveBeenCalledWith([{ id: 'age', desc: true }]);
      expect(bodyOrder()).toEqual(['John', 'Jane', 'Bob']);
    });

    it('uncontrolled sorting: defaultSorting sets the initial order', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableSorting
          defaultSorting={[{ id: 'name', desc: false }]}
        />,
      );
      expect(bodyOrder()).toEqual(['Bob', 'Jane', 'John']);
    });
  });

  describe('column filtering', () => {
    // Opens the named column's menu and returns its filter textbox. Queried by role
    // alone, not name — `Label`'s `srOnly` path drops the `htmlFor` association, a
    // pre-existing gap in the shared component, not this ticket.
    const openColumnMenu = async (user: ReturnType<typeof userEvent.setup>, columnName: string) => {
      await user.click(screen.getByRole('button', { name: `${columnName} column menu` }));
      return screen.findByRole('textbox');
    };

    it('does not render a column menu when filtering is disabled', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);
      expect(screen.queryByRole('button', { name: /column menu/i })).not.toBeInTheDocument();
    });

    it('a column cannot enable filtering on its own when the table flag is off', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name' },
        { key: 'age', title: 'Age', enableColumnFilter: true },
      ];
      render(<AdvancedTable columns={columns} data={testData} />);
      // No table-level enableColumnFilter: the column's own flag must not activate it.
      expect(screen.queryByRole('button', { name: /column menu/i })).not.toBeInTheDocument();
    });

    it('a column opts out of filtering with its own enableColumnFilter: false', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name', enableColumnFilter: false },
        { key: 'age', title: 'Age' },
      ];
      render(<AdvancedTable columns={columns} data={testData} enableColumnFilter />);
      expect(screen.queryByRole('button', { name: 'Name column menu' })).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Age column menu' })).toBeInTheDocument();
    });

    it('filters visible rows as the user types in a column menu filter input', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

      const filterInput = await openColumnMenu(user, 'Name');
      await user.type(filterInput, 'Jane');

      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });

    it('announces the filter result count via a live region', async () => {
      const user = userEvent.setup();
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();

      const filterInput = await openColumnMenu(user, 'Name');
      await user.type(filterInput, 'Jane');
      expect(liveRegion).toHaveTextContent('1 matching row.');

      await user.clear(filterInput);
      expect(liveRegion).toHaveTextContent('Filter cleared.');
    });

    it('shows the empty state when a filter matches no rows', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

      const filterInput = await openColumnMenu(user, 'Name');
      await user.type(filterInput, 'nonexistent');
      // While the menu popover is open, react-aria marks the rest of the page
      // (including the table) aria-hidden — close it first, as a real
      // screen-reader user would need to, before the table is queryable again.
      await user.keyboard('{Escape}');

      // Scope to the table: pagination (on by default) renders its own status region.
      const status = within(screen.getByRole('table')).getByRole('status');
      expect(status).toHaveTextContent('No matching results');
      expect(status).toHaveTextContent('Try adjusting or clearing your filter.');
    });

    it('controlled filters: emits onColumnFiltersChange and renders from the columnFilters prop', async () => {
      const onColumnFiltersChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnFilter
          columnFilters={[]}
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );

      const filterInput = await openColumnMenu(userEvent.setup(), 'Name');
      fireEvent.change(filterInput, { target: { value: 'Jane' } });

      expect(onColumnFiltersChange).toHaveBeenCalledWith([{ id: 'name', value: 'Jane' }]);
      // Controlled: doesn't filter on its own until the prop is fed back.
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnFilter
          columnFilters={[{ id: 'name', value: 'Jane' }]}
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it('manual filtering: the table does not filter rows itself, but still tracks and emits filter state', async () => {
      const onColumnFiltersChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnFilter
          manualFiltering
          columnFilters={[{ id: 'name', value: 'Jane' }]}
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );
      // The filter state says "name=Jane", but with manual filtering the table
      // renders all of `data` as given — the consumer owns the actual filtering.
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();

      const filterInput = await openColumnMenu(userEvent.setup(), 'Name');
      fireEvent.change(filterInput, { target: { value: 'Bob' } });
      expect(onColumnFiltersChange).toHaveBeenCalledWith([{ id: 'name', value: 'Bob' }]);
    });

    it('uncontrolled: defaultColumnFilters sets the initial filter', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnFilter
          defaultColumnFilters={[{ id: 'name', value: 'Jane' }]}
        />,
      );
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  describe('column pinning', () => {
    it.todo('pins a column to the left via the column menu');
    it.todo('pins a column to the right via the column menu');
    it.todo('unpins a pinned column via the column menu');
    it.todo('controlled pinning: renders from the columnPinning prop and emits onColumnPinningChange');
  });

  describe('grouping', () => {
    it.todo('groups rows by a column via the column menu');
    it.todo('ungroups via the column menu');
    it.todo('controlled grouping: renders from the grouping prop and emits onGroupingChange');
  });

  describe('column resizing', () => {
    it.todo('resizes a column by dragging its handle');
    it.todo('offers a single-pointer non-drag resize alternative (WCAG 2.5.7)');
    it.todo('double-clicking the handle resets the column to its default width');
    it.todo('resize handles meet the 24x24px minimum target size');
    it.todo('controlled sizing: renders widths from the columnSizing prop and emits onColumnSizingChange');
  });

  describe('column reordering', () => {
    it.todo('reorders columns via drag and drop');
    it.todo('reorders columns with the keyboard (pick up, move, drop)');
    it.todo('announces pick-up, movement, and drop to assistive technology');
    it.todo('offers move left / move right actions in the column menu (WCAG 2.5.7)');
    it.todo('reserved selection and pin columns stay first and cannot be reordered');
    it.todo('controlled order: renders from the columnOrder prop and emits onColumnOrderChange');
  });

  describe('row selection', () => {
    it('renders a named checkbox per row and a select-all checkbox in the header', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection rowKey="name" />);
      expect(screen.getAllByRole('checkbox')).toHaveLength(testData.length + 1);
      expect(screen.getByRole('checkbox', { name: 'Select all rows in current page' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Select row 1' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Select row 2' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Select row 3' })).toBeInTheDocument();
    });

    it('selecting rows updates checkbox states and emits onSelectionChange with stable row IDs', async () => {
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableRowSelection
          rowKey="name"
          onSelectionChange={onSelectionChange}
        />,
      );

      const johnCheckbox = screen.getByRole('checkbox', { name: 'Select row 1' });
      await user.click(johnCheckbox);
      expect(johnCheckbox).toBeChecked();
      expect(onSelectionChange).toHaveBeenCalledWith(['John']);
    });

    it('select-all shows an indeterminate state when some rows are selected', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection rowKey="name" />);
      const selectAll = screen.getByRole<HTMLInputElement>('checkbox', { name: 'Select all rows in current page' });

      await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }));
      // react-aria's useCheckbox sets the native `indeterminate` DOM property only
      // (never `aria-checked="mixed"`), so assert it directly rather than via role.
      expect(selectAll.indeterminate).toBe(true);

      await user.click(selectAll);
      expect(selectAll.indeterminate).toBe(false);
      expect(selectAll).toBeChecked();
      testData.forEach((_, i) => expect(screen.getByRole('checkbox', { name: `Select row ${i + 1}` })).toBeChecked());

      await user.click(selectAll);
      expect(selectAll).not.toBeChecked();
      testData.forEach((_, i) =>
        expect(screen.getByRole('checkbox', { name: `Select row ${i + 1}` })).not.toBeChecked(),
      );
    });

    it.todo('selection keyed by rowKey survives sorting, filtering, and page changes');

    it('select-all only affects rows on the current page, not the whole dataset', async () => {
      const user = userEvent.setup();
      const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
      const onSelectionChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows}
          enableRowSelection
          rowKey="name"
          onSelectionChange={onSelectionChange}
        />,
      );

      await user.click(screen.getByRole('checkbox', { name: 'Select all rows in current page' }));
      // Default page size is 10: only the first 10 rows should be selected, not
      // all 12 — select-all must be scoped to the visible page.
      expect(onSelectionChange).toHaveBeenCalledWith(Array.from({ length: 10 }, (_, i) => `Person ${i}`));

      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
      // Page 2's rows (labeled by absolute position, so "Select row 11" here)
      // were not swept up by the page-1 select-all.
      expect(screen.getByRole('checkbox', { name: 'Select row 11' })).not.toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Select all rows in current page' })).not.toBeChecked();
    });

    it('a stale id in a controlled selectedRows does not make select-all read as checked/indeterminate', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableRowSelection
          rowKey="name"
          selectedRows={['does-not-exist']}
        />,
      );
      const selectAll = screen.getByRole<HTMLInputElement>('checkbox', { name: 'Select all rows in current page' });
      expect(selectAll).not.toBeChecked();
      expect(selectAll.indeterminate).toBe(false);
      testData.forEach((_, i) =>
        expect(screen.getByRole('checkbox', { name: `Select row ${i + 1}` })).not.toBeChecked(),
      );
    });

    it('controlled selection: renders from the selectedRows prop without internal toggling', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableRowSelection
          rowKey="name"
          selectedRows={['John']}
        />,
      );
      expect(screen.getByRole('checkbox', { name: 'Select row 1' })).toBeChecked();

      await user.click(screen.getByRole('checkbox', { name: 'Select row 2' }));
      // No onSelectionChange handler: the table must not toggle its own state.
      expect(screen.getByRole('checkbox', { name: 'Select row 1' })).toBeChecked();
      expect(screen.getByRole('checkbox', { name: 'Select row 2' })).not.toBeChecked();
    });
  });

  describe('row pinning', () => {
    it.todo('pin toggle moves a row into the pinned section above the body');
    it.todo('unpinning returns the row to its natural position');
    it.todo('pinning a row pins its sub-rows with it');
    it.todo('pinned rows remain visible across sorting and pagination');
    it.todo('pinned section preserves valid table semantics for assistive technology');
    it.todo('controlled pinning: renders from the pinnedRows prop and emits onPinnedRowsChange');
  });

  describe('expanding and detail panel', () => {
    it.todo('expand control reveals nested sub-rows');
    it.todo('collapse hides sub-rows again');
    it.todo('renderDetailPanel renders panel content beneath the expanded row as valid table semantics');
    it.todo('rows excluded by getRowCanExpand render no expand control');
    it.todo('expand control renders in the correct column when selection and pin columns are present');
    it.todo('controlled expansion: renders from the expanded prop and emits onExpandedChange');
  });

  describe('editable cells', () => {
    it.todo('editable columns render programmatically labelled inputs');
    it.todo('blur commits the edited value');
    it.todo('Enter commits the edited value');
    it.todo('Escape reverts the edit');
    it.todo('expand control placement stays correct when editable combines with selection and pinning');
  });

  describe('pagination', () => {
    // 12 distinct rows so the default 10-per-page splits into two pages.
    const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
    // Body rows only (excludes the header row).
    const bodyRows = () => within(screen.getByRole('table').querySelector('tbody') as HTMLElement).getAllByRole('row');

    it('renders pagination controls and only the current page of rows', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} />);
      // Pagination navigation is present and named.
      expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
      // Only the first page (default size 10) of the 12 rows is rendered.
      expect(bodyRows()).toHaveLength(10);
      expect(screen.getByText('Person 0')).toBeInTheDocument();
      expect(screen.queryByText('Person 11')).not.toBeInTheDocument();
    });

    it('changing page updates the visible rows', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={manyRows} />);
      expect(screen.getByText('Person 0')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
      // Page 2 shows the remaining two rows and drops the first page.
      expect(bodyRows()).toHaveLength(2);
      expect(screen.getByText('Person 11')).toBeInTheDocument();
      expect(screen.queryByText('Person 0')).not.toBeInTheDocument();
    });

    it('changing page size updates the visible row count', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={manyRows} />);
      expect(bodyRows()).toHaveLength(10);

      await user.selectOptions(screen.getByLabelText('Items per page'), '5');
      expect(bodyRows()).toHaveLength(5);
    });

    it('page-size options are configurable', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} pageSizeOptions={[3, 6]} />);
      const options = within(screen.getByLabelText('Items per page')).getAllByRole('option');
      expect(options.map(option => option.textContent)).toEqual(['3', '6']);
    });

    it('defaults to a page size that is actually one of pageSizeOptions when the hardcoded default is not offered', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} pageSizeOptions={[8, 16, 24]} />);
      // The hardcoded default (10) isn't in pageSizeOptions, so the initial page
      // size must fall back to the first offered option instead of silently
      // paginating at a size the <Select> can't display.
      expect(screen.getByLabelText<HTMLSelectElement>('Items per page').value).toBe('8');
      expect(bodyRows()).toHaveLength(8);
    });

    it('an out-of-range controlled pageIndex does not render the empty state when data exists', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} pagination={{ pageIndex: 5, pageSize: 10 }} />);
      // 12 rows at pageSize 10 only has 2 pages (index 0-1); index 5 is out of
      // range and autoResetPageIndex is off, so the current page renders no
      // rows — but that must not be conflated with "no data at all".
      expect(screen.queryByText('No data to display')).not.toBeInTheDocument();
    });

    it('controlled pagination: renders from the pagination prop ({ pageIndex, pageSize }) and emits onPaginationChange', async () => {
      const user = userEvent.setup();
      const onPaginationChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows}
          pagination={{ pageIndex: 1, pageSize: 5 }}
          onPaginationChange={onPaginationChange}
        />,
      );
      // Reflects the controlled prop: page 2 of size 5 shows rows 5–9.
      expect(bodyRows()).toHaveLength(5);
      expect(screen.getByText('Person 5')).toBeInTheDocument();
      expect(screen.queryByText('Person 0')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Go to page 1' }));
      // Emits the next state but does not change the rendered page on its own.
      expect(onPaginationChange).toHaveBeenCalledWith({ pageIndex: 0, pageSize: 5 });
      expect(screen.getByText('Person 5')).toBeInTheDocument();
      expect(screen.queryByText('Person 0')).not.toBeInTheDocument();
    });

    it('uncontrolled pagination: defaultPagination sets the initial page and size', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} defaultPagination={{ pageIndex: 1, pageSize: 5 }} />);
      // Page 2 of size 5 shows rows 5–9.
      expect(bodyRows()).toHaveLength(5);
      expect(screen.getByText('Person 5')).toBeInTheDocument();
      expect(screen.queryByText('Person 0')).not.toBeInTheDocument();
    });

    it('can be disabled with enablePagination={false}, rendering every row at once', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} enablePagination={false} />);
      expect(bodyRows()).toHaveLength(12);
      expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('renders the default empty state when data is empty', () => {
      render(<AdvancedTable columns={testColumns} data={[]} />);
      // check header still render but cell does not
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      // default empty-state message inside a status region, in a valid table cell.
      // Scope to the table: pagination (on by default) renders its own status region.
      const status = within(screen.getByRole('table')).getByRole('status');
      expect(status).toHaveTextContent('No data to display');
      expect(status.closest('td')).toBeInTheDocument();
    });

    it('spans the empty-state cell across all columns', () => {
      render(<AdvancedTable columns={testColumns} data={[]} />);
      expect(within(screen.getByRole('table')).getByRole('status').closest('td')).toHaveAttribute(
        'colspan',
        String(testColumns.length),
      );
    });

    it('renders a custom title and description from the emptyState prop', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={[]}
          emptyState={{ title: 'Nothing here', description: 'Add a row to get started.' }}
        />,
      );
      expect(screen.getByText('Nothing here')).toBeInTheDocument();
      expect(screen.getByText('Add a row to get started.')).toBeInTheDocument();
      expect(screen.queryByText('No data to display')).not.toBeInTheDocument();
    });

    it('renders a custom icon from the emptyState prop', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={[]}
          emptyState={{ icon: <span data-testid="custom-empty-icon">icon</span> }}
        />,
      );
      expect(screen.getByTestId('custom-empty-icon')).toBeInTheDocument();
    });
  });

  describe('style variants', () => {
    const getTable = () => screen.getByRole('table');

    it('renders default (transparent) background with no data rows affected', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);
      // body rows carry the hover-only treatment, not a striped/filled background
      const bodyRow = screen.getByText('John').closest('tr') as HTMLElement;
      expect(bodyRow.className).toContain('hover:bg-surface-hover-muted-pale');
      expect(bodyRow.className).not.toContain('even:bg-surface-muted-faint');
    });

    it('renders the striped background variant (white odd, faint even rows)', () => {
      render(<AdvancedTable columns={testColumns} data={testData} background="striped" />);
      const bodyRow = screen.getByText('John').closest('tr') as HTMLElement;
      expect(bodyRow.className).toContain('odd:bg-background-white');
      expect(bodyRow.className).toContain('even:bg-surface-muted-faint');
    });

    it('renders the filled background variant (white rows)', () => {
      render(<AdvancedTable columns={testColumns} data={testData} background="filled" />);
      const bodyRow = screen.getByText('John').closest('tr') as HTMLElement;
      expect(bodyRow.className).toContain('bg-background-white');
      expect(bodyRow.className).not.toContain('even:');
    });

    it('renders the bordered variant', () => {
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} />);
      // the outer table border is exclusive to the bordered variant
      expect(getTable().className).not.toContain('border-border-muted-soft');

      rerender(<AdvancedTable columns={testColumns} data={testData} bordered />);
      expect(getTable().className).toContain('border-border-muted-soft');
    });

    it('renders the default padding variant (8px cells)', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);
      const cell = screen.getByText('John').closest('td') as HTMLElement;
      expect(cell.className).toContain('p-2');
    });

    it('renders the large padding variant (12px cells)', () => {
      render(<AdvancedTable columns={testColumns} data={testData} padding="large" />);
      const cell = screen.getByText('John').closest('td') as HTMLElement;
      expect(cell.className).toContain('p-3');
    });

    it('fillContainer defaults to filling the container and false renders intrinsic width', () => {
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} />);
      expect(getTable().className).toContain('w-full');

      rerender(<AdvancedTable columns={testColumns} data={testData} fillContainer={false} />);
      expect(getTable().className).not.toContain('w-full');
      expect(getTable().className).toContain('w-auto');
    });
  });

  describe('accessibility', () => {
    it.todo('every interactive element is reachable by keyboard in a logical order');
    it.todo('all interactive targets meet the 24x24px minimum size (WCAG 2.5.8)');
    it.todo('interactive icon controls have accurate accessible names');
    it('column menu is fully keyboard operable', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

      const trigger = screen.getByRole('button', { name: 'Name column menu' });
      trigger.focus();
      await user.keyboard('{Enter}');

      const filterInput = await screen.findByRole('textbox');
      await user.type(filterInput, 'Jane');
      expect(screen.queryByText('John')).not.toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
      await waitFor(() => expect(trigger).toHaveFocus());
    });
  });

  describe('types and public API', () => {
    it('rejects a column key that is not part of the row type', () => {
      // @ts-expect-error 'nope' is not a key of TestData
      const badColumn: AdvancedTableColumn<TestData> = { key: 'nope', title: 'Nope' };
      expect(badColumn).toBeDefined();
    });

    it('enabling selection without rowKey is a type error', () => {
      // @ts-expect-error rowKey is required when enableRowSelection is set
      const badProps: AdvancedTableProps<TestData> = { columns: testColumns, data: testData, enableRowSelection: true };
      expect(badProps).toBeDefined();
    });
    it.todo('enabling pinning, expansion, or editing without rowKey is a type error');
    it.todo('AdvancedTable and its types are exported from the package root');
  });
});
