import { Pagination } from '../../../pagination/pagination.component.js';
import { Select } from '../../../select/select.component.js';

import { styles as advancedTablePaginationStyles } from './advanced-table-pagination.styles.js';
import { AdvancedTablePaginationProps } from './advanced-table-pagination.types.js';

export function AdvancedTablePagination<T>({ table, pageSizeOptions }: AdvancedTablePaginationProps<T>) {
  const styles = advancedTablePaginationStyles();

  return (
    <div className={styles.container()}>
      <Pagination
        totalPages={table.getPageCount()}
        id="pagination"
        current={table.getState().pagination.pageIndex + 1}
        onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
        className={styles.pagination()}
        siblingCount={0}
        boundaryCount={1}
      />
      <p className={styles.range()}>
        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
        {Math.min(
          (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
          table.getRowCount(),
        )}{' '}
        of {table.getRowCount()}
      </p>
      <div className={styles.pageSize()}>
        <p>Items per page</p>
        <Select
          onChange={e => table.setPageSize(Number(e.currentTarget.value))}
          value={table.getState().pagination.pageSize}
        >
          {pageSizeOptions.map(size => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </div>
    </div>
  );
}
