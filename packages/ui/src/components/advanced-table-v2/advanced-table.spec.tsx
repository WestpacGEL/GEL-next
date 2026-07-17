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
  {
    key: 'name',
    title: 'Name',
    enableSorting: true,
    enableColumnFilter: true,
    enablePinning: true,
    enableGrouping: true,
  },
  {
    key: 'age',
    title: 'Age',
    enableSorting: true,
    enableColumnFilter: true,
    enablePinning: true,
    enableGrouping: true,
  },
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
      { key: 'name', title: 'Name', enableSorting: true },
      { key: 'age', title: 'Age', enableSorting: true },
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

    it('hides the caption visually by default while keeping it accessible', () => {
      render(<AdvancedTable columns={testColumns} data={testData} caption="People" />);
      expect(screen.getByText('People').closest('caption')).toHaveClass('sr-only');
    });

    it('shows the caption visually when showCaption is true', () => {
      render(<AdvancedTable columns={testColumns} data={testData} caption="People" showCaption />);
      expect(screen.getByText('People').closest('caption')).not.toHaveClass('sr-only');
    });

    it('labels the table via aria-labelledby when provided, without a caption', () => {
      render(
        <>
          <h2 id="people-heading">People</h2>
          <AdvancedTable columns={testColumns} data={testData} aria-labelledby="people-heading" />
        </>,
      );
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

    it('a column opts in to sorting with its own enableSorting: true', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name', enableSorting: true },
        { key: 'age', title: 'Age' },
      ];
      render(<AdvancedTable columns={columns} data={testData} enableSorting />);
      expect(within(screen.getAllByRole('columnheader')[0]).getByRole('button')).toBeInTheDocument();
      expect(screen.getAllByRole('columnheader')[1]).not.toHaveAttribute('aria-sort');
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
        { key: 'grp', title: 'Group', columns: [{ key: 'name', title: 'Name', enableSorting: true }] },
        { key: 'age', title: 'Age', enableSorting: true },
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

    it('a column opts in to filtering with its own enableColumnFilter: true', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name', enableColumnFilter: true },
        { key: 'age', title: 'Age' },
      ];
      render(<AdvancedTable columns={columns} data={testData} enableColumnFilter />);
      expect(screen.getByRole('button', { name: 'Name column menu' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Age column menu' })).not.toBeInTheDocument();
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
    // Opens the named column's menu.
    const openColumnMenu = async (user: ReturnType<typeof userEvent.setup>, columnName: string) => {
      await user.click(screen.getByRole('button', { name: `${columnName} column menu` }));
      await screen.findByRole('menu');
    };
    // Queried by the label text rather than positional index — pinning right (or
    // left) reorders the column to sit at that edge, per TanStack's default
    // leaf-column ordering (left-pinned, then center, then right-pinned).
    const nameHeader = () => screen.getByText('Name').closest('th') as HTMLElement;

    it('pins a column to the left via the column menu', async () => {
      const user = userEvent.setup();
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);
      const liveRegion = container.querySelector('[aria-live="polite"]');

      await openColumnMenu(user, 'Name');
      await user.click(screen.getByRole('menuitem', { name: 'Pin left' }));

      // A pinned header cell renders sticky, positioned at its pinned offset.
      expect(getComputedStyle(nameHeader()).position).toBe('sticky');
      expect(liveRegion).toHaveTextContent('Name pinned left.');
    });

    it('pins a column to the right via the column menu', async () => {
      const user = userEvent.setup();
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);
      const liveRegion = container.querySelector('[aria-live="polite"]');

      await openColumnMenu(user, 'Name');
      await user.click(screen.getByRole('menuitem', { name: 'Pin right' }));

      expect(getComputedStyle(nameHeader()).position).toBe('sticky');
      expect(liveRegion).toHaveTextContent('Name pinned right.');
    });

    it('unpins a pinned column via the column menu', async () => {
      const user = userEvent.setup();
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);
      const liveRegion = container.querySelector('[aria-live="polite"]');

      await openColumnMenu(user, 'Name');
      await user.click(screen.getByRole('menuitem', { name: 'Pin left' }));
      expect(getComputedStyle(nameHeader()).position).toBe('sticky');

      await openColumnMenu(user, 'Name');
      await user.click(screen.getByRole('menuitem', { name: 'Unpin left' }));

      expect(getComputedStyle(nameHeader()).position).not.toBe('sticky');
      expect(liveRegion).toHaveTextContent('Name unpinned.');
    });

    it('a column opts in to pinning with its own enablePinning: true', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name', enablePinning: true },
        { key: 'age', title: 'Age' },
      ];
      render(<AdvancedTable columns={columns} data={testData} enableColumnPinning />);
      expect(screen.getByRole('button', { name: 'Name column menu' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Age column menu' })).not.toBeInTheDocument();
    });

    it('controlled pinning: renders from the columnPinning prop and emits onColumnPinningChange', async () => {
      const user = userEvent.setup();
      const onColumnPinningChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnPinning
          columnPinning={{ left: ['name'] }}
          onColumnPinningChange={onColumnPinningChange}
        />,
      );
      // Reflects the controlled prop (name pinned left) without any interaction.
      expect(getComputedStyle(nameHeader()).position).toBe('sticky');

      await openColumnMenu(user, 'Name');
      await user.click(screen.getByRole('menuitem', { name: 'Unpin left' }));

      // Emits the next state but does not unpin itself while controlled.
      expect(onColumnPinningChange).toHaveBeenCalledWith({ left: [], right: [] });
      expect(getComputedStyle(nameHeader()).position).toBe('sticky');

      // Feeding the new state back updates the rendered pin.
      rerender(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnPinning
          columnPinning={{ left: [] }}
          onColumnPinningChange={onColumnPinningChange}
        />,
      );
      expect(getComputedStyle(nameHeader()).position).not.toBe('sticky');
    });
  });

  describe('grouping', () => {
    // Opens the named column's menu.
    const openColumnMenu = async (user: ReturnType<typeof userEvent.setup>, columnName: string) => {
      await user.click(screen.getByRole('button', { name: `${columnName} column menu` }));
      await screen.findByRole('menu');
    };

    // Repeated `age` value (30) so a group actually contains more than one row.
    const groupingTestData: TestData[] = [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 30 },
      { name: 'Bob', age: 25 },
    ];

    it('groups rows by a column via the column menu', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={groupingTestData} enableGrouping />);

      await openColumnMenu(user, 'Age');
      await user.click(screen.getByRole('menuitem', { name: 'Group by Age' }));
      await user.keyboard('{Escape}');

      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'td' })).toBeInTheDocument();
      expect(screen.getByText(/Age: 25 \(1 row\)/, { selector: 'td' })).toBeInTheDocument();
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('ungroups via the column menu', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={groupingTestData} enableGrouping />);

      await openColumnMenu(user, 'Age');
      await user.click(screen.getByRole('menuitem', { name: 'Group by Age' }));
      await user.keyboard('{Escape}');
      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'td' })).toBeInTheDocument();

      await openColumnMenu(user, 'Age');
      await user.click(screen.getByRole('menuitem', { name: 'Ungroup' }));
      await user.keyboard('{Escape}');

      expect(screen.queryByText(/Age: 30/, { selector: 'td' })).not.toBeInTheDocument();
      expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(4);
    });

    it('a column opts in to grouping with its own enableGrouping: true', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name' },
        { key: 'age', title: 'Age', enableGrouping: true },
      ];
      render(<AdvancedTable columns={columns} data={groupingTestData} enableGrouping />);
      expect(screen.getByRole('button', { name: 'Age column menu' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Name column menu' })).not.toBeInTheDocument();
    });

    it('controlled grouping: renders from the grouping prop and emits onGroupingChange', async () => {
      const user = userEvent.setup();
      const onGroupingChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          enableGrouping
          grouping={[]}
          onGroupingChange={onGroupingChange}
        />,
      );
      expect(screen.queryByText(/Age: 30/, { selector: 'td' })).not.toBeInTheDocument();

      await openColumnMenu(user, 'Age');
      await user.click(screen.getByRole('menuitem', { name: 'Group by Age' }));

      expect(onGroupingChange).toHaveBeenCalledWith(['age']);
      // Controlled: doesn't group on its own until the prop is fed back.
      expect(screen.queryByText(/Age: 30/, { selector: 'td' })).not.toBeInTheDocument();

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          enableGrouping
          grouping={['age']}
          onGroupingChange={onGroupingChange}
        />,
      );
      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'td' })).toBeInTheDocument();
    });

    // Regression coverage for ticket 09's interaction with grouping (ticket 08):
    // grouping's implicit "start fully expanded" default must still hold, but
    // group rows now also get a real, working collapse/expand toggle — ticket 08
    // shipped that banner with no toggle at all.
    it('a newly-grouped column keeps its children visible by default, and the group row exposes a working collapse/expand toggle', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={groupingTestData} enableGrouping />);

      await openColumnMenu(user, 'Age');
      await user.click(screen.getByRole('menuitem', { name: 'Group by Age' }));
      await user.keyboard('{Escape}');

      // Ticket 08's default-expanded behavior still holds: children visible immediately.
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();

      // New in this ticket: the group banner has a working toggle.
      const groupToggle = screen.getByRole('button', { name: 'Collapse Age: 30' });
      await user.click(groupToggle);
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.queryByText('Jane')).not.toBeInTheDocument();
      // Bob's group (Age: 25) is unaffected by collapsing the Age: 30 group.
      expect(screen.getByText('Bob')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Expand Age: 30' }));
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it('an explicit defaultExpanded overrides grouping\'s implicit "start expanded" default', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          rowKey="name"
          enableGrouping
          defaultGrouping={['age']}
          defaultExpanded={[]}
        />,
      );

      // Group banners still render...
      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'td' })).toBeInTheDocument();
      // ...but an explicit (empty) defaultExpanded wins over grouping's own
      // implicit default, so children start hidden rather than force-expanded.
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand Age: 30' })).toBeInTheDocument();
    });

    it('pinning a row that is currently clustered under a group banner removes it from that cluster and shows it only in the pinned section', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          rowKey="name"
          enableGrouping
          enableRowPinning
          defaultGrouping={['age']}
        />,
      );
      // Both John and Jane start clustered under the "Age: 30" banner.
      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'td' })).toBeInTheDocument();

      const johnRow = screen.getByText('John').closest('tr') as HTMLElement;
      await user.click(within(johnRow).getByRole('button', { name: /Pin row/ }));

      // John renders exactly once, in the leading (pinned) tbody
      const tbodies = screen.getByRole('table').querySelectorAll('tbody');
      const pinnedBody = tbodies[0];
      const centerBody = tbodies[1];
      expect(screen.getAllByText('John')).toHaveLength(1);
      expect(within(pinnedBody).getByText('John')).toBeInTheDocument();
      // It is gone from the "Age: 30" cluster in the center rows, while Jane remains there unpinned.
      expect(within(centerBody).queryByText('John')).not.toBeInTheDocument();
      expect(within(centerBody).getByText('Jane')).toBeInTheDocument();

      expect(screen.getByText(/Age: 30 \(1 row\)/, { selector: 'td' })).toBeInTheDocument();
    });

    it('a group whose every member is pinned away renders no banner at all', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          rowKey="name"
          enableGrouping
          enableRowPinning
          defaultGrouping={['age']}
        />,
      );

      await user.click(
        within(screen.getByText('John').closest('tr') as HTMLElement).getByRole('button', { name: /Pin row/ }),
      );
      await user.click(
        within(screen.getByText('Jane').closest('tr') as HTMLElement).getByRole('button', { name: /Pin row/ }),
      );

      // Both members of the "Age: 30" group are now pinned — the banner has
      // nothing left to show and disappears, rather than reading "(0 rows)".
      expect(screen.queryByText(/Age: 30/)).not.toBeInTheDocument();
      expect(screen.getByText(/Age: 25 \(1 row\)/, { selector: 'td' })).toBeInTheDocument();
    });
  });

  describe('column resizing', () => {
    it('resizes a column by dragging its handle', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnResizing />);

      const handle = screen.getByRole('slider', { name: 'Resize Name column' });
      fireEvent.mouseDown(handle, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 });
      fireEvent.mouseUp(document);

      expect(handle).toHaveAttribute('aria-valuenow', '200');
    });

    it('applies the resized width to the rendered column, not just the handle state', () => {
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnResizing />);

      const handle = screen.getByRole('slider', { name: 'Resize Name column' });
      fireEvent.mouseDown(handle, { clientX: 100 });
      fireEvent.mouseMove(document, { clientX: 150 });
      fireEvent.mouseUp(document);

      const cols = container.querySelectorAll('col');
      expect(cols[0]).toHaveStyle({ width: '200px' });
    });

    it('offers a single-pointer non-drag resize alternative', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnResizing />);

      const handle = screen.getByRole('slider', { name: 'Resize Name column' });
      handle.focus();
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      fireEvent.keyDown(handle, { key: 'ArrowRight' });

      // 150 (tanstack's default column size) + 2 * 10 (STEP set in advanced-table-resize-handle.component.tsx)
      expect(handle).toHaveAttribute('aria-valuenow', '170');
    });

    it('double-clicking the handle resets the column to its default width', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnResizing />);

      const handle = screen.getByRole('slider', { name: 'Resize Name column' });
      const defaultWidth = handle.getAttribute('aria-valuenow');
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      expect(handle).not.toHaveAttribute('aria-valuenow', defaultWidth ?? undefined);

      fireEvent.doubleClick(handle);
      expect(handle).toHaveAttribute('aria-valuenow', defaultWidth ?? '');
    });

    it('resets to default width via Enter/Space while the handle is focused', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnResizing />);

      const handle = screen.getByRole('slider', { name: 'Resize Name column' });
      const defaultWidth = handle.getAttribute('aria-valuenow');
      handle.focus();
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      expect(handle).not.toHaveAttribute('aria-valuenow', defaultWidth ?? undefined);

      fireEvent.keyDown(handle, { key: 'Enter' });
      expect(handle).toHaveAttribute('aria-valuenow', defaultWidth ?? '');
    });

    it('controlled sizing: renders widths from the columnSizing prop and emits onColumnSizingChange', () => {
      const onColumnSizingChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnResizing
          columnSizing={{ name: 300 }}
          onColumnSizingChange={onColumnSizingChange}
        />,
      );

      const handle = screen.getByRole('slider', { name: 'Resize Name column' });
      expect(handle).toHaveAttribute('aria-valuenow', '300');

      handle.focus();
      fireEvent.keyDown(handle, { key: 'ArrowRight' });
      expect(onColumnSizingChange).toHaveBeenCalledWith({ name: 310 });
      // Controlled: doesn't resize on its own until the prop is fed back.
      expect(handle).toHaveAttribute('aria-valuenow', '300');

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnResizing
          columnSizing={{ name: 310 }}
          onColumnSizingChange={onColumnSizingChange}
        />,
      );
      expect(handle).toHaveAttribute('aria-valuenow', '310');
    });

    it('reserved selection and pin columns are excluded from resizing', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          rowKey="name"
          enableRowSelection
          enableRowPinning
          enableColumnResizing
        />,
      );

      expect(screen.getByRole('checkbox', { name: 'Select all rows in current page' })).toBeInTheDocument();
      // Only the two real data columns get a handle — none for either reserved column.
      expect(screen.getAllByRole('slider')).toHaveLength(2);
    });

    it('a pinned column is excluded from resizing', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning enableColumnResizing />);

      expect(screen.getByRole('slider', { name: 'Resize Name column' })).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      await screen.findByRole('menu');
      await user.click(screen.getByRole('menuitem', { name: 'Pin left' }));

      expect(screen.queryByRole('slider', { name: 'Resize Name column' })).not.toBeInTheDocument();
    });

    it('respects a column-specific minWidth override over the table default', () => {
      const columns: AdvancedTableColumn<TestData>[] = [
        { key: 'name', title: 'Name', minWidth: 100 },
        { key: 'age', title: 'Age' },
      ];
      render(<AdvancedTable columns={columns} data={testData} enableColumnResizing />);

      const handle = screen.getByRole('slider', { name: 'Resize Name column' });

      // Attempt to shrink below minWidth via keyboard (10px per ArrowLeft press).
      handle.focus();
      for (let i = 0; i < 20; i++) {
        fireEvent.keyDown(handle, { key: 'ArrowLeft' });
      }

      // Width should not drop below the column's minWidth (100).
      const finalWidth = parseInt(handle.getAttribute('aria-valuenow') ?? '0', 10);
      expect(finalWidth).toBeGreaterThanOrEqual(100);
    });
  });

  describe('column reordering', () => {
    // dnd-kit's collision detection needs real, distinct geometry to compare
    // against — jsdom lays every element out at 0x0, so each header cell is
    // given an evenly-spaced rect matching its position among its siblings.
    const mockHeaderRects = () => {
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
        if (this.tagName === 'TH') {
          const row = this.parentElement;
          const index = row ? Array.from(row.children).indexOf(this) : 0;
          return {
            width: 100,
            height: 40,
            top: 0,
            bottom: 40,
            left: index * 100,
            right: index * 100 + 100,
            x: index * 100,
            y: 0,
            toJSON: () => ({}),
          } as DOMRect;
        }
        return { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0, x: 0, y: 0, toJSON: () => ({}) } as DOMRect;
      });
    };

    // Reads just the title label span's text, skipping decorative icon markup
    // (e.g. copyright `<title>`s) and hidden menu-trigger text also inside the cell.
    const columnHeaderNames = () =>
      within(screen.getByRole('table'))
        .getAllByRole('columnheader')
        .map(th => th.querySelector('[id$="-label"]')?.textContent);

    it('reorders columns via drag and drop', () => {
      mockHeaderRects();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnReordering />);

      const nameHandle = screen.getByRole('button', { name: 'Name' });
      fireEvent.mouseDown(nameHandle, { clientX: 50, clientY: 20 });
      fireEvent.mouseMove(document, { clientX: 120, clientY: 20 });
      fireEvent.mouseMove(document, { clientX: 220, clientY: 20 });
      fireEvent.mouseUp(document);

      expect(columnHeaderNames()).toEqual(['Age', 'Name']);
    });

    it('reorders columns with the keyboard (pick up, move, drop)', async () => {
      mockHeaderRects();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnReordering />);

      const nameHandle = screen.getByRole('button', { name: 'Name' });
      nameHandle.focus();
      fireEvent.keyDown(nameHandle, { code: 'Space' });
      // dnd-kit's keyboard sensor attaches its move listener a tick after
      // pick-up (a `setTimeout(0)` internally) — wait for it before moving.
      await new Promise(resolve => setTimeout(resolve, 0));
      fireEvent.keyDown(nameHandle, { code: 'ArrowRight' });
      fireEvent.keyDown(nameHandle, { code: 'ArrowRight' });
      fireEvent.keyDown(nameHandle, { code: 'ArrowRight' });
      fireEvent.keyDown(nameHandle, { code: 'Space' });

      expect(columnHeaderNames()).toEqual(['Age', 'Name']);
    });

    it('announces pick-up, movement, and drop to assistive technology', async () => {
      mockHeaderRects();
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnReordering />);
      const liveRegion = container.querySelectorAll('[aria-live="polite"]')[0];

      const nameHandle = screen.getByRole('button', { name: 'Name' });
      nameHandle.focus();

      fireEvent.keyDown(nameHandle, { code: 'Space' });
      expect(liveRegion).toHaveTextContent(/Picked up Name/);

      // See the previous test's comment — the sensor's move listener attaches a tick late.
      await new Promise(resolve => setTimeout(resolve, 0));
      fireEvent.keyDown(nameHandle, { code: 'ArrowRight' });
      fireEvent.keyDown(nameHandle, { code: 'ArrowRight' });
      fireEvent.keyDown(nameHandle, { code: 'ArrowRight' });
      expect(liveRegion).toHaveTextContent(/Name was moved/);

      fireEvent.keyDown(nameHandle, { code: 'Space' });
      expect(liveRegion).toHaveTextContent(/Name dropped/);
    });

    it('offers move left / move right actions in the column menu (WCAG 2.5.7)', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnReordering />);

      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      await screen.findByRole('menu');
      expect(screen.getByRole('menuitem', { name: 'Move left' })).toHaveAttribute('aria-disabled', 'true');
      await user.keyboard('{Escape}');

      await user.click(screen.getByRole('button', { name: 'Age column menu' }));
      await screen.findByRole('menu');
      expect(screen.getByRole('menuitem', { name: 'Move right' })).toHaveAttribute('aria-disabled', 'true');
      await user.click(screen.getByRole('menuitem', { name: 'Move left' }));

      expect(columnHeaderNames()).toEqual(['Age', 'Name']);
    });

    it('reserved selection and pin columns stay first and cannot be reordered', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          rowKey="name"
          enableRowSelection
          enableRowPinning
          enableColumnReordering
        />,
      );

      expect(screen.getByRole('checkbox', { name: 'Select all rows in current page' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      await screen.findByRole('menu');
      expect(screen.getByRole('menuitem', { name: 'Move left' })).toHaveAttribute('aria-disabled', 'true');
    });

    it('controlled order: renders from the columnOrder prop and emits onColumnOrderChange', async () => {
      const user = userEvent.setup();
      const onColumnOrderChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnReordering
          columnOrder={['age', 'name']}
          onColumnOrderChange={onColumnOrderChange}
        />,
      );

      expect(columnHeaderNames()).toEqual(['Age', 'Name']);

      await user.click(screen.getByRole('button', { name: 'Age column menu' }));
      await screen.findByRole('menu');
      await user.click(screen.getByRole('menuitem', { name: 'Move right' }));

      expect(onColumnOrderChange).toHaveBeenCalledWith(['name', 'age']);
      // Controlled: doesn't reorder on its own until the prop is fed back.
      expect(columnHeaderNames()).toEqual(['Age', 'Name']);

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnReordering
          columnOrder={['name', 'age']}
          onColumnOrderChange={onColumnOrderChange}
        />,
      );
      expect(columnHeaderNames()).toEqual(['Name', 'Age']);
    });
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
    type TreeData = TestData & { subRows?: TreeData[] };
    const treeData: TreeData[] = [
      {
        name: 'John',
        age: 30,
        subRows: [
          { name: 'Johnny', age: 5 },
          { name: 'Janet', age: 8 },
        ],
      },
      { name: 'Bob', age: 40 },
    ];

    // Names in body order, read from the second cell (first cell is the pin
    // toggle) of each tbody row, across every tbody (pinned + main).
    const allBodyOrder = () => {
      const tbodies = screen.getByRole('table').querySelectorAll('tbody');
      return Array.from(tbodies).flatMap(tbody =>
        within(tbody)
          .getAllByRole('row')
          .map(row => within(row).getAllByRole('cell')[1]?.textContent),
      );
    };

    it('pin toggle moves a row into the pinned section above the body', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} rowKey="name" enableRowPinning />);
      expect(allBodyOrder()).toEqual(['John', 'Jane', 'Bob']);

      await user.click(screen.getByRole('button', { name: 'Pin row 3' }));
      // Bob (row 3) is lifted above the other, unpinned rows.
      expect(allBodyOrder()).toEqual(['Bob', 'John', 'Jane']);
    });

    it('unpinning returns the row to its natural position', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} rowKey="name" enableRowPinning />);

      await user.click(screen.getByRole('button', { name: 'Pin row 3' }));
      expect(allBodyOrder()).toEqual(['Bob', 'John', 'Jane']);

      await user.click(screen.getByRole('button', { name: 'Unpin row 3' }));
      expect(allBodyOrder()).toEqual(['John', 'Jane', 'Bob']);
    });

    it('pinning a row pins its sub-rows with it', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} rowKey="name" enableRowPinning />);

      await user.click(screen.getByRole('button', { name: 'Expand John' }));
      expect(screen.getByText('Johnny')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Pin row 1' }));
      // John and its sub-rows all render in the leading (pinned) tbody.
      const pinnedBody = screen.getByRole('table').querySelectorAll('tbody')[0];
      expect(within(pinnedBody).getByText('John')).toBeInTheDocument();
      expect(within(pinnedBody).getByText('Johnny')).toBeInTheDocument();
      expect(within(pinnedBody).getByText('Janet')).toBeInTheDocument();
    });

    it('pinned rows remain visible across sorting and pagination', async () => {
      const user = userEvent.setup();
      const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
      render(<AdvancedTable columns={testColumns} data={manyRows} rowKey="name" enableRowPinning enableSorting />);

      await user.click(screen.getByRole('button', { name: 'Pin row 1' }));
      expect(screen.getByText('Person 0')).toBeInTheDocument();

      // Sorting the (unpinned) rows still leaves the pinned row visible.
      await user.click(within(screen.getAllByRole('columnheader')[1]).getByRole('button'));
      expect(screen.getByText('Person 0')).toBeInTheDocument();

      // Paginating away from the pinned row's "natural" page still shows it.
      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
      expect(screen.getByText('Person 0')).toBeInTheDocument();
    });

    it('pinned section preserves valid table semantics for assistive technology', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} rowKey="name" enableRowPinning />);

      await user.click(screen.getByRole('button', { name: 'Pin row 1' }));
      const table = screen.getByRole('table');
      // The pinned row still shows up as a real `row` in the table's a11y tree.
      const rows = within(table).getAllByRole('row');
      const pinnedRow = screen.getByText('John').closest('tr');
      expect(rows).toContain(pinnedRow);
    });

    it('controlled pinning: renders from the pinnedRows prop and emits onPinnedRowsChange', async () => {
      const user = userEvent.setup();
      const onPinnedRowsChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          rowKey="name"
          enableRowPinning
          pinnedRows={[]}
          onPinnedRowsChange={onPinnedRowsChange}
        />,
      );
      expect(allBodyOrder()).toEqual(['John', 'Jane', 'Bob']);

      await user.click(screen.getByRole('button', { name: 'Pin row 3' }));
      expect(onPinnedRowsChange).toHaveBeenCalledWith(['Bob']);
      // Controlled: doesn't pin on its own until the prop is fed back.
      expect(allBodyOrder()).toEqual(['John', 'Jane', 'Bob']);

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          rowKey="name"
          enableRowPinning
          pinnedRows={['Bob']}
          onPinnedRowsChange={onPinnedRowsChange}
        />,
      );
      expect(allBodyOrder()).toEqual(['Bob', 'John', 'Jane']);
    });

    it('a pinned row stays visible when it no longer matches an active column filter', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} rowKey="name" enableRowPinning enableColumnFilter />);

      await user.click(screen.getByRole('button', { name: 'Pin row 1' }));
      expect(screen.getByText('John')).toBeInTheDocument();

      // Filter the Name column for a value John doesn't match.
      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      const filterInput = await screen.findByRole('textbox');
      await user.type(filterInput, 'Jane');

      // John no longer matches the filter, but stays visible since it's pinned.
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('a pinned row filtered out of the center rows still gets a sane accessible name on its toggle', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} rowKey="name" enableRowPinning enableColumnFilter />);

      await user.click(screen.getByRole('button', { name: 'Pin row 1' }));

      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      const filterInput = await screen.findByRole('textbox');
      await user.type(filterInput, 'Jane');
      // While the menu popover is open, react-aria marks the rest of the page
      // (including the table) aria-hidden — close it first, as a real
      // screen-reader user would need to, before the table is queryable again.
      await user.keyboard('{Escape}');

      // John's own toggle still has a real, non-broken accessible name (not "Pin row 0").
      expect(screen.getByRole('button', { name: 'Unpin row 1' })).toBeInTheDocument();
    });
  });

  describe('expanding and detail panel', () => {
    type TreeData = TestData & { subRows?: TreeData[] };
    const treeData: TreeData[] = [
      {
        name: 'John',
        age: 30,
        subRows: [
          { name: 'Johnny', age: 5 },
          { name: 'Janet', age: 8 },
        ],
      },
      { name: 'Bob', age: 40 },
    ];

    it('expand control reveals nested sub-rows', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} rowKey="name" />);

      // Sub-rows aren't in the DOM at all until expanded (aria-controls in the
      // a11y test below relies on this — TanStack never mounts collapsed rows).
      expect(screen.queryByText('Johnny')).not.toBeInTheDocument();
      expect(screen.queryByText('Janet')).not.toBeInTheDocument();
      // A leaf row (no subRows) offers no expand control at all.
      expect(screen.queryByRole('button', { name: /Bob/ })).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Expand John' }));
      expect(screen.getByText('Johnny')).toBeInTheDocument();
      expect(screen.getByText('Janet')).toBeInTheDocument();
    });

    it('collapse hides sub-rows again', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} rowKey="name" defaultExpanded={['John']} />);
      expect(screen.getByText('Johnny')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Collapse John' }));
      expect(screen.queryByText('Johnny')).not.toBeInTheDocument();
      expect(screen.queryByText('Janet')).not.toBeInTheDocument();
      // The row itself, and its unrelated sibling, are unaffected.
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('renderDetailPanel renders panel content beneath the expanded row as valid table semantics', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          rowKey="name"
          renderDetailPanel={row => <p>Details for {row.name}</p>}
        />,
      );
      expect(screen.queryByText('Details for John')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Expand John' }));
      const panelContent = screen.getByText('Details for John');
      expect(panelContent).toBeInTheDocument();

      // Valid table semantics: a real full-width <td> inside its own <tr>, not
      // an arbitrary element dropped in beside the row.
      const panelCell = panelContent.closest('td');
      expect(panelCell).toHaveAttribute('colspan', String(testColumns.length));
      const panelRow = panelCell?.closest('tr');
      expect(panelRow).toBeInTheDocument();
      expect(within(screen.getByRole('table')).getAllByRole('row')).toContain(panelRow);

      // Collapsing removes it again.
      await user.click(screen.getByRole('button', { name: 'Collapse John' }));
      expect(screen.queryByText('Details for John')).not.toBeInTheDocument();
    });

    it('rows excluded by getRowCanExpand render no expand control', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          rowKey="name"
          renderDetailPanel={row => <p>Details for {row.name}</p>}
          getRowCanExpand={row => row.name !== 'Jane'}
        />,
      );

      expect(screen.getByRole('button', { name: 'Expand John' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand Bob' })).toBeInTheDocument();
      // Jane is excluded by getRowCanExpand, even though renderDetailPanel is
      // configured and would otherwise make every row expandable.
      expect(screen.queryByRole('button', { name: 'Expand Jane' })).not.toBeInTheDocument();
    });

    it('expand control renders in the correct column when selection and pin columns are present', () => {
      render(<AdvancedTable columns={testColumns} data={treeData} rowKey="name" enableRowSelection enableRowPinning />);

      // The reserved selection and pin columns are first, but the expand
      // control still targets the consumer's own first column (Name) rather
      // than drifting into (or being blocked by) either reserved leading column.
      const nameCell = screen.getByText('John').closest('td');
      const expandButton = screen.getByRole('button', { name: 'Expand John' });
      expect(nameCell).toContainElement(expandButton);

      const checkboxCell = screen.getByRole('checkbox', { name: 'Select row 1' }).closest('td');
      expect(checkboxCell).not.toContainElement(expandButton);
      expect(checkboxCell).not.toBe(nameCell);

      const pinCell = screen.getByRole('button', { name: 'Pin row 1' }).closest('td');
      expect(pinCell).not.toContainElement(expandButton);
      expect(pinCell).not.toBe(nameCell);
    });

    it('controlled expansion: renders from the expanded prop and emits onExpandedChange', async () => {
      const user = userEvent.setup();
      const onExpandedChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={treeData}
          rowKey="name"
          expanded={[]}
          onExpandedChange={onExpandedChange}
        />,
      );
      expect(screen.queryByText('Johnny')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Expand John' }));
      expect(onExpandedChange).toHaveBeenCalledWith(['John']);
      // Controlled: doesn't expand on its own until the prop is fed back.
      expect(screen.queryByText('Johnny')).not.toBeInTheDocument();

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={treeData}
          rowKey="name"
          expanded={['John']}
          onExpandedChange={onExpandedChange}
        />,
      );
      expect(screen.getByText('Johnny')).toBeInTheDocument();
    });
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

  describe('loading', () => {
    it('shows a loading row instead of the empty state when there is no data yet', () => {
      render(<AdvancedTable columns={testColumns} data={[]} loading />);
      const status = within(screen.getByRole('table')).getByRole('status');
      expect(status).toHaveTextContent('Loading data…');
      expect(status.closest('td')).toBeInTheDocument();
      expect(screen.queryByText('No data to display')).not.toBeInTheDocument();
    });

    it('renders a custom title, description, and icon from the loadingStateProps prop', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={[]}
          loading
          loadingStateProps={{
            title: 'Fetching rows',
            description: 'This should only take a moment.',
            icon: <span data-testid="custom-loading-icon">icon</span>,
          }}
        />,
      );
      expect(screen.getByText('Fetching rows')).toBeInTheDocument();
      expect(screen.getByText('This should only take a moment.')).toBeInTheDocument();
      expect(screen.getByTestId('custom-loading-icon')).toBeInTheDocument();
      expect(screen.queryByText('Loading data…', { selector: 'p' })).not.toBeInTheDocument();
    });

    it('dims existing rows with an overlay instead of replacing them when data is already present', () => {
      render(<AdvancedTable columns={testColumns} data={testData} loading />);
      // Existing rows stay in the document underneath the overlay.
      expect(screen.getByText('John')).toBeInTheDocument();
      const status = within(screen.getByRole('table').parentElement as HTMLElement).getByRole('status');
      expect(status).toHaveTextContent('Loading data…');
      // The overlay isn't the empty-state's <td> wrapper — it sits alongside the table.
      expect(status.closest('td')).not.toBeInTheDocument();
    });

    it('does not show a loading row or overlay when loading is false', () => {
      render(<AdvancedTable columns={testColumns} data={testData} loading={false} />);
      expect(screen.queryByText('Loading data…')).not.toBeInTheDocument();
    });

    it('marks the table aria-busy while loading', () => {
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} loading />);
      expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'true');

      rerender(<AdvancedTable columns={testColumns} data={testData} loading={false} />);
      expect(screen.getByRole('table')).toHaveAttribute('aria-busy', 'false');
    });

    it('disables the sort button while loading', () => {
      const ageSortButton = () => within(screen.getAllByRole('columnheader')[1]).getByRole('button');
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} enableSorting loading />);
      expect(ageSortButton()).toBeDisabled();

      rerender(<AdvancedTable columns={testColumns} data={testData} enableSorting loading={false} />);
      expect(ageSortButton()).not.toBeDisabled();
    });

    it('disables the column menu trigger while loading', () => {
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter loading />);
      expect(screen.getByRole('button', { name: 'Name column menu' })).toBeDisabled();

      rerender(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter loading={false} />);
      expect(screen.getByRole('button', { name: 'Name column menu' })).not.toBeDisabled();
    });

    it('disables pagination controls while loading', () => {
      // 3 pages of 5; seeded on the middle page so Back/Next are both
      // genuinely enabled absent loading (page 1 disables Back structurally,
      // independent of the fieldset this test is exercising).
      const manyRows: TestData[] = Array.from({ length: 15 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
      const pagination = { pageIndex: 1, pageSize: 5 };
      const { rerender } = render(
        <AdvancedTable columns={testColumns} data={manyRows} pagination={pagination} loading />,
      );
      const nav = screen.getByRole('navigation', { name: 'Pagination' });
      within(nav)
        .getAllByRole('button')
        .forEach(button => expect(button).toBeDisabled());
      expect(screen.getByLabelText('Items per page')).toBeDisabled();

      rerender(<AdvancedTable columns={testColumns} data={manyRows} pagination={pagination} loading={false} />);
      within(nav)
        .getAllByRole('button')
        .forEach(button => expect(button).not.toBeDisabled());
      expect(screen.getByLabelText('Items per page')).not.toBeDisabled();
    });

    it('does not disable row-level controls (e.g. selection checkboxes) while loading', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} rowKey="name" enableRowSelection loading />);
      const checkbox = screen.getAllByRole('checkbox', { name: /Select row/ })[0];
      expect(checkbox).not.toBeDisabled();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('announces loading transitions via a live region, silently on initial mount', () => {
      const { container, rerender } = render(<AdvancedTable columns={testColumns} data={[]} loading />);
      const liveRegions = container.querySelectorAll('[aria-live="polite"]');
      const loadingRegion = liveRegions[liveRegions.length - 1];
      // Content is present at mount, but live regions don't announce content
      // that's already there when they're first painted — nothing to assert
      // about actual SR output here, just that a subsequent change is caught.
      expect(loadingRegion).toHaveTextContent('Loading data…');

      rerender(<AdvancedTable columns={testColumns} data={[]} loading={false} />);
      expect(loadingRegion).toHaveTextContent('Data loaded.');
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
      // table-layout: fixed needs the table's own width to be an explicit pixel
      // value (not a percentage) for columns to render at their configured
      // size; fillContainer stretches via a separate min-w-full class so the
      // CSS engine renders whichever of the two is larger.
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} />);
      expect(getTable().style.width).toBe('300px');
      expect(getTable().className).toContain('min-w-full');

      rerender(<AdvancedTable columns={testColumns} data={testData} fillContainer={false} />);
      expect(getTable().style.width).toBe('300px');
      expect(getTable().className).not.toContain('min-w-full');
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

    it('two fully-featured tables on one page produce no DOM id collisions, each correctly self-associated', () => {
      const fullFeatureProps = {
        columns: testColumns,
        data: fullFeatureData,
        rowKey: 'name' as const,
        enableRowSelection: true,
        enableSorting: true,
        enableColumnFilter: true,
        enableColumnPinning: true,
        enableGrouping: true,
        enableRowPinning: true,
        enableColumnReordering: true,
        enableColumnResizing: true,
        defaultExpanded: ['John'],
      };

      const { container } = render(
        <>
          <AdvancedTable {...fullFeatureProps} />
          <AdvancedTable {...fullFeatureProps} />
        </>,
      );

      const tables = container.querySelectorAll('table');
      expect(tables).toHaveLength(2);
      expect(tables[0].id).toBeTruthy();
      expect(tables[1].id).not.toBe(tables[0].id);

      // Every element with an `id`, across both tables, is unique.
      const ids = Array.from(container.querySelectorAll('[id]')).map(el => el.id);
      expect(new Set(ids).size).toBe(ids.length);

      // Each top-level child of `container` is one whole <AdvancedTable> instance
      const tableRoots = Array.from(container.children) as HTMLElement[];
      expect(tableRoots).toHaveLength(2);

      // Check each table for their correct attributes
      const referenceAttrs = ['aria-controls', 'aria-describedby', 'aria-labelledby', 'aria-owns'];
      tableRoots.forEach(root => {
        referenceAttrs.forEach(attr => {
          root.querySelectorAll(`[${attr}]`).forEach(el => {
            const referencedIds = (el.getAttribute(attr) ?? '').split(/\s+/).filter(Boolean);
            referencedIds.forEach(id => {
              const referenced = document.getElementById(id);
              expect(referenced).not.toBeNull();
              expect(root.contains(referenced)).toBe(true);
            });
          });
        });
      });
    });
  });

  describe('types and public API', () => {
    it('rejects a column key that is not part of the row type', () => {
      // @ts-expect-error 'nope' is not a key of TestData
      const badColumn: AdvancedTableColumn<TestData> = { key: 'nope', title: 'Nope' };
      expect(badColumn).toBeDefined();
    });

    it('passing both caption and aria-labelledby is a type error', () => {
      // @ts-expect-error aria-labelledby can't be combined with caption
      const badProps: AdvancedTableProps<TestData> = {
        columns: testColumns,
        data: testData,
        caption: 'People',
        'aria-labelledby': 'people-heading',
      };
      expect(badProps).toBeDefined();
    });

    it('enabling selection without rowKey is a type error', () => {
      // @ts-expect-error rowKey is required when enableRowSelection is set
      const badProps: AdvancedTableProps<TestData> = { columns: testColumns, data: testData, enableRowSelection: true };
      expect(badProps).toBeDefined();
    });
    it('enabling row pinning without rowKey is a type error', () => {
      // @ts-expect-error rowKey is required when enableRowPinning is set
      const badProps: AdvancedTableProps<TestData> = { columns: testColumns, data: testData, enableRowPinning: true };
      expect(badProps).toBeDefined();
    });
    it('enabling expansion without rowKey is a type error', () => {
      // @ts-expect-error rowKey is required when onExpandedChange is set
      const badProps: AdvancedTableProps<TestData> = {
        columns: testColumns,
        data: testData,
        onExpandedChange: vi.fn(),
      };
      expect(badProps).toBeDefined();
    });
    it.todo('enabling editing without rowKey is a type error');
    it.todo('AdvancedTable and its types are exported from the package root');
  });
});
