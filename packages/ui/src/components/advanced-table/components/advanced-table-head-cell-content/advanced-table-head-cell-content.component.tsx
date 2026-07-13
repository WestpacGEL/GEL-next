import { flexRender, SortDirection } from '@tanstack/react-table';
import { useContext } from 'react';

import { ArrowDownIcon, ArrowUpIcon, SortIcon } from '../../../icon/index.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';
import { AdvancedTableContext } from '../../advanced-table.context.js';
import { RESERVED_COLUMN_IDS } from '../../utils/constants.js';
import { AdvancedTableMenu } from '../advanced-table-menu/advanced-table-menu.component.js';

import { styles as headCellContentStyles } from './advanced-table-head-cell-content.styles.js';
import { AdvancedTableHeadCellContentProps } from './advanced-table-head-cell-content.types.js';

export function AdvancedTableHeadCellContent<T>({ header }: AdvancedTableHeadCellContentProps<T>) {
  const { tableId, extraCellPadding, bordered } = useContext(AdvancedTableContext);

  const styles = headCellContentStyles({ extraCellPadding, bordered, resizable: header.column.getCanResize() });

  // Scope the ids to the table instance
  const labelId = `${tableId}-${header.id}-label`;
  const sortActionId = `${tableId}-${header.id}-sort-action`;

  const sortingIcon = (sorted: SortDirection | false, onClick: () => void) => {
    const label = (() => {
      const sortingOrder = header.column.getNextSortingOrder();
      switch (sortingOrder) {
        case 'asc':
          return 'Sort ascending';
        case 'desc':
          return 'Sort descending';
        default:
          return 'Clear sort';
      }
    })();

    return (
      <button aria-labelledby={`${labelId} ${sortActionId}`} className={styles.sortButton()} onClick={onClick}>
        {!sorted && <SortIcon aria-hidden size="small" />}
        {sorted === 'asc' && <ArrowUpIcon aria-hidden size="small" />}
        {sorted === 'desc' && <ArrowDownIcon aria-hidden size="small" />}
        <VisuallyHidden id={sortActionId} tag="span">
          {label}
        </VisuallyHidden>
      </button>
    );
  };

  return (
    <div className={styles.headerContent()}>
      {header.isPlaceholder ? null : (
        <span id={labelId}>{flexRender(header.column.columnDef.header, header.getContext())}</span>
      )}
      {header.column.getCanSort() &&
        !header.isPlaceholder &&
        sortingIcon(header.column.getIsSorted(), () => {
          // TODO: investigate multi-sort, this shouldnt be hardcoded?
          header.column.toggleSorting(undefined, true);
        })}
      {(header.column.getCanFilter() ||
        header.column.getCanGlobalFilter() ||
        header.column.getCanPin() ||
        header.column.getCanGroup()) &&
        !header.isPlaceholder &&
        !RESERVED_COLUMN_IDS.includes(header.column.id) && (
          <AdvancedTableMenu
            header={header}
            filterVal={header.column.getFilterValue() as string}
            onInputChange={header.column.setFilterValue}
          />
        )}
      {header.column.getCanResize() && !header.isPlaceholder && (
        <div
          {...{
            onDoubleClick: () => header.column.resetSize(),
            onMouseDown: header.getResizeHandler(),
            onTouchStart: header.getResizeHandler(),
            className: styles.resizeHandle(),
          }}
        >
          <span className={styles.resizeHitArea()} />
          <span className={styles.resizeBar()} />
        </div>
      )}
    </div>
  );
}
