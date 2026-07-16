import { useId } from 'react';

import { Pagination } from '../../../pagination/pagination.component.js';
import { Select } from '../../../select/select.component.js';
import { useAdvancedTableContext } from '../../advanced-table.context.js';

import { styles as advancedTablePaginationStyles } from './advanced-table-pagination.styles.js';

/**
 * Pagination controls for the table: the GEL `Pagination` component, a row-range
 * summary, and a page-size `Select`. Reads the table instance and page-size
 * options from context and drives paging through the engine's public setters,
 * which round-trip through the component's `pagination` state triple.
 */
export function AdvancedTablePagination() {
  const { table, pageSizeOptions, loading } = useAdvancedTableContext();
  const styles = advancedTablePaginationStyles();
  const selectPageSizeId = useId();

  const { pageIndex, pageSize } = table.getState().pagination;
  const rowCount = table.getRowCount();
  // Clamped: `autoResetPageIndex: false` means an out-of-range pageIndex (data
  // shrank while on a later page, or a controlled/seeded index starts out of
  // range) is never auto-corrected, so this guards against a nonsensical range
  // like "21 – 20 of 5".
  const rangeFrom = rowCount === 0 ? 0 : Math.min(pageIndex * pageSize + 1, rowCount);
  const rangeTo = Math.min((pageIndex + 1) * pageSize, rowCount);

  return (
    <div className={styles.container()}>
      {/* `fieldset` will natively disable each input if the page is loading. */}
      <fieldset disabled={loading} className="contents">
        <Pagination
          aria-label="Pagination"
          totalPages={table.getPageCount()}
          current={pageIndex + 1}
          onChange={page => table.setPageIndex(page - 1)}
          className={styles.pagination()}
          siblingCount={0}
          boundaryCount={1}
        />
        <p>
          {rangeFrom} – {rangeTo} of {rowCount}
        </p>
        <div className={styles.pageSize()}>
          <label htmlFor={selectPageSizeId}>Items per page</label>
          <Select
            id={selectPageSizeId}
            value={pageSize}
            onChange={event => table.setPageSize(Number(event.currentTarget.value))}
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
