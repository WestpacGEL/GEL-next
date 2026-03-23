import { flexRender, Header, SortDirection } from '@tanstack/react-table';
import { useContext } from 'react';

import {
  AddIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ExpandLessIcon,
  ExpandMoreIcon,
  RemoveIcon,
} from '../../../../icon/index.js';
import { AdvancedTableContext } from '../../../advanced-table.component.js';
import { MenuButton } from '../../advanced-table-menu/components/menu-button/menu-button.component.js';

import { styles as HeadCellContentStyles } from './head-cell-content.styles.js';

export function HeadCellContent<T>({ header }: { header: Header<T, unknown> }) {
  const { extraCellPadding, bordered } = useContext(AdvancedTableContext);

  const styles = HeadCellContentStyles({ extraCellPadding, bordered, resizeable: header.column.getCanResize() });

  const sortingIcon = (sorted: SortDirection | false, onClick: () => void) => {
    return (
      <button onClick={onClick} className="flex cursor-pointer flex-col">
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
            header={header}
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
              className: 'cursor-col-resize',
            }}
          >
            <span className="absolute top-0 -right-1 h-full w-2" />
            <span className={styles.resizeBar()} />
          </div>
        )}
      </div>
      {!header.isPlaceholder && header.column.getCanPin() && header.column.id !== 'select-column' && (
        <div className="flex justify-center gap-1">
          {header.column.getIsPinned() !== 'left' ? (
            <button
              className="rounded border px-2"
              onClick={() => {
                header.column.pin('left');
              }}
            >
              {'<='}
            </button>
          ) : null}
          {header.column.getIsPinned() ? (
            <button
              className="rounded border px-2"
              onClick={() => {
                header.column.pin(false);
              }}
            >
              X
            </button>
          ) : null}
          {header.column.getIsPinned() !== 'right' ? (
            <button
              className="rounded border px-2"
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
