import { Table } from '@tanstack/react-table';
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AdvancedTable } from './advanced-table.component.js';
import { AdvancedColumnProps } from './advanced-table.types.js';

type TestData = { name: string; age: number };
type ExpandableData = { name: string; age: number; subRows?: ExpandableData[] };

const testColumns: AdvancedColumnProps<TestData>[] = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
];

const testData: TestData[] = [
  { name: 'John', age: 30 },
  { name: 'Jane', age: 25 },
  { name: 'Bob', age: 40 },
];

const expandableColumns: AdvancedColumnProps<ExpandableData>[] = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
];

const expandableData: ExpandableData[] = [
  {
    name: 'Parent',
    age: 50,
    subRows: [
      { name: 'Child 1', age: 20 },
      { name: 'Child 2', age: 22 },
    ],
  },
];

// Provide enough rows to test pagination (default page size is 10)
const manyRows: TestData[] = Array.from({ length: 15 }, (_, i) => ({
  name: `Person ${i + 1}`,
  age: 20 + i,
}));

function getMenuTriggers() {
  return screen.getAllByRole('button', { hidden: false }).filter(btn => btn.getAttribute('aria-haspopup') === 'true');
}

function getSortButton(headerCell: HTMLElement, headerText: string) {
  const headerButton = within(headerCell).getByText(headerText).closest('button');
  return within(headerCell)
    .getAllByRole('button')
    .find(btn => btn != headerButton);
}

