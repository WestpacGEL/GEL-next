import {
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import { arrayMove } from '@dnd-kit/sortable';
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getExpandedRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getFilteredRowModel,
  RowPinningState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Pagination } from '../pagination/pagination.component.js';

import { AdvancedTableContext } from './advanced-table.context.js';
import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableProps } from './advanced-table.types.js';
import { AdvancedTableBody, DefaultCell, EditableCell, AdvancedTableHead } from './components/index.js';
import {
  columnGenerator,
  deleteRow,
  SELECT_COLUMN_ID,
  PIN_COLUMN_ID,
  updateTableData,
  useVirtualizedColumns,
} from './utils/index.js';

export function AdvancedTable<T>({
  data,
  columns,
  enableColumnReordering = false,
  enableColumnFilter = false,
  enableColumnPinning = false,
  enableGrouping = false,
  enableResizing = false,
  enableRowPinning = false,
  initialPinnedRows,
  enableRowSelection = false,
  enableSorting = false,
  scrollableColumns,
  scrollableRows,
  subRowKey = 'subRows',
  fixedHeight = '500px',
  fixedWidth = '700px',
  tableOptions,
  onDataChange,
  onTableReady,
  extraCellPadding = false,
  bordered = false,
}: AdvancedTableProps<T>) {
  const [localData, setLocalData] = useState<T[]>(data);
  const [rowPinning, setRowPinning] = useState<RowPinningState>({ top: initialPinnedRows ?? [], bottom: [] });
  const reservedColumns = useMemo(
    () =>
      [enableRowSelection && SELECT_COLUMN_ID, enableRowPinning && PIN_COLUMN_ID].filter((id): id is string => !!id),
    [enableRowSelection, enableRowPinning],
  );

  const [columnOrder, setColumnOrder] = useState<string[]>([...reservedColumns, ...columns.map(c => c.key)]);

  const handleColumnOrderChange = useCallback(
    (updater: string[] | ((prev: string[]) => string[])) => {
      setColumnOrder(prev => {
        const newOrder = typeof updater === 'function' ? updater(prev) : updater;
        const reserved = newOrder.filter(id => reservedColumns.includes(id));
        const rest = newOrder.filter(id => !reservedColumns.includes(id));
        return [...reserved, ...rest];
      });
    },
    [reservedColumns],
  );

  const outerTableRef = useRef<HTMLTableElement>(null);
  const theadRef = useRef<HTMLTableSectionElement>(null);
  const styles = advancedTableStyles({ scrollableColumns, scrollableRows, bordered });

  const finalColumns = useMemo(
    () => columnGenerator({ columns, enableRowSelection, enableRowPinning }),
    [columns, enableRowSelection, enableRowPinning],
  );

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const table = useReactTable({
    data: localData,
    columns: finalColumns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    initialState: {
      columnPinning: {
        left: scrollableColumns || enableColumnPinning ? reservedColumns : [],
      },
    },
    defaultColumn: {
      cell: props => {
        if (props.column.columnDef.meta?.editable) {
          return <EditableCell {...props} enableRowSelection={enableRowSelection} />;
        } else {
          return <DefaultCell {...props} enableRowSelection={enableRowSelection} />;
        }
      },
    },
    state: {
      columnOrder,
      rowPinning,
    },
    onColumnOrderChange: handleColumnOrderChange,
    onRowPinningChange: setRowPinning,
    enableRowPinning,
    // issue with the library and typing of subrows not working well with custom subrow types https://github.com/TanStack/table/discussions/4484
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    getSubRows: subRowKey ? (row: any) => row[subRowKey] : undefined,
    enableColumnFilters: enableColumnFilter,
    enableGlobalFilter: false,
    enableColumnPinning,
    enableSorting,
    enableGrouping,
    enableColumnResizing: enableResizing,
    enableRowSelection,
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: scrollableRows ? undefined : getPaginationRowModel(),
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        updateTableData(rowIndex, columnId, value, onDataChange ?? setLocalData, localData);
      },
      deleteRow: (rowIndex: number) => {
        deleteRow(rowIndex, onDataChange ?? setLocalData, localData);
      },
    },
    ...tableOptions,
  });

  useEffect(() => {
    if (onTableReady) onTableReady(table);
  }, [onTableReady, table]);

  // used for performant resizing https://tanstack.com/table/latest/docs/framework/react/examples/column-resizing-performant
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, number> = {};
    headers.forEach(header => {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    });
    return colSizes;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  const currentPage = table.getState().pagination.pageIndex + 1;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      handleColumnOrderChange(columnOrder => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}));

  return (
    <AdvancedTableContext.Provider
      value={{
        tableRef: outerTableRef,
        scrollableRows,
        scrollableColumns,
        enableRowPinning,
        enableRowSelection,
        columnOrder,
        enableColumnReordering,
        extraCellPadding,
        bordered,
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div
          className={styles.container()}
          style={{
            height: scrollableRows ? fixedHeight : undefined,
            width: scrollableColumns ? fixedWidth : undefined,
          }}
        >
          <table
            className={styles.table()}
            ref={outerTableRef}
            style={{
              ...columnSizeVars,
              width:
                table.getTotalSize() +
                // below accounts for scrollbar size when scrollableRows enabled
                ((outerTableRef.current?.offsetWidth ?? 0) - (outerTableRef.current?.clientWidth ?? 0)),
            }}
          >
            <AdvancedTableHead
              table={table}
              scrollableColumns={scrollableColumns}
              scrollableRows={scrollableRows}
              columnVirtualizer={useVirtualizedColumns(table, outerTableRef)}
              theadRef={theadRef}
            />
            <AdvancedTableBody table={table} tableRef={outerTableRef} theadRef={theadRef} />
          </table>
        </div>
        {!scrollableRows && (
          <Pagination
            totalPages={table.getPageCount()}
            id="pagination"
            current={currentPage}
            onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
            className="items-start pt-2"
          />
        )}
      </DndContext>
    </AdvancedTableContext.Provider>
  );
}
