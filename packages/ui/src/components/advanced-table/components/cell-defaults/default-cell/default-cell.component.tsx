import { CellContext } from '@tanstack/react-table';

import { ArrowRightIcon, ExpandMoreIcon } from '../../../../icon/index.js';

export function DefaultCell<T>({
  row,
  getValue,
  column,
  enableRowSelection,
}: CellContext<T, unknown> & { enableRowSelection?: boolean }) {
  const firstColumnIndex = enableRowSelection ? 1 : 0;

  return (
    <div style={{ paddingLeft: `${row.depth * 2}rem` }} className="flex flex-row gap-1">
      {(row.getCanExpand() || row.getIsGrouped()) && column.getIndex() === firstColumnIndex ? (
        <button onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? <ExpandMoreIcon size="small" /> : <ArrowRightIcon size="small" />}
        </button>
      ) : null}
      {getValue<boolean>()}
    </div>
  );
}
