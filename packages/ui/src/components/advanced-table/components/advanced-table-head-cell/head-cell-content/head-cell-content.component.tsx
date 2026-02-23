import { flexRender, Header, SortDirection } from '@tanstack/react-table';

import { AddIcon, ExpandLessIcon, ExpandMoreIcon, RemoveIcon } from '../../../../icon/index.js';
import { MenuButton } from '../../advanced-table-menu/components/menu-button/menu-button.component.js';

import { styles as HeadCellContentStyles } from './head-cell-content.styles.js';

export function HeadCellContent<T>({ header }: { header: Header<T, unknown> }) {
  const styles = HeadCellContentStyles();

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

  return (
    <>
      <div className={styles.headerContent()}>
        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
        {header.column.getCanSort() &&
          !header.isPlaceholder &&
          sortingIcon(header.column.getIsSorted(), () => {
            header.column.toggleSorting(undefined, true);
          })}
        {header.column.getCanGroup() && !header.isPlaceholder && (
          <button onClick={header.column.getToggleGroupingHandler()}>
            {header.column.getIsGrouped() ? <RemoveIcon size="small" /> : <AddIcon size="small" />}
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
    </>
  );
}
