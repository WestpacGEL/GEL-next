import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, SortDirection } from '@tanstack/react-table';
import { CSSProperties } from 'react';

import { ExpandLessIcon, ExpandMoreIcon } from '../../../icon/index.js';
import { getCommonPinningStyles } from '../../utils/getPinningStyles.js';
import { MenuButton } from '../advanced-table-menu/components/menu-button/menu-button.component.js';

import { styles as AdvancedTableHeadCellStyles } from './advanced-table-head-cell.styles.js';
import { AdvancedTableHeadCellProps } from './advanced-table-head-cell.types.js';

export function AdvancedTableHeadCell<T>({ header, scrollableColumns }: AdvancedTableHeadCellProps<T>) {
  const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({ id: header.column.id });
  const dndStyles: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    zIndex: isDragging ? 1 : 0,
  };
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
      ref={setNodeRef}
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
            // eslint-disable-next-line no-console
            onAction={action => console.log(action)}
          />
        )}
        {header.column.getCanResize() && !header.isPlaceholder && (
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
      style={{ width: `calc(var(--header-${header.id}-size) * 1px)`, ...dndStyles }}
      key={header.id}
      colSpan={header.colSpan}
      className={styles.th()}
      ref={setNodeRef}
    >
      <div className={styles.headerContent()}>
        {header.isPlaceholder ? null : (
          <button {...attributes} {...listeners}>
            {flexRender(header.column.columnDef.header, header.getContext())}
          </button>
        )}
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
            // eslint-disable-next-line no-console
            onAction={action => console.log(action)}
          />
        )}
        {header.column.getCanResize() && !header.isPlaceholder && (
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
