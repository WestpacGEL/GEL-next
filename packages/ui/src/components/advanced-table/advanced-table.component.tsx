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
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getExpandedRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getFilteredRowModel,
  RowPinningState,
} from '@tanstack/react-table';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { AdvancedTableContext } from './advanced-table.context.js';
import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableProps } from './advanced-table.types.js';
import {
  AdvancedTableBody,
  AdvancedTableEmptyState,
  DefaultCell,
  EditableCell,
  AdvancedTableHead,
  AdvancedTablePagination,
} from './components/index.js';
import {
  columnGenerator,
  deleteRow,
  SELECT_COLUMN_ID,
  PIN_COLUMN_ID,
  updateTableData,
  useVirtualizedColumns,
} from './utils/index.js';

// Module-level width resolver — extracted to keep the component's cognitive complexity low.
const resolveFillWidth = (
  fillContainer: boolean,
  scrollableColumns: boolean | undefined,
  fallback: number,
): string | number => (fillContainer && !scrollableColumns ? '100%' : fallback);

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
  showPagination = false,
  paginationProps,
  pageSizeOptions = [5, 10, 20, 50],
  striped = false,
  renderDetailPanel,
  getRowCanExpand,
  emptyState,
  fillContainer = true,
}: AdvancedTableProps<T>) {
  const [localData, setLocalData] = useState<T[]>(data);
  const [rowPinning, setRowPinning] = useState<RowPinningState>({ top: initialPinnedRows ?? [], bottom: [] });
  const [pagination, setPagination] = useState({
    pageIndex: paginationProps?.pageIndex ?? 0,
    pageSize: paginationProps?.pageSize ?? 10,
  });
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

  // Pre-compute conditional table options to keep useReactTable() readable
  // and to satisfy sonarjs/cognitive-complexity.
  const initialColumnPinning = scrollableColumns || enableColumnPinning ? reservedColumns : [];
  // issue with the library and typing of subrows not working well with custom subrow types https://github.com/TanStack/table/discussions/4484
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
  const getSubRowsFn = subRowKey ? (row: any) => row[subRowKey] : undefined;
  const detailPanelOptions = renderDetailPanel ? { getRowCanExpand: getRowCanExpand ?? (() => true) } : {};
  const paginationRowModel = scrollableRows ? undefined : getPaginationRowModel();
  const renderDefaultCell: ColumnDef<T>['cell'] = props => {
    const Cell = props.column.columnDef.meta?.editable ? EditableCell : DefaultCell;
    return <Cell {...props} enableRowSelection={enableRowSelection} />;
  };

  const table = useReactTable({
    data: localData,
    columns: finalColumns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    initialState: {
      columnPinning: { left: initialColumnPinning },
    },
    defaultColumn: { cell: renderDefaultCell },
    state: {
      columnOrder,
      rowPinning,
      pagination,
    },
    onColumnOrderChange: handleColumnOrderChange,
    onRowPinningChange: setRowPinning,
    enableRowPinning,
    getSubRows: getSubRowsFn,
    enableColumnFilters: enableColumnFilter,
    enableGlobalFilter: false,
    enableColumnPinning,
    enableSorting,
    enableGrouping,
    enableColumnResizing: enableResizing,
    enableRowSelection,
    ...detailPanelOptions,
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: paginationRowModel,
    onPaginationChange: setPagination,
    // Prevent TanStack Table from auto-resetting pageIndex to 0 on initial mount /
    // when data updates, which was overriding the consumer-supplied paginationProps.pageIndex.
    autoResetPageIndex: false,
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

  // Empty when raw data is empty OR filtering produced zero rows.
  const isEmpty = localData.length === 0 || table.getFilteredRowModel().rows.length === 0;

  // Width resolution for the outer scroll container, the <table>, and the empty-state wrapper.
  // Extracted to keep nested ternaries out of JSX (sonarjs/no-nested-conditional).
  let containerWidth: CSSProperties['width'];
  if (fillContainer) containerWidth = '100%';
  else if (scrollableColumns) containerWidth = fixedWidth;
  // Accounts for scrollbar size when scrollableRows is enabled.
  const scrollbarAdjustment = (outerTableRef.current?.offsetWidth ?? 0) - (outerTableRef.current?.clientWidth ?? 0);
  const tableWidth = resolveFillWidth(fillContainer, scrollableColumns, table.getTotalSize() + scrollbarAdjustment);
  const emptyStateWidth = resolveFillWidth(fillContainer, scrollableColumns, table.getTotalSize());

  return (
    <AdvancedTableContext.Provider
      value={{
        tableRef: outerTableRef,
        scrollableRows,
        scrollableColumns,
        fillContainer,
        enableRowPinning,
        enableRowSelection,
        columnOrder,
        enableColumnReordering,
        extraCellPadding,
        bordered,
        striped,
        renderDetailPanel,
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
            width: containerWidth,
          }}
        >
          <table className={styles.table()} ref={outerTableRef} style={{ ...columnSizeVars, width: tableWidth }}>
            <AdvancedTableHead
              table={table}
              scrollableColumns={scrollableColumns}
              scrollableRows={scrollableRows}
              columnVirtualizer={useVirtualizedColumns(table, outerTableRef)}
              theadRef={theadRef}
            />
            {!isEmpty && <AdvancedTableBody table={table} tableRef={outerTableRef} theadRef={theadRef} />}
          </table>
          {isEmpty && (
            <div style={{ width: emptyStateWidth }}>
              <AdvancedTableEmptyState
                title={emptyState?.title}
                description={emptyState?.description}
                icon={emptyState?.icon}
              />
            </div>
          )}
        </div>
        {!scrollableRows && showPagination && (
          <AdvancedTablePagination table={table} pageSizeOptions={pageSizeOptions} {...paginationProps} />
        )}
      </DndContext>
    </AdvancedTableContext.Provider>
  );
}
