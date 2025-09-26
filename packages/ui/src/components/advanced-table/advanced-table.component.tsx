import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getExpandedRowModel,
  getPaginationRowModel,
  ColumnPinningState,
  getGroupedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { createContext, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { Pagination } from '../pagination/pagination.component.js';

import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableProps } from './advanced-table.types.js';
import { AdvancedTableBody } from './components/advanced-table-body/advanced-table-body.component.js';
import { AdvancedTableDefaultCell } from './components/advanced-table-default-cell/advanced-table-default-cell.component.js';
import { AdvancedTableHead } from './components/advanced-table-head/advanced-table-head.component.js';
import { columnGenerator } from './utils/column-generator.js';
import { useVirtualizedColumns } from './utils/column-virtualizer.hook.js';

export const AdvancedTableContext = createContext<{
  resizable?: boolean;
  columnPinning?: ColumnPinningState;
  tableRef?: React.RefObject<HTMLDivElement>;
  selectable?: boolean;
  scrollableRows?: boolean;
  scrollableColumns?: boolean;
}>({ resizable: false, columnPinning: undefined });

export function AdvancedTable<T>({
  data,
  columns,
  groupable = false,
  resizable,
  selectable,
  scrollableColumns,
  scrollableRows,
  sortable = false,
  subRowKey,
  fixedHeight = '500px',
  fixedWidth = '700px',
  tableOptions,
}: AdvancedTableProps<T>) {
  const [localData] = useState(() => [...data]);
  const [paginationWidth, setPaginationWidth] = useState<number | undefined>(undefined);

  const outerTableRef = useRef<HTMLTableElement>(null);
  const styles = advancedTableStyles({ scrollableColumns, scrollableRows });

  useLayoutEffect(() => {
    const paginationWidth = document.getElementById('pagination')?.getBoundingClientRect().width;
    setPaginationWidth(paginationWidth);
  }, []);

  const finalColumns = columnGenerator<T>({
    sortable,
    groupable,
    columns,
  });

  const table = useReactTable<T>({
    data: localData,
    columns: finalColumns,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    initialState: {
      columnPinning: {
        left: selectable && scrollableColumns ? ['select-column'] : [],
      },
    },
    defaultColumn: {
      cell: props => <AdvancedTableDefaultCell {...props} selectable={selectable} />,
    },
    // issue with the library and typing of subrows not working well with custom subrow types https://github.com/TanStack/table/discussions/4484
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    getSubRows: subRowKey ? (row: any) => row[subRowKey] : undefined,
    getGroupedRowModel: getGroupedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: scrollableRows ? undefined : getPaginationRowModel(),
    ...tableOptions,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

  const currentPage = table.getState().pagination.pageIndex + 1;

  return (
    <AdvancedTableContext.Provider
      value={{
        resizable,
        tableRef: outerTableRef,
        scrollableRows,
        scrollableColumns,
        selectable,
      }}
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
              style={{ left: `calc((${table.getTotalSize()}px / 2) - ${paginationWidth ? paginationWidth / 2 : 0}px)` }}
            />
          )}
        </div>
      </div>
    </AdvancedTableContext.Provider>
  );
}
