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

    describe('caption', () => {
      it('exposes an accessible name (caption) for the table', () => {
        render(<AdvancedTable caption="People" columns={testColumns} data={testData} />);
        expect(screen.getByRole('table', { name: 'People' })).toBeInTheDocument();
      });

      it('hides the caption visually by default while keeping it accessible', () => {
        render(<AdvancedTable caption="People" columns={testColumns} data={testData} />);
        expect(screen.getByText('People').closest('caption')).toHaveClass('sr-only');
      });

      it('shows the caption visually when showCaption is true', () => {
        render(<AdvancedTable caption="People" columns={testColumns} data={testData} showCaption />);
        expect(screen.getByText('People').closest('caption')).not.toHaveClass('sr-only');
      });

      it('labels the table via aria-labelledby when provided, without a caption', () => {
        render(
          <>
            <h2 id="people-heading">People</h2>
            <AdvancedTable aria-labelledby="people-heading" columns={testColumns} data={testData} />
          </>,
        );
        expect(screen.getByRole('table', { name: 'People' })).toBeInTheDocument();
      });
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

    it('does not render sort controls when sorting is not enabled', () => {
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

      await user.click(ageSortButton());
      expect(liveRegion).toHaveTextContent('Age sorted descending');

      await user.click(ageSortButton());
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
          onSortingChange={onSortingChange}
          sorting={[{ id: 'age', desc: false }]}
        />,
      );
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
          onSortingChange={onSortingChange}
          sorting={[{ id: 'age', desc: true }]}
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
          onSortingChange={onSortingChange}
          sorting={[{ id: 'age', desc: false }]}
        />,
      );
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
          defaultSorting={[{ id: 'name', desc: false }]}
          enableSorting
        />,
      );
      expect(bodyOrder()).toEqual(['Bob', 'Jane', 'John']);
    });
  });

  describe('column filtering', () => {
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

      await waitFor(() => {
        expect(screen.getByText('Jane')).toBeInTheDocument();
        expect(screen.queryByText('John')).not.toBeInTheDocument();
        expect(screen.queryByText('Bob')).not.toBeInTheDocument();
      });
    });

    it('announces the filter result count via a live region', async () => {
      const user = userEvent.setup();
      const { container } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);
      const liveRegion = container.querySelector('[aria-live="polite"]');
      expect(liveRegion).toBeInTheDocument();

      const filterInput = await openColumnMenu(user, 'Name');
      await user.type(filterInput, 'Jane');
      await waitFor(() => expect(liveRegion).toHaveTextContent('1 matching row.'));

      await user.clear(filterInput);
      await waitFor(() => expect(liveRegion).toHaveTextContent('Filter cleared.'));
    });

    it('shows the empty state when a filter matches no rows', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

      const filterInput = await openColumnMenu(user, 'Name');
      await user.type(filterInput, 'nonexistent');
      await user.keyboard('{Escape}');

      // Scope to the table: pagination (on by default) renders its own status region.
      await waitFor(() => {
        const status = within(screen.getByRole('table')).getByRole('status');
        expect(status).toHaveTextContent('No matching results');
        expect(status).toHaveTextContent('Try adjusting or clearing your filter.');
      });
    });

    it('controlled filters: emits onColumnFiltersChange and renders from the columnFilters prop', async () => {
      const onColumnFiltersChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columnFilters={[]}
          columns={testColumns}
          data={testData}
          enableColumnFilter
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );

      const filterInput = await openColumnMenu(userEvent.setup(), 'Name');
      fireEvent.change(filterInput, { target: { value: 'Jane' } });

      await waitFor(() => expect(onColumnFiltersChange).toHaveBeenCalledWith([{ id: 'name', value: 'Jane' }]));
      // Controlled: doesn't filter on its own until the prop is fed back.
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();

      rerender(
        <AdvancedTable
          columnFilters={[{ id: 'name', value: 'Jane' }]}
          columns={testColumns}
          data={testData}
          enableColumnFilter
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.getByText('Jane')).toBeInTheDocument();
    });

    it('an external filter reset cancels a still-pending debounced commit, rather than re-applying the stale value', async () => {
      const onColumnFiltersChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columnFilters={[{ id: 'name', value: 'Existing' }]}
          columns={testColumns}
          data={testData}
          enableColumnFilter
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );

      const filterInput = await openColumnMenu(userEvent.setup(), 'Name');
      // Types over the existing filter — this commit is debounced and hasn't fired yet.
      fireEvent.change(filterInput, { target: { value: 'Jane' } });

      // Well within the debounce window, the app resets filters from elsewhere (e.g. a "Clear
      // all filters" action), feeding the new columnFilters prop back in.
      await new Promise(resolve => setTimeout(resolve, 100));
      rerender(
        <AdvancedTable
          columnFilters={[]}
          columns={testColumns}
          data={testData}
          enableColumnFilter
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );

      // Wait past the original debounce window: the pending "Jane" commit must not fire and
      // silently undo the external reset.
      await new Promise(resolve => setTimeout(resolve, 400));
      expect(onColumnFiltersChange).not.toHaveBeenCalled();
    });

    it('manual filtering: the table does not filter rows itself, but still tracks and emits filter state', async () => {
      const onColumnFiltersChange = vi.fn();
      render(
        <AdvancedTable
          columnFilters={[{ id: 'name', value: 'Jane' }]}
          columns={testColumns}
          data={testData}
          enableColumnFilter
          manualFiltering
          onColumnFiltersChange={onColumnFiltersChange}
        />,
      );
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();

      const filterInput = await openColumnMenu(userEvent.setup(), 'Name');
      fireEvent.change(filterInput, { target: { value: 'Bob' } });
      await waitFor(() => expect(onColumnFiltersChange).toHaveBeenCalledWith([{ id: 'name', value: 'Bob' }]));
    });

    it('uncontrolled: defaultColumnFilters sets the initial filter', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          defaultColumnFilters={[{ id: 'name', value: 'Jane' }]}
          enableColumnFilter
        />,
      );
      expect(screen.getByText('Jane')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.queryByText('Bob')).not.toBeInTheDocument();
    });
  });

  describe('column pinning', () => {
    const openColumnMenu = async (user: ReturnType<typeof userEvent.setup>, columnName: string) => {
      await user.click(screen.getByRole('button', { name: `${columnName} column menu` }));
      await screen.findByRole('menu');
    };

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
          columnPinning={{ left: ['name'] }}
          columns={testColumns}
          data={testData}
          enableColumnPinning
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
          columnPinning={{ left: [] }}
          columns={testColumns}
          data={testData}
          enableColumnPinning
          onColumnPinningChange={onColumnPinningChange}
        />,
      );
      expect(getComputedStyle(nameHeader()).position).not.toBe('sticky');
    });
  });

  describe('grouping', () => {
    const openColumnMenu = async (user: ReturnType<typeof userEvent.setup>, columnName: string) => {
      await user.click(screen.getByRole('button', { name: `${columnName} column menu` }));
      await screen.findByRole('menu');
    };

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

      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'div' })).toBeInTheDocument();
      expect(screen.getByText(/Age: 25 \(1 row\)/, { selector: 'div' })).toBeInTheDocument();
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
      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'div' })).toBeInTheDocument();

      await openColumnMenu(user, 'Age');
      await user.click(screen.getByRole('menuitem', { name: 'Ungroup' }));
      await user.keyboard('{Escape}');

      expect(screen.queryByText(/Age: 30/, { selector: 'div' })).not.toBeInTheDocument();
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
      expect(screen.queryByText(/Age: 30/, { selector: 'div' })).not.toBeInTheDocument();

      await openColumnMenu(user, 'Age');
      await user.click(screen.getByRole('menuitem', { name: 'Group by Age' }));

      expect(onGroupingChange).toHaveBeenCalledWith(['age']);
      // Controlled: doesn't group on its own until the prop is fed back.
      expect(screen.queryByText(/Age: 30/, { selector: 'div' })).not.toBeInTheDocument();

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          enableGrouping
          grouping={['age']}
          onGroupingChange={onGroupingChange}
        />,
      );
      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'div' })).toBeInTheDocument();
    });

    it('an explicit defaultExpanded overrides grouping\'s implicit "start expanded" default: hidden by default', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          defaultExpanded={[]}
          defaultGrouping={['age']}
          enableGrouping
          rowKey="name"
        />,
      );

      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'div' })).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand Age: 30' })).toBeInTheDocument();
    });

    it('pinning a row that is currently clustered under a group banner removes it from that cluster and shows it only in the pinned section', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          defaultGrouping={['age']}
          enableGrouping
          enableRowPinning
          rowKey="name"
        />,
      );
      // Both John and Jane start clustered under the "Age: 30" banner.
      expect(screen.getByText(/Age: 30 \(2 rows\)/, { selector: 'div' })).toBeInTheDocument();

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

      expect(screen.getByText(/Age: 30 \(1 row\)/, { selector: 'div' })).toBeInTheDocument();
    });

    it('a group whose every member is pinned away renders no banner at all', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={groupingTestData}
          defaultGrouping={['age']}
          enableGrouping
          enableRowPinning
          rowKey="name"
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
      expect(screen.getByText(/Age: 25 \(1 row\)/, { selector: 'div' })).toBeInTheDocument();
    });
  });

  describe('column resizing', () => {
    it('does not show resize handles if `enableColumnResizing` is not set', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);

      expect(screen.queryAllByRole('slider')).toHaveLength(0);
    });

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

    it('offers a single-pointer non-drag resize alternative slider', () => {
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
          columnSizing={{ name: 300 }}
          data={testData}
          enableColumnResizing
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
          columnSizing={{ name: 310 }}
          data={testData}
          enableColumnResizing
          onColumnSizingChange={onColumnSizingChange}
        />,
      );
      expect(handle).toHaveAttribute('aria-valuenow', '310');
    });

    it('reserved selection and row-pin toggle columns are excluded from resizing', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnResizing
          enableRowPinning
          enableRowSelection
          rowKey="name"
        />,
      );

      expect(screen.getByRole('checkbox', { name: 'Select all rows in current page' })).toBeInTheDocument();
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
    // dnd-kit's collision detection needs real, distinct geometry to compare against
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

    // Read just the title label span's text
    const columnHeaderNames = () =>
      within(screen.getByRole('table'))
        .getAllByRole('columnheader')
        .map(th => th.querySelector('[id$="-label"]')?.textContent);

    it('reorders columns via drag and drop controls', () => {
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

    it('offers move left / move right actions in the column menu as alternative options', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnReordering />);

      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      await screen.findByRole('menu');
      expect(screen.queryByRole('menuitem', { name: 'Move left' })).not.toBeInTheDocument();
      await user.keyboard('{Escape}');

      await user.click(screen.getByRole('button', { name: 'Age column menu' }));
      await screen.findByRole('menu');
      expect(screen.queryByRole('menuitem', { name: 'Move right' })).not.toBeInTheDocument();
      await user.click(screen.getByRole('menuitem', { name: 'Move left' }));

      expect(columnHeaderNames()).toEqual(['Age', 'Name']);
    });

    it('reserved selection and pin columns stay first and cannot be reordered', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnReordering
          enableRowPinning
          enableRowSelection
          rowKey="name"
        />,
      );

      expect(screen.getByRole('checkbox', { name: 'Select all rows in current page' })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      await screen.findByRole('menu');
      expect(screen.queryByRole('menuitem', { name: 'Move left' })).not.toBeInTheDocument();
    });

    it('controlled order: renders from the columnOrder prop and emits onColumnOrderChange', async () => {
      const user = userEvent.setup();
      const onColumnOrderChange = vi.fn();
      const { rerender } = render(
        <AdvancedTable
          columnOrder={['age', 'name']}
          columns={testColumns}
          data={testData}
          enableColumnReordering
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
          columnOrder={['name', 'age']}
          columns={testColumns}
          data={testData}
          enableColumnReordering
          onColumnOrderChange={onColumnOrderChange}
        />,
      );
      expect(columnHeaderNames()).toEqual(['Name', 'Age']);
    });

    it('a pinned column stays anchored and excluded from reordering and resizing with resizing and grouping also active', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableColumnPinning
          enableColumnReordering
          enableColumnResizing
          enableGrouping
        />,
      );

      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      await screen.findByRole('menu');
      await user.click(screen.getByRole('menuitem', { name: 'Pin left' }));

      const nameHeader = screen.getByText('Name').closest('th') as HTMLElement;
      expect(getComputedStyle(nameHeader).position).toBe('sticky');

      // Pinned: its own menu no longer offers Move actions at all...
      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      await screen.findByRole('menu');
      expect(screen.queryByRole('menuitem', { name: 'Move left' })).not.toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: 'Move right' })).not.toBeInTheDocument();
      await user.keyboard('{Escape}');

      // The only reorderable column left, with nowhere to move: no Move section at all.
      await user.click(screen.getByRole('button', { name: 'Age column menu' }));
      await screen.findByRole('menu');
      expect(screen.queryByRole('menuitem', { name: 'Move left' })).not.toBeInTheDocument();
      expect(screen.queryByRole('menuitem', { name: 'Move right' })).not.toBeInTheDocument();
      await user.keyboard('{Escape}');

      // Now also excluded from resizing.
      expect(screen.queryByRole('slider', { name: 'Resize Name column' })).not.toBeInTheDocument();
      expect(screen.getByRole('slider', { name: 'Resize Age column' })).toBeInTheDocument();
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
          onSelectionChange={onSelectionChange}
          rowKey="name"
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
      // react-aria's useCheckbox sets the native `indeterminate` DOM property instead of `aria-checked="mixed"`
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

    it('selection keyed by rowKey survives sorting, filtering, and page changes', async () => {
      const user = userEvent.setup();
      const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person${i}`, age: 20 + i }));
      const onSelectionChange = vi.fn();
      const checkboxForRow = (name: string) =>
        within(screen.getByText(name).closest('tr') as HTMLElement).getByRole('checkbox');

      const { rerender } = render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows}
          enableColumnFilter
          enableRowSelection
          enableSorting
          onSelectionChange={onSelectionChange}
          rowKey="name"
          selectedRows={[]}
        />,
      );

      await user.click(checkboxForRow('Person5'));
      expect(onSelectionChange).toHaveBeenCalledWith(['Person5']);
      expect(onSelectionChange).toHaveBeenCalledTimes(1);

      rerender(
        <AdvancedTable
          columns={testColumns}
          data={manyRows}
          enableColumnFilter
          enableRowSelection
          enableSorting
          onSelectionChange={onSelectionChange}
          rowKey="name"
          selectedRows={['Person5']}
        />,
      );
      expect(checkboxForRow('Person5')).toBeChecked();

      // Sorting reorders the visible rows; the same logical row (by rowKey) stays
      // selected, it doesn't drift onto whichever row now occupies that position.
      // The Age header renders both a sort button and a (filter-enabled) column
      // menu trigger — the sort button is the first of the two.
      const ageSortButton = () => within(screen.getAllByRole('columnheader')[1]).getAllByRole('button')[0];
      await user.click(ageSortButton()); // age ascending
      await user.click(ageSortButton()); // age descending
      expect(checkboxForRow('Person5')).toBeChecked();
      // Person6 stays on page 1 in descending order too (unlike Person0/1,
      // which land on page 2) — a real, still-visible, still-unselected row.
      expect(checkboxForRow('Person6')).not.toBeChecked();

      // Filtering down to a narrower set still keyed correctly, no drift or loss.
      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      const filterInput = await screen.findByRole('textbox');
      await user.type(filterInput, 'Person5');
      expect(screen.getByText('Person5')).toBeInTheDocument();
      await user.clear(filterInput);
      // While the menu popover is open, react-aria marks the rest of the page
      // (including the table) aria-hidden — close it before querying by role again.
      await user.keyboard('{Escape}');
      expect(checkboxForRow('Person5')).toBeChecked();

      // Changing pages and back still leaves the same row selected.
      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
      await user.click(screen.getByRole('button', { name: 'Go to page 1' }));
      expect(checkboxForRow('Person5')).toBeChecked();

      // None of sorting, filtering, or paginating ever re-emitted a selection
      // change of their own — only the original click did.
      expect(onSelectionChange).toHaveBeenCalledTimes(1);
    });

    it('select-all only affects rows on the current page, not the whole dataset', async () => {
      const user = userEvent.setup();
      const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
      const onSelectionChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows}
          enableRowSelection
          onSelectionChange={onSelectionChange}
          rowKey="name"
        />,
      );

      await user.click(screen.getByRole('checkbox', { name: 'Select all rows in current page' }));
      // Default page size is 10, only the first 10 rows should be selected
      expect(onSelectionChange).toHaveBeenCalledWith(Array.from({ length: 10 }, (_, i) => `Person ${i}`));

      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
      expect(screen.getByRole('checkbox', { name: 'Select row 11' })).not.toBeChecked();
      const page2SelectAll = screen.getByRole<HTMLInputElement>('checkbox', {
        name: 'Select all rows in current page',
      });
      expect(page2SelectAll).not.toBeChecked();
      expect(page2SelectAll.indeterminate).toBe(true);
    });

    it('select-all reads indeterminate across pages: a page with zero of its own rows selected still signals selection elsewhere', async () => {
      const user = userEvent.setup();
      const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
      render(<AdvancedTable columns={testColumns} data={manyRows} enableRowSelection rowKey="name" />);

      await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }));
      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));

      const selectAll = screen.getByRole<HTMLInputElement>('checkbox', { name: 'Select all rows in current page' });
      expect(selectAll).not.toBeChecked();
      expect(selectAll.indeterminate).toBe(true);

      // Deselecting the only selected row (back on page 1) clears the cross-page signal too.
      await user.click(screen.getByRole('button', { name: 'Go to page 1' }));
      await user.click(screen.getByRole('checkbox', { name: 'Select row 1' }));
      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
      const selectAllAfterClear = screen.getByRole<HTMLInputElement>('checkbox', {
        name: 'Select all rows in current page',
      });
      expect(selectAllAfterClear.indeterminate).toBe(false);
    });

    it('select-all accounts for a pinned row rendered on this page but positioned on another', async () => {
      const user = userEvent.setup();
      const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person${i}`, age: 20 + i }));
      render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows}
          enableRowPinning
          enableRowSelection
          rowKey="name"
          // Person11 naturally belongs to page 2 (default page size 10), but pinning renders it on page 1.
          defaultPinnedRows={['Person11']}
        />,
      );

      const checkboxForRow = (name: string) =>
        within(screen.getByText(name).closest('tr') as HTMLElement).getByRole('checkbox');
      const selectAll = screen.getByRole<HTMLInputElement>('checkbox', { name: 'Select all rows in current page' });

      await user.click(checkboxForRow('Person11'));
      expect(selectAll.indeterminate).toBe(true);
      expect(selectAll).not.toBeChecked();

      // Selecting all should also pick up the pinned row that's actually visible on page 1.
      await user.click(selectAll);
      expect(selectAll).toBeChecked();
      expect(checkboxForRow('Person11')).toBeChecked();

      await user.click(selectAll);
      expect(selectAll).not.toBeChecked();
      expect(checkboxForRow('Person11')).not.toBeChecked();
    });

    it('a stale or incorrect id in a controlled selectedRows does not make select-all read as checked/indeterminate', () => {
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

    it('selecting a nested tree-data (subRows) child row is not immediately dropped as stale', async () => {
      type TreeData = TestData & { subRows?: TreeData[] };
      const treeData: TreeData[] = [{ name: 'John', age: 30, subRows: [{ name: 'Johnny', age: 5 }] }];
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={treeData}
          enableRowSelection
          onSelectionChange={onSelectionChange}
          rowKey="name"
        />,
      );

      await user.click(screen.getByRole('button', { name: 'Expand John' }));
      const johnnyCheckbox = within(screen.getByText('Johnny').closest('tr') as HTMLElement).getByRole('checkbox');
      await user.click(johnnyCheckbox);

      expect(johnnyCheckbox).toBeChecked();
      expect(onSelectionChange).toHaveBeenLastCalledWith(['John.Johnny']);
    });

    it('labels a collapsed parent row as selecting its collapsed children too, and numbers nested rows correctly once expanded', async () => {
      type TreeData = TestData & { subRows?: TreeData[] };
      const treeData: TreeData[] = [
        { name: 'John', age: 30, subRows: [{ name: 'Johnny', age: 5 }] },
        { name: 'Bob', age: 40 },
      ];
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} enableRowSelection rowKey="name" />);

      // Collapsed: John's checkbox warns it also toggles the (currently hidden) child.
      // Bob is already "row 3" even while Johnny is hidden — numbering comes from
      // the full flattened list so it never shifts as rows expand/collapse.
      expect(screen.getByRole('checkbox', { name: 'Select row 1 and collapsed rows' })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Select row 3' })).toBeInTheDocument(); // Bob

      await user.click(screen.getByRole('button', { name: 'Expand John' }));

      // Expanded: no longer "collapsed", and Johnny is now visible at its stable number.
      expect(screen.getByRole('checkbox', { name: 'Select row 1' })).toBeInTheDocument(); // John
      expect(screen.getByRole('checkbox', { name: 'Select row 2' })).toBeInTheDocument(); // Johnny
      expect(screen.getByRole('checkbox', { name: 'Select row 3' })).toBeInTheDocument(); // Bob
    });

    it('a parent shows checked once every child is individually selected, and indeterminate again if one is cleared', async () => {
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
      ];
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} enableRowSelection rowKey="name" />);
      await user.click(screen.getByRole('button', { name: 'Expand John' }));

      const johnCheckbox = screen.getByRole<HTMLInputElement>('checkbox', { name: /Select row 1/ });
      const johnnyCheckbox = within(screen.getByText('Johnny').closest('tr') as HTMLElement).getByRole('checkbox');
      const janetCheckbox = within(screen.getByText('Janet').closest('tr') as HTMLElement).getByRole('checkbox');

      await user.click(johnnyCheckbox);
      expect(johnCheckbox.indeterminate).toBe(true);
      expect(johnCheckbox).not.toBeChecked();

      await user.click(janetCheckbox);
      // Every child selected individually — John was never toggled directly,
      // but should read as fully checked, not cleared.
      expect(johnCheckbox.indeterminate).toBe(false);
      expect(johnCheckbox).toBeChecked();

      await user.click(janetCheckbox);
      expect(johnCheckbox.indeterminate).toBe(true);
      expect(johnCheckbox).not.toBeChecked();
    });

    it('clicking a parent while indeterminate selects the rest, rather than clearing what is already checked', async () => {
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
      ];
      const user = userEvent.setup();
      const onSelectionChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={treeData}
          enableRowSelection
          onSelectionChange={onSelectionChange}
          rowKey="name"
        />,
      );
      await user.click(screen.getByRole('button', { name: 'Expand John' }));

      const johnCheckbox = screen.getByRole<HTMLInputElement>('checkbox', { name: /Select row 1/ });
      const johnnyCheckbox = within(screen.getByText('Johnny').closest('tr') as HTMLElement).getByRole('checkbox');
      const janetCheckbox = within(screen.getByText('Janet').closest('tr') as HTMLElement).getByRole('checkbox');

      // Select all via the parent, then individually clear one child — John's own
      // selection entry is now stale (still "selected" from the cascade) even though
      // the row reads as indeterminate.
      await user.click(johnCheckbox);
      await user.click(johnnyCheckbox);
      expect(johnCheckbox.indeterminate).toBe(true);
      expect(johnnyCheckbox).not.toBeChecked();
      expect(janetCheckbox).toBeChecked();

      // Clicking John while indeterminate must select the rest (Johnny), not clear
      // the sibling that's still checked (Janet).
      await user.click(johnCheckbox);
      expect(johnCheckbox.indeterminate).toBe(false);
      expect(johnCheckbox).toBeChecked();
      expect(johnnyCheckbox).toBeChecked();
      expect(janetCheckbox).toBeChecked();
      expect(onSelectionChange).toHaveBeenLastCalledWith(expect.arrayContaining(['John', 'John.Johnny', 'John.Janet']));
    });

    it('select-all agrees with the per-row checkboxes once every child of a parent is selected individually', async () => {
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
      ];
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} enableRowSelection rowKey="name" />);
      await user.click(screen.getByRole('button', { name: 'Expand John' }));

      const selectAll = screen.getByRole<HTMLInputElement>('checkbox', { name: 'Select all rows in current page' });
      const johnnyCheckbox = within(screen.getByText('Johnny').closest('tr') as HTMLElement).getByRole('checkbox');
      const janetCheckbox = within(screen.getByText('Janet').closest('tr') as HTMLElement).getByRole('checkbox');

      // John (the parent) is never toggled directly — only its two children are.
      await user.click(johnnyCheckbox);
      await user.click(janetCheckbox);

      // Every row's own checkbox reads as checked (including John's, via the subrows-selected
      // fallback), so select-all must agree rather than still showing indeterminate/unchecked.
      expect(screen.getByRole<HTMLInputElement>('checkbox', { name: /Select row 1/ })).toBeChecked();
      expect(selectAll.indeterminate).toBe(false);
      expect(selectAll).toBeChecked();
    });

    it('a parent that reads as checked only via its children (never toggled directly itself) can still be unchecked', async () => {
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
      ];
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} enableRowSelection rowKey="name" />);
      await user.click(screen.getByRole('button', { name: 'Expand John' }));

      const johnCheckbox = screen.getByRole<HTMLInputElement>('checkbox', { name: /Select row 1/ });
      const johnnyCheckbox = within(screen.getByText('Johnny').closest('tr') as HTMLElement).getByRole('checkbox');
      const janetCheckbox = within(screen.getByText('Janet').closest('tr') as HTMLElement).getByRole('checkbox');

      // John (the parent) is never toggled directly — only its two children are — so its own raw
      // selection id is never set, even though it now reads as fully checked via aggregation.
      await user.click(johnnyCheckbox);
      await user.click(janetCheckbox);
      expect(johnCheckbox).toBeChecked();

      // Clicking a checkbox that reads as checked only through its children must still take
      // effect, clearing every descendant — not silently no-op because the parent's own raw id
      // was already "unselected".
      await user.click(johnCheckbox);
      expect(johnCheckbox).not.toBeChecked();
      expect(johnCheckbox.indeterminate).toBe(false);
      expect(johnnyCheckbox).not.toBeChecked();
      expect(janetCheckbox).not.toBeChecked();
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
      render(<AdvancedTable columns={testColumns} data={testData} enableRowPinning rowKey="name" />);
      expect(allBodyOrder()).toEqual(['John', 'Jane', 'Bob']);

      await user.click(screen.getByRole('button', { name: 'Pin row 3' }));
      // Bob (row 3) is lifted above the other, unpinned rows.
      expect(allBodyOrder()).toEqual(['Bob', 'John', 'Jane']);
    });

    it('unpinning returns the row to its natural position', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableRowPinning rowKey="name" />);

      await user.click(screen.getByRole('button', { name: 'Pin row 3' }));
      expect(allBodyOrder()).toEqual(['Bob', 'John', 'Jane']);

      await user.click(screen.getByRole('button', { name: 'Unpin row 3' }));
      expect(allBodyOrder()).toEqual(['John', 'Jane', 'Bob']);
    });

    it('pinning a row pins its sub-rows with it', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} enableRowPinning rowKey="name" />);

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
      render(<AdvancedTable columns={testColumns} data={manyRows} enableRowPinning enableSorting rowKey="name" />);

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
      render(<AdvancedTable columns={testColumns} data={testData} enableRowPinning rowKey="name" />);

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
          enableRowPinning
          onPinnedRowsChange={onPinnedRowsChange}
          pinnedRows={[]}
          rowKey="name"
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
          enableRowPinning
          onPinnedRowsChange={onPinnedRowsChange}
          pinnedRows={['Bob']}
          rowKey="name"
        />,
      );
      expect(allBodyOrder()).toEqual(['Bob', 'John', 'Jane']);
    });

    it('a pinned row stays visible when it no longer matches an active column filter', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter enableRowPinning rowKey="name" />);

      await user.click(screen.getByRole('button', { name: 'Pin row 1' }));
      expect(screen.getByText('John')).toBeInTheDocument();

      // Filter the Name column for a value John doesn't match.
      await user.click(screen.getByRole('button', { name: 'Name column menu' }));
      const filterInput = await screen.findByRole('textbox');
      await user.type(filterInput, 'Jane');

      // John no longer matches the filter, but stays visible since it's pinned.
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    it('a pinned row filtered out of the center rows still gets an accessible name on its toggle', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter enableRowPinning rowKey="name" />);

      await user.click(screen.getByRole('button', { name: 'Pin row 1' }));

      await user.click(screen.getByRole('button', { name: 'Name column menu' }));

      const filterInput = await screen.findByRole('textbox');
      await user.type(filterInput, 'Jane');
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

      // Sub-rows aren't in the DOM until expanded
      expect(screen.queryByText('Johnny')).not.toBeInTheDocument();
      expect(screen.queryByText('Janet')).not.toBeInTheDocument();
      // A leaf row (not nested, no subRows) offers no expand control at all.
      expect(screen.queryByRole('button', { name: /Bob/ })).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Expand John' }));
      expect(screen.getByText('Johnny')).toBeInTheDocument();
      expect(screen.getByText('Janet')).toBeInTheDocument();
    });

    it('collapse hides sub-rows again', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={treeData} defaultExpanded={['John']} rowKey="name" />);
      expect(screen.getByText('Johnny')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Collapse John' }));
      expect(screen.queryByText('Johnny')).not.toBeInTheDocument();
      expect(screen.queryByText('Janet')).not.toBeInTheDocument();
      // The row itself, and its unrelated sibling, are unaffected.
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
    });

    it('`renderDetailPanel` renders panel content beneath the expanded row as valid table semantics', async () => {
      const user = userEvent.setup();
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          renderDetailPanel={row => <p>Details for {row.name}</p>}
          rowKey="name"
        />,
      );
      expect(screen.queryByText('Details for John')).not.toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Expand John' }));
      const panelContent = screen.getByText('Details for John');
      expect(panelContent).toBeInTheDocument();

      const panelCell = panelContent.closest('td');
      expect(panelCell).toHaveAttribute('colspan', String(testColumns.length));
      const panelRow = panelCell?.closest('tr');
      expect(panelRow).toBeInTheDocument();
      expect(within(screen.getByRole('table')).getAllByRole('row')).toContain(panelRow);

      await user.click(screen.getByRole('button', { name: 'Collapse John' }));
      expect(screen.queryByText('Details for John')).not.toBeInTheDocument();
    });

    it('rows excluded by getRowCanExpand render no expand control', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          getRowCanExpand={row => row.name !== 'Jane'}
          renderDetailPanel={row => <p>Details for {row.name}</p>}
          rowKey="name"
        />,
      );

      expect(screen.getByRole('button', { name: 'Expand John' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Expand Bob' })).toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Expand Jane' })).not.toBeInTheDocument();
    });

    it('expand control renders in the correct column when selection and pin columns are present', () => {
      render(<AdvancedTable columns={testColumns} data={treeData} enableRowPinning enableRowSelection rowKey="name" />);

      const nameCell = screen.getByText('John').closest('td');
      const expandButton = screen.getByRole('button', { name: 'Expand John' });
      expect(nameCell).toContainElement(expandButton);

      const checkboxCell = screen.getByRole('checkbox', { name: 'Select row 1 and collapsed rows' }).closest('td');
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
          expanded={[]}
          onExpandedChange={onExpandedChange}
          rowKey="name"
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
          expanded={['John']}
          onExpandedChange={onExpandedChange}
          rowKey="name"
        />,
      );
      expect(screen.getByText('Johnny')).toBeInTheDocument();
    });
  });

  describe('pagination', () => {
    const manyRows: TestData[] = Array.from({ length: 12 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
    const getBodyRows = () =>
      within(screen.getByRole('table').querySelector('tbody') as HTMLElement).getAllByRole('row');

    it('renders pagination controls and only the current page of rows', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} />);

      expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();

      expect(getBodyRows()).toHaveLength(10);
      expect(screen.getByText('Person 0')).toBeInTheDocument();
      expect(screen.queryByText('Person 11')).not.toBeInTheDocument();
    });

    it('changing page updates the visible rows', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={manyRows} />);
      expect(screen.getByText('Person 0')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Go to page 2' }));
      // Page 2 shows the remaining two rows and drops the first page.
      expect(getBodyRows()).toHaveLength(2);
      expect(screen.getByText('Person 11')).toBeInTheDocument();
      expect(screen.queryByText('Person 0')).not.toBeInTheDocument();
    });

    it('changing page size updates the visible row count', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={manyRows} />);
      expect(getBodyRows()).toHaveLength(10);

      await user.selectOptions(screen.getByLabelText('Items per page'), '5');
      expect(getBodyRows()).toHaveLength(5);
    });

    it('page-size options are configurable', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} pageSizeOptions={[3, 6]} />);
      const options = within(screen.getByLabelText('Items per page')).getAllByRole('option');
      expect(options.map(option => option.textContent)).toEqual(['3', '6']);
    });

    it('defaults to a page size that is actually one of pageSizeOptions when the hardcoded default is not offered', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} pageSizeOptions={[8, 16, 24]} />);
      expect(screen.getByLabelText<HTMLSelectElement>('Items per page').value).toBe('8');
      expect(getBodyRows()).toHaveLength(8);
    });

    it('an out-of-range controlled pageIndex does not render the empty state when data exists', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} pagination={{ pageIndex: 5, pageSize: 10 }} />);
      expect(screen.queryByText('No data to display')).not.toBeInTheDocument();
    });

    it('controlled pagination: renders from the pagination prop ({ pageIndex, pageSize }) and emits onPaginationChange', async () => {
      const user = userEvent.setup();
      const onPaginationChange = vi.fn();
      render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows}
          onPaginationChange={onPaginationChange}
          pagination={{ pageIndex: 1, pageSize: 5 }}
        />,
      );
      // Reflects the controlled prop: page 2 of size 5 shows rows 5–9.
      expect(getBodyRows()).toHaveLength(5);
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

      expect(getBodyRows()).toHaveLength(5);
      expect(screen.getByText('Person 5')).toBeInTheDocument();
      expect(screen.queryByText('Person 0')).not.toBeInTheDocument();
    });

    it('can be disabled with enablePagination={false}, rendering every row at once', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} enablePagination={false} />);
      expect(getBodyRows()).toHaveLength(12);
      expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();
    });

    it('manual pagination: the table does not slice data itself, but still tracks and emits pagination state', async () => {
      const onPaginationChange = vi.fn();
      // Only a single page's worth of rows is ever supplied, as a real API response would.
      const onePageOfRows = manyRows.slice(5, 10);
      render(
        <AdvancedTable
          columns={testColumns}
          data={onePageOfRows}
          manualPagination
          onPaginationChange={onPaginationChange}
          pagination={{ pageIndex: 1, pageSize: 5 }}
          rowCount={manyRows.length}
        />,
      );
      // All 5 supplied rows render as-is — the table does not re-slice them.
      expect(getBodyRows()).toHaveLength(5);
      expect(screen.getByText('Person 5')).toBeInTheDocument();

      await userEvent.setup().click(screen.getByRole('button', { name: 'Go to page 3' }));
      expect(onPaginationChange).toHaveBeenCalledWith({ pageIndex: 2, pageSize: 5 });
    });

    it('rowCount drives the page-count calculation and row-range summary under manual pagination', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows.slice(0, 5)}
          manualPagination
          onPaginationChange={vi.fn()}
          pagination={{ pageIndex: 0, pageSize: 5 }}
          rowCount={manyRows.length}
        />,
      );
      expect(screen.getByText('1 – 5 of 12')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Go to page 3' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();
    });

    it('disables Next on the last page as computed from rowCount under manual pagination', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={manyRows.slice(10, 12)}
          manualPagination
          onPaginationChange={vi.fn()}
          pagination={{ pageIndex: 2, pageSize: 5 }}
          rowCount={manyRows.length}
        />,
      );
      expect(screen.getByText('11 – 12 of 12')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
    });
  });

  describe('empty state', () => {
    it('renders the default empty state when data is empty', () => {
      render(<AdvancedTable columns={testColumns} data={[]} />);

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();

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

    it('renders custom children from the emptyState prop', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={[]}
          emptyState={{ children: <a href="https://google.com">Click here</a> }}
        />,
      );
      const customLink = screen.getByText('Click here');
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveAttribute('href', 'https://google.com');
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

    it('renders a custom label from the loadingStateProps prop, forwarded to ProgressIndicator', () => {
      render(<AdvancedTable columns={testColumns} data={[]} loading loadingStateProps={{ label: 'Fetching rows' }} />);
      const status = within(screen.getByRole('table')).getByRole('status');
      expect(status).toHaveTextContent('Fetching rows');
      expect(status).not.toHaveTextContent('Loading data…');
    });

    it('dims existing rows with an overlay instead of replacing them when data is already present', () => {
      render(<AdvancedTable columns={testColumns} data={testData} loading />);

      expect(screen.getByText('John')).toBeInTheDocument();
      const status = within(screen.getByRole('table').parentElement as HTMLElement).getByRole('status');
      expect(status).toHaveTextContent('Loading data…');

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

    it('disables the sort button while loading, without blurring it', () => {
      const ageSortButton = () => within(screen.getAllByRole('columnheader')[1]).getByRole('button');
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} enableSorting loading />);
      ageSortButton().focus();
      expect(ageSortButton()).toHaveAttribute('aria-disabled', 'true');
      expect(ageSortButton()).toHaveFocus();

      fireEvent.click(ageSortButton());
      expect(screen.getAllByRole('columnheader')[1]).toHaveAttribute('aria-sort', 'none');

      rerender(<AdvancedTable columns={testColumns} data={testData} enableSorting loading={false} />);
      expect(ageSortButton()).not.toHaveAttribute('aria-disabled');
    });

    it('disables the column menu trigger while loading', () => {
      const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter loading />);
      expect(screen.getByRole('button', { name: 'Name column menu' })).toBeDisabled();

      rerender(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter loading={false} />);
      expect(screen.getByRole('button', { name: 'Name column menu' })).not.toBeDisabled();
    });

    it('disables pagination controls while loading', () => {
      const manyRows: TestData[] = Array.from({ length: 15 }, (_, i) => ({ name: `Person ${i}`, age: 20 + i }));
      const pagination = { pageIndex: 1, pageSize: 5 };
      const { rerender } = render(
        <AdvancedTable columns={testColumns} data={manyRows} loading pagination={pagination} />,
      );
      const nav = screen.getByRole('navigation', { name: 'Pagination' });
      within(nav)
        .getAllByRole('button')
        .forEach(button => expect(button).toBeDisabled());
      expect(screen.getByLabelText('Items per page')).toBeDisabled();

      rerender(<AdvancedTable columns={testColumns} data={manyRows} loading={false} pagination={pagination} />);
      within(nav)
        .getAllByRole('button')
        .forEach(button => expect(button).not.toBeDisabled());
      expect(screen.getByLabelText('Items per page')).not.toBeDisabled();
    });

    it('does not disable row-level controls (e.g. selection checkboxes) while loading', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection loading rowKey="name" />);
      const checkbox = screen.getAllByRole('checkbox', { name: /Select row/ })[0];
      expect(checkbox).not.toBeDisabled();
      await user.click(checkbox);
      expect(checkbox).toBeChecked();
    });

    it('announces loading transitions via a live region, silently on initial mount', () => {
      const { container, rerender } = render(<AdvancedTable columns={testColumns} data={[]} loading />);
      const liveRegions = container.querySelectorAll('[aria-live="polite"]');
      const loadingRegion = liveRegions[liveRegions.length - 1];
      // Content is present at mount but live regions don't announce content
      expect(loadingRegion).toHaveTextContent('Loading data…');

      rerender(<AdvancedTable columns={testColumns} data={[]} loading={false} />);
      expect(loadingRegion).toHaveTextContent('Data loaded.');
    });
  });

  describe('table layout', () => {
    const getTable = () => screen.getByRole('table');

    it('defaults to fixed layout', () => {
      render(<AdvancedTable columns={testColumns} data={testData} />);
      expect(getTable().className).toContain('table-fixed');
      expect(getTable().className).not.toContain('table-auto');
    });

    it('renders auto layout when tableLayout is set to "auto"', () => {
      render(<AdvancedTable columns={testColumns} data={testData} tableLayout="auto" />);
      expect(getTable().className).toContain('table-auto');
      expect(getTable().className).not.toContain('table-fixed');
    });
  });

  describe('row header column', () => {
    type RowHeaderData = { name: string; amount: number };
    const rowHeaderColumns: AdvancedTableColumn<RowHeaderData>[] = [
      { key: 'name', title: 'Name', isRowHeader: true },
      { key: 'amount', title: 'Amount' },
    ];
    const rowHeaderData: RowHeaderData[] = [
      { name: 'Ava', amount: 100 },
      { name: 'Marcus', amount: 200 },
    ];

    it('renders the designated column’s body cells as <th scope="row">', () => {
      render(<AdvancedTable columns={rowHeaderColumns} data={rowHeaderData} />);
      const rowHeaders = screen.getAllByRole('rowheader');
      expect(rowHeaders.map(cell => cell.textContent)).toEqual(['Ava', 'Marcus']);
    });

    it('leaves the designated column’s own header cell as scope="col"', () => {
      render(<AdvancedTable columns={rowHeaderColumns} data={rowHeaderData} />);
      expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('scope', 'col');
    });

    it('renders every other column as plain <td> cells', () => {
      render(<AdvancedTable columns={rowHeaderColumns} data={rowHeaderData} />);
      expect(screen.getAllByRole('cell')).toHaveLength(rowHeaderData.length);
    });
  });

  describe('accessibility', () => {
    type TreeData = TestData & { subRows?: TreeData[] };
    const fullFeatureData: TreeData[] = [
      { name: 'John', age: 30, subRows: [{ name: 'Johnny', age: 5 }] },
      { name: 'Jane', age: 25 },
    ];

    // This test might be excessive, we already test each element via flags.
    it('every interactive element is reachable by keyboard in a logical order (full capability)', () => {
      const { container } = render(
        <AdvancedTable
          columns={testColumns}
          data={fullFeatureData}
          defaultExpanded={['John']}
          enableColumnFilter
          enableColumnPinning
          enableColumnReordering
          enableColumnResizing
          enableGrouping
          enableRowPinning
          enableRowSelection
          enableSorting
          rowKey="name"
        />,
      );

      // Every focusable control, in real DOM (tab) order.
      const focusable = Array.from(
        container.querySelectorAll<HTMLElement>('button:not([disabled]), [role="slider"], input, select'),
      );
      const indexOf = (el: HTMLElement) => focusable.indexOf(el);

      const selectAll = screen.getByRole('checkbox', { name: 'Select all rows in current page' });
      const nameDragHandle = screen.getByRole('button', { name: 'Name' });

      // The Name header renders drag-handle, sort, then menu-trigger buttons, in that order.
      const nameSortButton = within(screen.getAllByRole('columnheader')[2]).getAllByRole('button')[1];
      const nameMenuTrigger = screen.getByRole('button', { name: 'Name column menu' });
      const nameResizeHandle = screen.getByRole('slider', { name: 'Resize Name column' });
      const ageDragHandle = screen.getByRole('button', { name: 'Age' });

      const johnCheckbox = within(screen.getByText('John').closest('tr') as HTMLElement).getByRole('checkbox');
      const johnPinToggle = screen.getByRole('button', { name: 'Pin row 1' });

      // defaultExpanded={['John']} means it's already expanded, so the toggle reads "Collapse".
      const johnExpandButton = screen.getByRole('button', { name: 'Collapse John' });
      const johnnyCheckbox = within(screen.getByText('Johnny').closest('tr') as HTMLElement).getByRole('checkbox');
      const janeCheckbox = within(screen.getByText('Jane').closest('tr') as HTMLElement).getByRole('checkbox');

      // The page-size select, not a pagination nav button
      const firstPaginationControl = screen.getByLabelText('Items per page');

      // Header controls, left to right: the reserved select-all checkbox, then each column's own drag-handle -> sort -> menu -> resize handle.
      expect(indexOf(selectAll)).toBeLessThan(indexOf(nameDragHandle));
      expect(indexOf(nameDragHandle)).toBeLessThan(indexOf(nameSortButton));
      expect(indexOf(nameSortButton)).toBeLessThan(indexOf(nameMenuTrigger));
      expect(indexOf(nameMenuTrigger)).toBeLessThan(indexOf(nameResizeHandle));
      expect(indexOf(nameResizeHandle)).toBeLessThan(indexOf(ageDragHandle));

      // All header controls precede all row controls.
      expect(indexOf(ageDragHandle)).toBeLessThan(indexOf(johnCheckbox));

      // Per-row controls, in order: checkbox -> pin toggle -> expand toggle.
      expect(indexOf(johnCheckbox)).toBeLessThan(indexOf(johnPinToggle));
      expect(indexOf(johnPinToggle)).toBeLessThan(indexOf(johnExpandButton));

      // A row's own controls precede its expanded sub-row's, which precede the next sibling row's.
      expect(indexOf(johnExpandButton)).toBeLessThan(indexOf(johnnyCheckbox));
      expect(indexOf(johnnyCheckbox)).toBeLessThan(indexOf(janeCheckbox));

      // Every row control precedes pagination.
      expect(indexOf(janeCheckbox)).toBeLessThan(indexOf(firstPaginationControl));
    });

    it('all table-specific interactive targets meet the 24x24px minimum size', () => {
      render(
        <AdvancedTable
          columns={testColumns}
          data={fullFeatureData}
          defaultExpanded={['John']}
          enableColumnFilter
          enableColumnPinning
          enableColumnReordering
          enableColumnResizing
          enableGrouping
          enableRowPinning
          enableRowSelection
          enableSorting
          rowKey="name"
        />,
      );

      // GEL uses a 6px scale, so `size-4` is actually 24px.
      const has = (el: Element | null, className: string) => Boolean(el && el.className.includes(className));

      // Selection checkboxes: the clickable target is the wrapping <label>.
      // Checkboxes should be 48px size, may need to change based on audit feedback (or void based on designer feedback, not mobile centric)
      const selectAll = screen.getByRole('checkbox', { name: 'Select all rows in current page' });
      expect(has(selectAll.closest('label'), 'size-4')).toBe(true);
      const johnCheckbox = within(screen.getByText('John').closest('tr') as HTMLElement).getByRole('checkbox');
      expect(has(johnCheckbox.closest('label'), 'size-4')).toBe(true);

      // Row pin toggle.
      expect(screen.getByRole('button', { name: 'Pin row 1' }).className).toContain('size-4');

      // Per-row expand toggle.
      const johnExpand = screen.getByRole('button', { name: 'Collapse John' });
      expect(johnExpand.className).toContain('size-full');
      expect(has(johnExpand.parentElement, 'size-4')).toBe(true);

      // Header sort button and column-menu trigger.
      const nameSortButton = within(screen.getAllByRole('columnheader')[2]).getAllByRole('button')[1];
      expect(nameSortButton.className).toContain('size-4');
      expect(screen.getByRole('button', { name: 'Name column menu' }).className).toContain('size-4');

      // Drag handle: width the text but min-h-4 still guarantees at least a 24px-tall hit target.
      expect(screen.getByRole('button', { name: 'Name' }).className).toContain('min-h-4');

      // Resize handle: size of the sizer follows react-aria handle at 18px. Additional options for keyboard navigation
      // and in-menu options are available.
      expect(screen.getByRole('slider', { name: 'Resize Name column' }).className).toContain('w-[18px]');

      // Pagination is from the existing GEL component, no need to test.
    });

    it('interactive icon controls have accurate accessible names', () => {
      const { unmount } = render(
        <AdvancedTable
          columns={testColumns}
          data={fullFeatureData}
          defaultExpanded={['John']}
          enableColumnFilter
          enableColumnPinning
          enableColumnReordering
          enableColumnResizing
          enableRowPinning
          enableSorting
          rowKey="name"
        />,
      );

      expect(screen.getByRole('button', { name: 'Name column menu' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Name sort' })).toBeInTheDocument();
      expect(screen.getByRole('slider', { name: 'Resize Name column' })).toBeInTheDocument();

      // Drag handle: labelled by the column's own name, with dnd-kit's own "sortable" role description read out alongside it.
      const dragHandle = screen.getByRole('button', { name: 'Name' });
      expect(dragHandle).toHaveAttribute('aria-roledescription', 'sortable');

      expect(screen.getByRole('button', { name: 'Pin row 1' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Collapse John' })).toBeInTheDocument();
      unmount();

      const groupingNamesData: TestData[] = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 30 },
      ];
      render(<AdvancedTable columns={testColumns} data={groupingNamesData} defaultGrouping={['age']} enableGrouping />);
      expect(screen.getByRole('button', { name: 'Collapse Age: 30' })).toBeInTheDocument();
    });

    describe('column menu', () => {
      it('column menu is keyboard operable (open and close)', async () => {
        const user = userEvent.setup();
        render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

        const trigger = screen.getByRole('button', { name: 'Name column menu' });
        trigger.focus();
        await user.keyboard('{Enter}');

        const filterInput = await screen.findByRole('textbox');
        await user.type(filterInput, 'Jane');
        await waitFor(() => expect(screen.queryByText('John')).not.toBeInTheDocument());

        await user.keyboard('{Escape}');
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
        await waitFor(() => expect(trigger).toHaveFocus());
      });

      it('the column menu trigger points aria-controls at the open menu', async () => {
        const user = userEvent.setup();
        render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

        const trigger = screen.getByRole('button', { name: 'Name column menu' });
        expect(trigger).not.toHaveAttribute('aria-controls');

        await user.click(trigger);
        const menu = await screen.findByRole('menu');
        expect(trigger).toHaveAttribute('aria-controls', menu.id);
      });

      it('a menu with a filter section opens focused directly on the filter input', async () => {
        const user = userEvent.setup();
        render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

        const trigger = screen.getByRole('button', { name: 'Name column menu' });
        trigger.focus();
        await user.keyboard('{Enter}');

        const filterInput = await screen.findByRole('textbox');
        await waitFor(() => expect(filterInput).toHaveFocus());
      });

      it('opening via Enter/Space focuses the first item directly, unlike a mouse click which focuses the menu itself', async () => {
        const user = userEvent.setup();
        render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);

        const trigger = screen.getByRole('button', { name: 'Name column menu' });
        trigger.focus();
        await user.keyboard('{Enter}');

        expect(screen.getByRole('menuitem', { name: 'Pin left' })).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('menuitem', { name: 'Pin right' })).toHaveFocus();
      });

      it('opening via mouse click focuses the menu itself —> Arrow Down then selects the first item', async () => {
        const user = userEvent.setup();
        render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);

        const trigger = screen.getByRole('button', { name: 'Name column menu' });
        await user.click(trigger);

        const menu = await screen.findByRole('menu');
        expect(menu).toHaveFocus();

        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('menuitem', { name: 'Pin left' })).toHaveFocus();
      });

      it('the focused menu item carries a focus-visible outline class for keyboard users', async () => {
        // While we shouldn't normally test classes, this one is important, without visual indicators, we can't tell where we are at.
        const user = userEvent.setup();
        render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);

        const trigger = screen.getByRole('button', { name: 'Name column menu' });
        trigger.focus();
        await user.keyboard('{Enter}');

        const firstItem = screen.getByRole('menuitem', { name: 'Pin left' });
        expect(firstItem).toHaveFocus();
        expect(firstItem.className).toContain('focus-visible:focus-outline');

        await user.keyboard('{ArrowDown}');
        expect(screen.getByRole('menuitem', { name: 'Pin right' }).className).toContain('focus-visible:focus-outline');
      });

      it('the hidden "column menu" text that names the trigger is not separately reachable/announced', () => {
        render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

        const trigger = screen.getByRole('button', { name: 'Name column menu' });
        const hiddenLabelId = trigger.getAttribute('aria-labelledby')?.split(' ')[1];
        const hiddenLabel = document.getElementById(hiddenLabelId as string) as HTMLElement;
        expect(hiddenLabel).toHaveTextContent('column menu');
        expect(hiddenLabel).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('two fully-featured tables on one page produce no DOM id collisions, each correctly self-associated', () => {
      const fullFeatureProps = {
        columns: testColumns,
        data: fullFeatureData,
        defaultExpanded: ['John'],
        enableColumnFilter: true,
        enableColumnPinning: true,
        enableColumnReordering: true,
        enableColumnResizing: true,
        enableGrouping: true,
        enableRowPinning: true,
        enableRowSelection: true,
        enableSorting: true,
        rowKey: 'name' as const,
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

    it('combining a percentage width with minWidth is a type error', () => {
      // @ts-expect-error minWidth can't be combined with a percentage width
      const badColumn: AdvancedTableColumn<TestData> = { key: 'name', title: 'Name', width: '20%', minWidth: 40 };
      expect(badColumn).toBeDefined();
    });
  });
});