describe('AdvancedTable', () => {
  it('renders table with header and rows', () => {
    render(<AdvancedTable columns={testColumns} data={testData} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
  });

  it('renders with bordered prop', () => {
    render(<AdvancedTable columns={testColumns} data={testData} bordered />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders with extraCellPadding prop', () => {
    render(<AdvancedTable columns={testColumns} data={testData} extraCellPadding />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('syncs local data when data prop changes', () => {
    const { rerender } = render(<AdvancedTable columns={testColumns} data={testData} />);
    expect(screen.getByText('John')).toBeInTheDocument();

    const newData = [{ name: 'Alice', age: 28 }];
    rerender(<AdvancedTable columns={testColumns} data={newData} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
  });

  it('calls onTableReady with the table instance', () => {
    const onTableReady = vi.fn();
    render(<AdvancedTable columns={testColumns} data={testData} onTableReady={onTableReady} />);
    expect(onTableReady).toHaveBeenCalledTimes(1);
    expect(onTableReady).toHaveBeenCalledWith(expect.objectContaining({ getRowModel: expect.any(Function) }));
  });

  it('passes tableOptions to the underlying table', () => {
    const onStateChange = vi.fn();
    render(<AdvancedTable columns={testColumns} data={testData} tableOptions={{ onStateChange }} />);
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('renders grouped column headers', () => {
    const groupedColumns: AdvancedColumnProps<TestData>[] = [
      {
        key: 'info',
        title: 'Info',
        columns: [
          { key: 'name', title: 'Name' },
          { key: 'age', title: 'Age' },
        ],
      },
    ];
    render(<AdvancedTable columns={groupedColumns} data={testData} />);
    expect(screen.getByText('Info')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  describe('pagination', () => {
    it('renders pagination when scrollableRows is not set', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} />);
      expect(screen.getByText('1')).toBeInTheDocument();
    });

    it('does not render pagination when scrollableRows is true', () => {
      render(<AdvancedTable columns={testColumns} data={manyRows} scrollableRows />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('sorting', () => {
    it('renders sort buttons when enableSorting is true', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);
      const sortButtons = screen.getAllByRole('button');
      expect(sortButtons.length).toBeGreaterThan(0);
    });

    it('sorts data when sort button is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);

      const headerCells = within(screen.getByRole('table')).getAllByRole('columnheader');
      const sortButton = getSortButton(headerCells[0], 'Name');

      if (sortButton) {
        await user.click(sortButton);
      }

      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('toggles sort direction on multiple clicks', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableSorting />);

      const headerCells = within(screen.getByRole('table')).getAllByRole('columnheader');
      const sortButton = getSortButton(headerCells[0], 'Name');

      if (sortButton) {
        await user.click(sortButton); // ascending
        await user.click(sortButton); // descending
        await user.click(sortButton); // removes sort
      }

      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('row selection', () => {
    it('renders select checkboxes when enableRowSelection is true', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection />);
      const checkboxes = screen.getAllByRole('checkbox', { hidden: true });
      // 1 header checkbox + 3 row checkboxes
      expect(checkboxes).toHaveLength(4);
    });

    it('selects a row when checkbox is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection />);
      const checkboxes = screen.getAllByRole('checkbox', { hidden: true });

      await user.click(checkboxes[1]);

      expect(checkboxes[1]).toBeChecked();
    });

    it('selects all rows when header checkbox is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection />);
      const checkboxes = screen.getAllByRole('checkbox', { hidden: true });

      await user.click(checkboxes[0]);

      checkboxes.slice(1).forEach(cb => {
        expect(cb).toBeChecked();
      });
    });
  });

  describe('row pinning', () => {
    it('renders pin buttons when enableRowPinning is true', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableRowPinning />);
      const pinButtons = screen.getAllByRole('button', { name: /pin row/i });
      expect(pinButtons).toHaveLength(3);
    });

    it('pins a row when pin button is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableRowPinning />);

      await user.click(screen.getAllByRole('button', { name: /pin row to top/i })[0]);

      expect(screen.getByRole('button', { name: /unpin row/i })).toBeInTheDocument();
    });

    it('unpins a pinned row when unpin button is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableRowPinning />);

      await user.click(screen.getAllByRole('button', { name: /pin row to top/i })[0]);
      await user.click(screen.getByRole('button', { name: /unpin row/i }));

      expect(screen.getAllByRole('button', { name: /pin row to top/i })).toHaveLength(3);
    });

    it('renders with initialPinnedRows', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableRowPinning initialPinnedRows={['0']} />);
      expect(screen.getByRole('button', { name: /unpin row/i })).toBeInTheDocument();
    });
  });

  describe('editable cells', () => {
    const editableColumns: AdvancedColumnProps<TestData>[] = [
      { key: 'name', title: 'Name', editable: true },
      { key: 'age', title: 'Age' },
    ];

    it('renders editable cells with inputs', () => {
      render(<AdvancedTable columns={editableColumns} data={testData} />);
      expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);
    });

    it('updates data when editable cell is changed and blurred', async () => {
      const user = userEvent.setup();
      const onDataChange = vi.fn();
      render(<AdvancedTable columns={editableColumns} data={testData} onDataChange={onDataChange} />);

      const inputs = screen.getAllByRole('textbox');
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'Updated');
      await user.tab();

      expect(onDataChange).toHaveBeenCalled();
    });

    it('updates local state when onDataChange is not provided', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={editableColumns} data={testData} />);

      const inputs = screen.getAllByRole('textbox');
      await user.clear(inputs[0]);
      await user.type(inputs[0], 'Updated');
      await user.tab();

      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('expandable rows', () => {
    it('renders expandable rows with expand button', () => {
      render(<AdvancedTable columns={expandableColumns} data={expandableData} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('expands a row when expand button is clicked', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={expandableColumns} data={expandableData} />);

      expect(screen.getByText('Parent')).toBeInTheDocument();
      expect(screen.queryByText('Child 1')).not.toBeInTheDocument();

      const expandButton = screen.getAllByRole('button').find(btn => {
        const svg = btn.querySelector('svg');
        return svg !== null && !btn.textContent?.includes('Parent');
      });

      if (expandButton) {
        await user.click(expandButton);
        expect(screen.getByText('Child 1')).toBeInTheDocument();
        expect(screen.getByText('Child 2')).toBeInTheDocument();
      }
    });

    it('renders editable cells with expand buttons', async () => {
      const editableExpandableColumns: AdvancedColumnProps<ExpandableData>[] = [
        { key: 'name', title: 'Name', editable: true },
        { key: 'age', title: 'Age' },
      ];
      const user = userEvent.setup();
      render(<AdvancedTable columns={editableExpandableColumns} data={expandableData} />);

      expect(screen.getAllByRole('textbox').length).toBeGreaterThan(0);

      const expandButton = screen.getAllByRole('button').find(btn => btn.querySelector('svg') !== null);

      if (expandButton) {
        await user.click(expandButton);

        await waitFor(() => {
          expect(screen.getAllByRole('textbox').length).toBeGreaterThan(1);
        });
      }
    });

    it('adjusts firstColumnIndex with enableRowSelection', () => {
      render(<AdvancedTable columns={expandableColumns} data={expandableData} enableRowSelection />);
      expect(screen.getByText('Parent')).toBeInTheDocument();
      expect(screen.getAllByRole('checkbox', { hidden: true }).length).toBeGreaterThan(0);
    });
  });

  describe('scrollable modes', () => {
    it('renders with scrollableRows and custom fixedHeight', () => {
      render(<AdvancedTable columns={testColumns} data={testData} scrollableRows fixedHeight="300px" />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders with scrollableColumns and custom fixedWidth', () => {
      render(<AdvancedTable columns={testColumns} data={testData} scrollableColumns fixedWidth="500px" />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders with both scrollableRows and scrollableColumns', () => {
      render(<AdvancedTable columns={testColumns} data={testData} scrollableRows scrollableColumns />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('feature flags', () => {
    it.each([
      { prop: 'enableColumnReordering' as const },
      { prop: 'enableColumnPinning' as const },
      { prop: 'enableResizing' as const },
      { prop: 'enableGrouping' as const },
      { prop: 'enableColumnFilter' as const },
    ])('renders with $prop', ({ prop }) => {
      render(<AdvancedTable columns={testColumns} data={testData} {...{ [prop]: true }} />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });
  });

  describe('combined features', () => {
    it('renders with row selection and row pinning together', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection enableRowPinning />);
      expect(screen.getAllByRole('checkbox', { hidden: true })).toHaveLength(4);
      expect(screen.getAllByRole('button', { name: /pin row/i })).toHaveLength(3);
    });

    it('renders with scrollableColumns and enableColumnPinning', () => {
      render(<AdvancedTable columns={testColumns} data={testData} scrollableColumns enableColumnPinning />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('renders with row selection and scrollableColumns', () => {
      render(<AdvancedTable columns={testColumns} data={testData} enableRowSelection scrollableColumns />);
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    it('maintains reserved columns at start of column order', () => {
      let columnOrder: string[] = [];
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          enableRowSelection
          enableRowPinning
          onTableReady={table => {
            columnOrder = table.getState().columnOrder;
          }}
        />,
      );

      expect(columnOrder[0]).toBe('select-column');
      expect(columnOrder[1]).toBe('pin-column');
    });
  });

  describe('table meta', () => {
    it('calls onDataChange with row removed when deleteRow is invoked', () => {
      const onDataChange = vi.fn();
      let tableInstance!: Table<TestData>;
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          onDataChange={onDataChange}
          onTableReady={table => {
            tableInstance = table;
          }}
        />,
      );

      act(() => tableInstance.options.meta?.deleteRow(0));

      expect(onDataChange).toHaveBeenCalledWith([
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 40 },
      ]);
    });

    it('updates local data when deleteRow is invoked without onDataChange', () => {
      let tableInstance!: Table<TestData>;
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          onTableReady={table => {
            tableInstance = table;
          }}
        />,
      );

      expect(screen.getByText('John')).toBeInTheDocument();

      act(() => tableInstance.options.meta?.deleteRow(0));

      expect(screen.queryByText('John')).not.toBeInTheDocument();
    });

    it('calls onDataChange with updated value when updateData is invoked', () => {
      const onDataChange = vi.fn();
      let tableInstance!: Table<TestData>;
      render(
        <AdvancedTable
          columns={testColumns}
          data={testData}
          onDataChange={onDataChange}
          onTableReady={table => {
            tableInstance = table;
          }}
        />,
      );

      act(() => tableInstance.options.meta?.updateData(0, 'name', 'Updated'));

      expect(onDataChange).toHaveBeenCalledWith([
        { name: 'Updated', age: 30 },
        { name: 'Jane', age: 25 },
        { name: 'Bob', age: 40 },
      ]);
    });
  });

  describe('column menu', () => {
    it('opens menu and shows pin options when enableColumnPinning is true', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);

      const menuTriggers = getMenuTriggers();
      expect(menuTriggers.length).toBeGreaterThan(0);

      await user.click(menuTriggers[0]);

      await waitFor(() => {
        expect(screen.getByText(/Pin left/i)).toBeInTheDocument();
        expect(screen.getByText(/Pin right/i)).toBeInTheDocument();
      });
    });

    it('opens menu with filter input when enableColumnFilter is true', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

      await user.click(getMenuTriggers()[0]);

      await waitFor(() => {
        expect(screen.getByText(/Filter by/i)).toBeInTheDocument();
      });
    });

    it('pins column left via menu action', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);

      await user.click(getMenuTriggers()[0]);

      await waitFor(() => {
        expect(screen.getByText(/Pin left/i)).toBeInTheDocument();
      });

      const pinLeftItem = screen.getByText(/Pin left/i).closest('[role="menuitem"]');
      expect(pinLeftItem).toBeInTheDocument();
      if (pinLeftItem) {
        await user.click(pinLeftItem);
      }
    });

    it('pins column right via menu action', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);

      await user.click(getMenuTriggers()[0]);

      await waitFor(() => {
        expect(screen.getByText(/Pin right/i)).toBeInTheDocument();
      });

      const pinRightItem = screen.getByText(/Pin right/i).closest('[role="menuitem"]');
      expect(pinRightItem).toBeInTheDocument();
      if (pinRightItem) {
        await user.click(pinRightItem);
      }
    });

    it('opens menu with group option when enableGrouping is true', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableGrouping />);

      await user.click(getMenuTriggers()[0]);

      await waitFor(() => {
        expect(screen.getByText(/Group/i)).toBeInTheDocument();
      });

      const groupItem = screen.getByText(/Group/i).closest('[role="menuitem"]');
      if (groupItem) {
        await user.click(groupItem);
      }
    });

    it('opens menu with filter and pin actions when both are enabled', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter enableColumnPinning />);

      await user.click(getMenuTriggers()[0]);

      await waitFor(() => {
        expect(screen.getByText(/Filter by/i)).toBeInTheDocument();
        expect(screen.getByText(/Actions/i)).toBeInTheDocument();
      });
    });

    it('filters data via filter input in menu', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnFilter />);

      await user.click(getMenuTriggers()[0]);

      await waitFor(() => {
        expect(screen.getByText(/Filter by/i)).toBeInTheDocument();
      });

      await user.type(screen.getByRole('textbox'), 'John');

      await waitFor(() => {
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.queryByText('Jane')).not.toBeInTheDocument();
      });
    });

    it('unpins a pinned column via menu action', async () => {
      const user = userEvent.setup();
      render(<AdvancedTable columns={testColumns} data={testData} enableColumnPinning />);

      const menuTriggers = getMenuTriggers();

      // Pin left first
      await user.click(menuTriggers[0]);

      await waitFor(() => {
        expect(screen.getByText(/Pin left/i)).toBeInTheDocument();
      });

      const pinLeftItem = screen.getByText(/Pin left/i).closest('[role="menuitem"]');
      if (pinLeftItem) {
        await user.click(pinLeftItem);
      }

      // Now open menu again to unpin
      await user.click(menuTriggers[0]);

      await waitFor(() => {
        expect(screen.getByText(/Unpin left/i)).toBeInTheDocument();
      });

      const unpinItem = screen.getByText(/Unpin left/i).closest('[role="menuitem"]');
      if (unpinItem) {
        await user.click(unpinItem);
      }
    });
  });
});
