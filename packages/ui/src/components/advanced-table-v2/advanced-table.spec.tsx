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
import { render, screen, within } from '@testing-library/react';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedTableColumn } from './advanced-table.types.js';

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
    it.todo('does not render sort controls when sorting is disabled');
    it.todo('clicking a header cycles ascending, descending, then unsorted, reordering visible rows');
    it.todo('exposes the current sort via aria-sort on the sorted column header');
    it.todo('announces sort changes via a live region');
    it.todo('sorting is operable with the keyboard alone');
    it.todo(
      'controlled sorting: renders order from the sorting prop and emits onSortingChange without reordering on its own',
    );
    it.todo('uncontrolled sorting: defaultSorting sets the initial order');
  });

  describe('column filtering', () => {
    it.todo('filters visible rows as the user types in a column menu filter input');
    it.todo('announces the filter result count via a live region');
    it.todo('shows the empty state when a filter matches no rows');
    it.todo('controlled filters: emits onColumnFiltersChange and renders from the columnFilters prop');
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
    it.todo('renders a named checkbox per row and a select-all checkbox in the header');
    it.todo('selecting rows updates checkbox states and emits onSelectionChange with stable row IDs');
    it.todo('select-all shows an indeterminate state when some rows are selected');
    it.todo('selection keyed by rowKey survives sorting, filtering, and page changes');
    it.todo('controlled selection: renders from the selectedRows prop without internal toggling');
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
    it.todo('renders pagination controls and only the current page of rows');
    it.todo('changing page updates the visible rows');
    it.todo('changing page size updates the visible row count');
    it.todo(
      'controlled pagination: renders from the pagination prop ({ pageIndex, pageSize }) and emits onPaginationChange',
    );
    it.todo('uncontrolled pagination: defaultPagination sets the initial page and size');
  });

  describe('empty state', () => {
    it('renders the default empty state when data is empty', () => {
      render(<AdvancedTable columns={testColumns} data={[]} />);
      // check header still render but cell does not
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.queryByText('John')).not.toBeInTheDocument();
      // default empty-state message inside a status region, in a valid table cell
      const status = screen.getByRole('status');
      expect(status).toHaveTextContent('No data to display');
      expect(status.closest('td')).toBeInTheDocument();
    });

    it('spans the empty-state cell across all columns', () => {
      render(<AdvancedTable columns={testColumns} data={[]} />);
      expect(screen.getByRole('status').closest('td')).toHaveAttribute('colspan', String(testColumns.length));
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
    it.todo('column menu is fully keyboard operable');
  });

  describe('types and public API', () => {
    it('rejects a column key that is not part of the row type', () => {
      // @ts-expect-error 'nope' is not a key of TestData
      const badColumn: AdvancedTableColumn<TestData> = { key: 'nope', title: 'Nope' };
      expect(badColumn).toBeDefined();
    });

    it.todo('enabling selection, pinning, expansion, or editing without rowKey is a type error');
    it.todo('AdvancedTable and its types are exported from the package root');
  });
});
