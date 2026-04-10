import { flexRender, SortDirection } from '@tanstack/react-table';
import { useContext } from 'react';

import { ArrowDownIcon, ArrowUpIcon, ExpandLessIcon, ExpandMoreIcon } from '../../../icon/index.js';
import { AdvancedTableContext } from '../../advanced-table.context.js';
import { RESERVED_COLUMN_IDS } from '../../utils/constants.js';
import { AdvancedTableMenu } from '../advanced-table-menu/advanced-table-menu.component.js';

import { styles as headCellContentStyles } from './advanced-table-head-cell-content.styles.js';
import { AdvancedTableHeadCellContentProps } from './advanced-table-head-cell-content.types.js';

export function AdvancedTableHeadCellContent<T>({ header }: AdvancedTableHeadCellContentProps<T>) {
  const { extraCellPadding, bordered } = useContext(AdvancedTableContext);

  const styles = headCellContentStyles({ extraCellPadding, bordered, resizable: header.column.getCanResize() });

  const sortingIcon = (sorted: SortDirection | false, onClick: () => void) => {
    return (
      <button onClick={onClick} className={styles.sortButton()}>
        {!sorted && (
          <>
            <ExpandLessIcon size="xsmall" className="mb-[-2px]" />
            <ExpandMoreIcon size="xsmall" className="mt-[-2px]" />
          </>
        )}
        {sorted === 'asc' && <ArrowUpIcon size="small" />}
        {sorted === 'desc' && <ArrowDownIcon size="small" />}
      </button>
    );
  };

  return (
    <div className={styles.headerContent()}>
      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanSort() &&
        !header.isPlaceholder &&
        sortingIcon(header.column.getIsSorted(), () => {
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
