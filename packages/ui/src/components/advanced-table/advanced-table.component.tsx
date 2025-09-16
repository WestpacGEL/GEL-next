import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortDirection,
  useReactTable,
  ColumnDef,
  getExpandedRowModel,
  ExpandedState,
  getPaginationRowModel,
  PaginationState,
  VisibilityState,
  ColumnOrderState,
  Column,
  ColumnPinningState,
} from '@tanstack/react-table';
import { defaultRangeExtractor, useVirtualizer, type Range } from '@tanstack/react-virtual';
import { CSSProperties, useCallback, useMemo, useRef, useState } from 'react';

import { ArrowRightIcon, ExpandLessIcon, ExpandMoreIcon } from '../icon/index.js';
import { Pagination } from '../pagination/pagination.component.js';

import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedColumnProps, AdvancedTableProps } from './advanced-table.types.js';

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
  const getCommonPinningStyles = (column: Column<T>): CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn = isPinned === 'left' && column.getIsLastColumn('left');
    const isFirstRightPinnedColumn = isPinned === 'right' && column.getIsFirstColumn('right');
    return {
      boxShadow: isLastLeftPinnedColumn
        ? '-4px 0 4px -4px gray inset'
        : isFirstRightPinnedColumn
          ? '4px 0 4px -4px gray inset'
          : undefined,
      left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
      right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
      position: isPinned ? 'sticky' : 'relative',
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
    };
  };
  const [localData] = useState(() => [...data]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [localPagination, setLocalPagination] = useState<PaginationState>(pagination);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [localColumnOrder, setLocalColumnOrder] = useState<ColumnOrderState>([]);
  const [localColumnPinning, setLocalColumnPinning] = useState<ColumnPinningState>({});

  const outerTableRef = useRef<HTMLTableElement>(null);
  const tableContainerRef = useRef<HTMLTableSectionElement>(null);
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

  const sortingIcon = (sorted: SortDirection | false, onClick: () => void) => {
    return (
      <button onClick={onClick} className="cursor-pointer flex flex-col">
        <ExpandLessIcon
          size="xsmall"
          className="mb-[-2px]"
          style={{ visibility: sorted === 'desc' ? 'hidden' : undefined }}
        />
        <ExpandMoreIcon
          size="xsmall"
          className="mt-[-2px]"
          style={{ visibility: sorted === 'asc' ? 'hidden' : undefined }}
        />
      </button>
    );
  };

  const { rows } = table.getRowModel();
  // Important: Keep the row virtualizer in the lowest component possible to avoid unnecessary re-renders.
  const rowVirtualizer = useVirtualizer<HTMLTableElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 45, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => outerTableRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });
  const visibleColumns = table.getVisibleLeafColumns();
  //we are using a slightly different virtualization strategy for columns (compared to virtual rows) in order to support dynamic row heights
  const columnVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableCellElement>({
    count: visibleColumns.length,
    estimateSize: index => visibleColumns[index].getSize(), //estimate width of each column for accurate scrollbar dragging
    getScrollElement: () => outerTableRef.current,
    rangeExtractor: useCallback(
      (range: Range) => {
        const next = new Set(defaultRangeExtractor(range));

        const leftPinned = localColumnPinning.left ? localColumnPinning.left.map((_, index) => index) : [];
        const rightPinned = localColumnPinning.right
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

  const virtualColumns = columnVirtualizer.getVirtualItems();

  //different virtualization strategy for columns - instead of absolute and translateY, we add empty columns to the left and right
  let virtualPaddingLeft: number | undefined;
  let virtualPaddingRight: number | undefined;

  if (columnVirtualizer && virtualColumns?.length) {
    const leftPadding = () => {
      const pinnedColLength = localColumnPinning.left?.length;
      const totalLeftPinned =
        localColumnPinning.left?.reduce((acc, col) => acc + visibleColumns[Number(col)].getSize(), 0) ?? 0;
      const totalRightPinned =
        localColumnPinning.right?.reduce((acc, col) => acc + visibleColumns[Number(col)].getSize(), 0) ?? 0;
      if (pinnedColLength && pinnedColLength > 0 && localColumnPinning.left) {
        const pinnedWidth = virtualColumns[pinnedColLength].start - totalLeftPinned + totalRightPinned;
        const firstPagePadding = virtualColumns[pinnedColLength].start - virtualColumns[pinnedColLength - 1].end;

        return firstPagePadding > 0 ? pinnedWidth : firstPagePadding;
      }

      return virtualColumns[0].start;
    };

    virtualPaddingLeft = leftPadding();
    virtualPaddingRight = columnVirtualizer.getTotalSize() - (virtualColumns[virtualColumns.length - 1]?.end ?? 0);
  }

  return (
    <div className="flex flex-col items-center">
      <div className={styles.container()}>
        <table
          className={styles.table()}
          ref={outerTableRef}
          style={{ ...columnSizeVars, width: table.getTotalSize() }}
        >
          <thead className={styles.tableHeader()}>
            {table.getHeaderGroups().map(headerGroup =>
              scrollableColumns ? (
                <tr key={headerGroup.id} className={styles.headerRow()} style={{ width: table.getTotalSize() }}>
                  {virtualPaddingLeft ? (
                    //fake empty column to the left for virtualization scroll padding
                    <th style={{ width: virtualPaddingLeft }} />
                  ) : null}
                  {virtualColumns.map(virtualColumn => {
                    const header = headerGroup.headers[virtualColumn.index];
                    return (
                      <th
                        style={{
                          width: `calc(var(--header-${header.id}-size) * 1px)`,
                          ...getCommonPinningStyles(header.column),
                        }}
                        key={header.id}
                        data-index={virtualColumn.index}
                        colSpan={header.colSpan}
                        className={styles.th()}
                      >
                        <div className={styles.headerContent()}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                          {header.column.getCanSort() &&
                            !header.isPlaceholder &&
                            sortingIcon(header.column.getIsSorted(), () => {
                              header.column.toggleSorting(undefined, true);
                            })}
                          {resizable && !header.isPlaceholder && (
                            <div
                              {...{
                                onDoubleClick: () => header.column.resetSize(),
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: styles.resizeBar(),
                              }}
                            />
                          )}
                        </div>
                        {!header.isPlaceholder && header.column.getCanPin() && (
                          <div className="flex gap-1 justify-center">
                            {header.column.getIsPinned() !== 'left' ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin('left');
                                }}
                              >
                                {'<='}
                              </button>
                            ) : null}
                            {header.column.getIsPinned() ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin(false);
                                }}
                              >
                                X
                              </button>
                            ) : null}
                            {header.column.getIsPinned() !== 'right' ? (
                              <button
                                className="border rounded px-2"
                                onClick={() => {
                                  header.column.pin('right');
                                }}
                              >
                                {'=>'}
                              </button>
                            ) : null}
                          </div>
                        )}
                      </th>
                    );
                  })}
                  {virtualPaddingRight ? (
                    //fake empty column to the right for virtualization scroll padding
                    <th style={{ width: virtualPaddingRight }} />
                  ) : null}
                </tr>
              ) : (
                <tr key={headerGroup.id} className={styles.headerRow()}>
                  {headerGroup.headers.map(header => (
                    <th
                      style={{ width: `calc(var(--header-${header.id}-size) * 1px)` }}
                      key={header.id}
                      colSpan={header.colSpan}
                      className={styles.th()}
                    >
                      <div className={styles.headerContent()}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() &&
                          !header.isPlaceholder &&
                          sortingIcon(header.column.getIsSorted(), () => {
                            header.column.toggleSorting(undefined, true);
                          })}
                        {resizable && !header.isPlaceholder && (
                          <div
                            {...{
                              onDoubleClick: () => header.column.resetSize(),
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className: styles.resizeBar(),
                            }}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ),
            )}
          </thead>
          {scrollableRows ? (
            <tbody
              ref={tableContainerRef}
              className={styles.tableBody()}
              style={{ width: table.getTotalSize(), height: rowVirtualizer.getTotalSize() }}
            >
              {rowVirtualizer.getVirtualItems().map(virtualRow => {
                const row = rows[virtualRow.index];

                return (
                  <tr
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={node => {
                      rowVirtualizer.measureElement(node); // measure dynamic row height
                    }}
                    className={styles.bodyRow()}
                    style={{
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    {row.getVisibleCells().map(cell => (
                      <td
                        key={cell.id}
                        className={styles.td()}
                        style={{ width: cell.column.getSize(), ...getCommonPinningStyles(cell.column) }}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          ) : (
            <tbody className={styles.tableBody()}>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className={styles.bodyRow()}>
                  {row.getVisibleCells().map(cell => (
                    <td
                      key={cell.id}
                      className={styles.td()}
                      style={{ width: cell.column.getSize(), ...getCommonPinningStyles(cell.column) }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          )}
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
  );
}
