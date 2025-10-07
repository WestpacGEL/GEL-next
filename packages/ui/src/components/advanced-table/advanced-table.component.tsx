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
import { createContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Pagination } from '../pagination/pagination.component.js';

import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableProps } from './advanced-table.types.js';
import { AdvancedTableBody } from './components/advanced-table-body/advanced-table-body.component.js';
import { AdvancedTableDefaultCell } from './components/advanced-table-default-cell/advanced-table-default-cell.component.js';
import { AdvancedTableEditableCell } from './components/advanced-table-editable-cell/advanced-table-editable-cell.component.js';
import { AdvancedTableHead } from './components/advanced-table-head/advanced-table-head.component.js';
import { columnGenerator } from './utils/column-generator.js';
import { useVirtualizedColumns } from './utils/column-virtualizer.hook.js';
import { deleteRow, updateTableData } from './utils/table-meta-functions.js';

// TODO: DND columns for virtualized
// TODO: Disable DND columns
// TODO: Accessibility

export const AdvancedTableContext = createContext<{
  tableRef?: React.RefObject<HTMLDivElement>;
  enableRowSelection?: boolean;
  scrollableRows?: boolean;
  scrollableColumns?: boolean;
  columnOrder?: string[];
}>({});

export function AdvancedTable<T>({
  data,
  columns,
  enableColumnFilter = false,
  enableColumnPinning = false,
  enableGrouping = false,
  enableResizing = false,
  enableRowSelection = false,
  enableSorting = false,
  scrollableColumns,
  scrollableRows,
  subRowKey,
  fixedHeight = '500px',
  fixedWidth = '700px',
  tableOptions,
  onDataChange,
  onTableReady,
}: AdvancedTableProps<T>) {
  const [localData, setLocalData] = useState<T[]>(data);
  const [paginationWidth, setPaginationWidth] = useState<number | undefined>(undefined);
  const [columnOrder, setColumnOrder] = useState<string[]>(() => columns.map(c => c.key));

  const outerTableRef = useRef<HTMLTableElement>(null);
  const styles = advancedTableStyles({ scrollableColumns, scrollableRows });

  useLayoutEffect(() => {
    const paginationWidth = document.getElementById('pagination')?.getBoundingClientRect().width;
    setPaginationWidth(paginationWidth);
  }, []);

  const finalColumns = useMemo(
    () => columnGenerator<T>({ columns, enableRowSelection }),
    [columns, enableRowSelection],
  );

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  const table = useReactTable<T>({
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
          return <AdvancedTableEditableCell {...props} enableRowSelection={enableRowSelection} />;
        } else {
          return <AdvancedTableDefaultCell {...props} enableRowSelection={enableRowSelection} />;
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
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
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
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <div>
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
              <AdvancedTableHead<T>
                table={table}
                scrollableColumns={scrollableColumns}
                scrollableRows={scrollableRows}
                columnVirtualizer={useVirtualizedColumns(table, outerTableRef)}
              />
              <AdvancedTableBody<T> table={table} tableRef={outerTableRef} />
            </table>
            {!scrollableRows && (
              <Pagination
                totalPages={table.getPageCount()}
                id="pagination"
                current={currentPage}
                onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
                className="pt-2 absolute"
                style={{
                  left: `calc((${table.getTotalSize()}px / 2) - ${paginationWidth ? paginationWidth / 2 : 0}px)`,
                }}
              />
            )}
          </div>
        </div>
      </DndContext>
    </AdvancedTableContext.Provider>
  );
}
