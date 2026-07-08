import { useId } from 'react';

import { Pagination } from '../../../pagination/pagination.component.js';
import { Select } from '../../../select/select.component.js';

import { styles as advancedTablePaginationStyles } from './advanced-table-pagination.styles.js';
import { AdvancedTablePaginationProps } from './advanced-table-pagination.types.js';

export function AdvancedTablePagination<T>({ table, pageSizeOptions }: AdvancedTablePaginationProps<T>) {
  const styles = advancedTablePaginationStyles();
  const selectPageSizeId = useId();

  const { pageIndex, pageSize } = table.getState().pagination;
  const rangeFrom = pageIndex * pageSize + 1;
  const rangeTo = Math.min((pageIndex + 1) * pageSize, table.getRowCount());

  return (
    <div className={styles.container()}>
      <Pagination
        aria-label="Pagination"
        totalPages={table.getPageCount()}
        current={pageIndex + 1}
        onChange={pageIndex => table.setPageIndex(pageIndex - 1)}
        className={styles.pagination()}
        siblingCount={0}
        boundaryCount={1}
      />
      {/* Pagination has an announcement on change, range will be announced after the page number */}
      <p role="status">
        {rangeFrom} – {rangeTo} of {table.getRowCount()}
      </p>
      <div className={styles.pageSize()}>
        <label htmlFor={selectPageSizeId}>Items per page</label>
        <Select id={selectPageSizeId} onChange={e => table.setPageSize(Number(e.currentTarget.value))} value={pageSize}>
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
