import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  ColumnDef,
  getExpandedRowModel,
  ExpandedState,
  getPaginationRowModel,
  PaginationState,
  VisibilityState,
  ColumnOrderState,
  ColumnPinningState,
} from '@tanstack/react-table';
import { defaultRangeExtractor, useVirtualizer, Range } from '@tanstack/react-virtual';
import { createContext, useCallback, useMemo, useRef, useState } from 'react';

import { ArrowRightIcon, ExpandMoreIcon } from '../icon/index.js';
import { Pagination } from '../pagination/pagination.component.js';

import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedColumnProps, AdvancedTableProps } from './advanced-table.types.js';
import { AdvancedTableBody } from './components/advanced-table-body/advanced-table-body.component.js';
import { AdvancedTableHead } from './components/advanced-table-head/advanced-table-head.component.js';

export const AdvancedTableContext = createContext<{
  resizable?: boolean;
  columnPinning?: ColumnPinningState;
  tableRef?: React.RefObject<HTMLDivElement>;
  scrollableRows?: boolean;
  scrollableColumns?: boolean;
}>({ resizable: false, columnPinning: undefined });
export function AdvancedTable<T>({
  data,
  columns,
  manualPagination,
  onPaginationChange,
  pageCount,
  pagination = { pageIndex: 0, pageSize: 10 },
  resizable,
  rowCount,
  scrollableColumns,
  scrollableRows,
  sortable = false,
  subRowKey,
}: AdvancedTableProps<T>) {
  const [localData] = useState(() => [...data]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [localPagination, setLocalPagination] = useState<PaginationState>(pagination);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [localColumnOrder, setLocalColumnOrder] = useState<ColumnOrderState>([]);
  const [localColumnPinning, setLocalColumnPinning] = useState<ColumnPinningState>({});

  const outerTableRef = useRef<HTMLTableElement>(null);
  const styles = advancedTableStyles({ scrollableColumns, scrollableRows });

  const columnUpdate = (obj: AdvancedColumnProps<T>): ColumnDef<T> => {
    return {
      ...obj,
      id: obj.key,
      accessorKey: obj.key,
      cell: ({ row, getValue, column }) => (
        <div style={{ paddingLeft: `${row.depth * 2}rem` }} className="flex flex-row gap-1">
          {row.getCanExpand() && column.getIndex() === 0 ? (
            <button onClick={row.getToggleExpandedHandler()}>
              {row.getIsExpanded() ? <ExpandMoreIcon size="small" /> : <ArrowRightIcon size="small" />}
            </button>
          ) : null}
          {getValue<boolean>()}
        </div>
      ),
      enableSorting: obj.enableSorting ?? sortable,
      header: () => <h2 className="font-medium whitespace-nowrap">{obj.title}</h2>,
    };
  };

  const generateLocalColumns = (arr: AdvancedColumnProps<T>[]): ColumnDef<T>[] => {
    return arr.map(obj => {
      if (obj.columns) {
        return {
          ...columnUpdate(obj),
          columns: generateLocalColumns(obj.columns),
        };
      } else {
        return columnUpdate(obj);
      }
    });
  };

  const localColumns: ColumnDef<T>[] = generateLocalColumns(columns);

  const table = useReactTable<T>({
    data: localData,
    columns: localColumns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    manualPagination,
    pageCount,
    rowCount,
    state: {
      expanded,
      pagination: localPagination,
      columnVisibility,
      columnOrder: localColumnOrder,
      columnPinning: localColumnPinning,
    },
    onColumnOrderChange: setLocalColumnOrder,
    onColumnPinningChange: setLocalColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onExpandedChange: setExpanded,
    onPaginationChange: pagination =>
      onPaginationChange ? onPaginationChange(pagination) : setLocalPagination(pagination),
    // issue with the library and typing of subrows not working well with custom subrow types https://github.com/TanStack/table/discussions/4484
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    getSubRows: subRowKey ? (row: any) => row[subRowKey] : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: scrollableRows ? undefined : getPaginationRowModel(),
  });

  // used for performant resizing https://tanstack.com/table/latest/docs/framework/react/examples/column-resizing-performant
  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    const colSizes: Record<string, number> = {};
    headers.forEach(header => {
      colSizes[`--header-${header.id}-size`] = header.getSize();
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
    });
    return colSizes;
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  const currentPage = table.getState().pagination.pageIndex + 1;
  const visibleColumns = table.getVisibleLeafColumns();

  //we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const columnVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableCellElement>({
    count: visibleColumns.length,
    estimateSize: index => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => outerTableRef.current,
    rangeExtractor: useCallback(
      (range: Range) => {
        const next = new Set(defaultRangeExtractor(range));

        const leftPinned = localColumnPinning?.left ? localColumnPinning.left.map((_, index) => index) : [];
        const rightPinned = localColumnPinning?.right
          ? localColumnPinning.right.map((_, index) => visibleColumns.length - (index + 1))
          : [];

        const final = (): Set<number> => {
          return new Set([...leftPinned, ...next, ...rightPinned]);
        };

        return [...final()].sort((a, b) => a - b);
      },
      [localColumnPinning.left, localColumnPinning.right, visibleColumns.length],
    ),
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().width
        : undefined,
    horizontal: true,
    overscan: 5, //how many columns to render on each side off screen each way (adjust this for performance)
  });

  return (
    <AdvancedTableContext.Provider
      value={{
        resizable,
        columnPinning: localColumnPinning,
        tableRef: outerTableRef,
        scrollableRows,
        scrollableColumns,
      }}
    >
      <div className="flex flex-col items-center">
        <div className={styles.container()}>
          <table
            className={styles.table()}
            ref={outerTableRef}
            style={{ ...columnSizeVars, width: table.getTotalSize() }}
          >
            <AdvancedTableHead<T>
              table={table}
              scrollableColumns={scrollableColumns}
              scrollableRows={scrollableRows}
              columnVirtualizer={columnVirtualizer}
            />
            <AdvancedTableBody<T> table={table} tableRef={outerTableRef} />
          </table>
        </div>
        {!scrollableRows && (
          <Pagination
            totalPages={table.getPageCount()}
            current={currentPage}
            onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
            className="pt-2"
          />
        )}
      </div>
    </AdvancedTableContext.Provider>
  );
}
