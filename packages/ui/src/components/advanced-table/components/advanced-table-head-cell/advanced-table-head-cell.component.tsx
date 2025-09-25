import { flexRender, SortDirection } from '@tanstack/react-table';
import { useContext } from 'react';

import { ExpandLessIcon, ExpandMoreIcon } from '../../../icon/index.js';
import { AdvancedTableContext } from '../../advanced-table.component.js';
import { getCommonPinningStyles } from '../../utils/getPinningStyles.js';
import { MenuButton } from '../advanced-table-menu/components/menu-button/menu-button.component.js';

import { styles as AdvancedTableHeadCellStyles } from './advanced-table-head-cell.styles.js';
import { AdvancedTableHeadCellProps } from './advanced-table-head-cell.types.js';

export function AdvancedTableHeadCell<T>({ header, scrollableColumns }: AdvancedTableHeadCellProps<T>) {
  const { resizable } = useContext(AdvancedTableContext);
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

  const styles = AdvancedTableHeadCellStyles({ scrollableColumns });
  return scrollableColumns ? (
    <th
      style={{
        width: `calc(var(--header-${header.id}-size) * 1px)`,
        ...getCommonPinningStyles(header.column),
      }}
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
        {header.column.getCanGroup() && !header.isPlaceholder && (
          <button onClick={header.column.getToggleGroupingHandler()}>
            <p>can group</p>
          </button>
        )}
        {header.column.getCanFilter() && !header.isPlaceholder && (
          <MenuButton
            filterVal={header.column.getFilterValue() as string}
            onInputChange={header.column.setFilterValue}
            onAction={action => console.log(action)}
          />
        )}
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
      {!header.isPlaceholder && header.column.getCanPin() && header.column.id !== 'select-column' && (
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
  ) : (
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
        {header.column.getCanGroup() && !header.isPlaceholder && (
          <button onClick={header.column.getToggleGroupingHandler()}>
            <p>can group</p>
          </button>
        )}
        {header.column.getCanFilter() && !header.isPlaceholder && (
          <MenuButton
            filterVal={header.column.getFilterValue() as string}
            onInputChange={header.column.setFilterValue}
            onAction={action => console.log(action)}
          />
        )}
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
  );
}
