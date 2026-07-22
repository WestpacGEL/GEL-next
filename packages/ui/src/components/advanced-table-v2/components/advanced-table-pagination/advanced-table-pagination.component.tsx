import { useId } from 'react';

import { Pagination } from '../../../pagination/pagination.component.js';
import { Select } from '../../../select/select.component.js';
import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as advancedTablePaginationStyles } from './advanced-table-pagination.styles.js';

/** Pagination control wrapper for the table based on the GEL `Pagination` component. */
export function AdvancedTablePagination() {
  const { table, pageSizeOptions, loading } = useAdvancedTableContext();
  const styles = advancedTablePaginationStyles();
  const selectPageSizeId = useId();

  const { pageIndex, pageSize } = table.getState().pagination;
  const rowCount = table.getRowCount();
  // Clamped: `autoResetPageIndex: false` means an out-of-range pageIndex (data filter/changes that shrink set)
  // is not auto-corrected. This guard helps prevent incorrect ranges like "21 – 20 of 5".
  const rangeFrom = rowCount === 0 ? 0 : Math.min(pageIndex * pageSize + 1, rowCount);
  const rangeTo = Math.min((pageIndex + 1) * pageSize, rowCount);

  return (
    <div className={styles.container()}>
      {/* `fieldset` will natively disable each input if the page is loading. */}
      <fieldset disabled={loading} className="contents">
        <Pagination
          aria-label="Pagination"
          boundaryCount={1}
          className={styles.pagination()}
          current={pageIndex + 1}
          onChange={page => table.setPageIndex(page - 1)}
          siblingCount={0}
          totalPages={table.getPageCount()}
        />
        <p>
          {rangeFrom} – {rangeTo} of {rowCount}
        </p>
        <div className={styles.pageSize()}>
          <label htmlFor={selectPageSizeId}>Items per page</label>
          <Select
            id={selectPageSizeId}
            onChange={event => table.setPageSize(Number(event.currentTarget.value))}
            value={pageSize}
          >
            {pageSizeOptions?.map(size => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </div>
      </fieldset>
    </div>
  );
}
