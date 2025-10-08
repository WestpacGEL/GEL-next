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
} from '@tanstack/react-table';
import { createContext, useEffect, useMemo, useRef, useState } from 'react';

import { Pagination } from '../pagination/pagination.component.js';

import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableProps } from './advanced-table.types.js';
import { AdvancedTableBody, DefaultCell, EditableCell, AdvancedTableHead } from './components/index.js';
import { columnGenerator, deleteRow, updateTableData, useVirtualizedColumns } from './utils/index.js';

// TODO: Accessibility
// TODO: Fix pagination location when scrollable columns
export const AdvancedTableContext = createContext<{
  tableRef?: React.RefObject<HTMLDivElement>;
  enableColumnReordering?: boolean;
  enableRowSelection?: boolean;
  scrollableRows?: boolean;
  scrollableColumns?: boolean;
  columnOrder?: string[];
}>({});

export function AdvancedTable<T>({
  data,
  columns,
  enableColumnReordering = false,
  enableColumnFilter = false,
  enableColumnPinning = false,
  enableGrouping = false,
  enableResizing = false,
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
}: AdvancedTableProps<T>) {
  const [localData, setLocalData] = useState<T[]>(data);
  const [columnOrder, setColumnOrder] = useState<string[]>(['select-column', ...columns.map(c => c.key)]);

  const outerTableRef = useRef<HTMLTableElement>(null);
  const styles = advancedTableStyles({ scrollableColumns, scrollableRows });

  // TODO: Potentially remove this based on pagination location one design finalised
  // useLayoutEffect(() => {
  //   const paginationWidth = document.getElementById('pagination')?.getBoundingClientRect().width;
  //   setPaginationWidth(paginationWidth);
  // }, []);

  const finalColumns = useMemo(() => columnGenerator({ columns, enableRowSelection }), [columns, enableRowSelection]);

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
        left: enableRowSelection && scrollableColumns ? ['select-column'] : [],
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
    },
    onColumnOrderChange: setColumnOrder,
    // issue with the library and typing of subrows not working well with custom subrow types https://github.com/TanStack/table/discussions/4484
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    getSubRows: subRowKey ? (row: any) => row[subRowKey] : undefined,
    enableColumnFilters: enableColumnFilter,
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
      setColumnOrder(columnOrder => {
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
        enableRowSelection,
        columnOrder,
        enableColumnReordering,
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
            style={{ ...columnSizeVars, width: table.getTotalSize() }}
          >
            <AdvancedTableHead
              table={table}
              scrollableColumns={scrollableColumns}
              scrollableRows={scrollableRows}
              columnVirtualizer={useVirtualizedColumns(table, outerTableRef)}
            />
            <AdvancedTableBody table={table} tableRef={outerTableRef} />
          </table>
          {!scrollableRows && (
            <Pagination
              totalPages={table.getPageCount()}
              id="pagination"
              current={currentPage}
              onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
              className="pt-2 absolute"
            />
          )}
        </div>
      </DndContext>
    </AdvancedTableContext.Provider>
  );
}
