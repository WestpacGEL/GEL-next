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
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef, useState } from 'react';

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
  sortable = false,
  subRowKey,
  virtualized,
}: AdvancedTableProps<T>) {
  const [localData] = useState(() => [...data]);
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [localPagination, setLocalPagination] = useState<PaginationState>(pagination);
  const tableContainerRef = useRef<HTMLTableSectionElement>(null);
  const styles = advancedTableStyles({ virtualized });

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
      header: () => <h2 className="font-medium">{obj.title}</h2>,
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
    },
    onExpandedChange: setExpanded,
    onPaginationChange: pagination =>
      onPaginationChange ? onPaginationChange(pagination) : setLocalPagination(pagination),
    // issue with the library and typing of subrows not working well with custom subrow types https://github.com/TanStack/table/discussions/4484
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    getSubRows: subRowKey ? (row: any) => row[subRowKey] : undefined,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: virtualized ? undefined : getPaginationRowModel(),
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
  const rowVirtualizer = useVirtualizer<HTMLTableSectionElement, HTMLTableRowElement>({
    count: rows.length,
    estimateSize: () => 45, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => tableContainerRef.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  return (
    <div className={styles.container()}>
      <table className={styles.table()} style={{ ...columnSizeVars, width: table.getTotalSize() }}>
        <thead className={styles.tableHeader()}>
          {table.getHeaderGroups().map(headerGroup => (
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
          ))}
        </thead>
        {virtualized ? (
          <tbody ref={tableContainerRef} className={styles.tableBody()} style={{ height: `300px` }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow, index, arr) => {
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
                    <td key={cell.id} className={styles.td()} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={styles.td()}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
      </table>
      {!virtualized && (
        <Pagination
          totalPages={table.getPageCount()}
          current={currentPage}
          onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
        />
      )}
    </div>
  );
}
