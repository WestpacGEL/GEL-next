import { CellContext } from '@tanstack/react-table';
import { useContext } from 'react';

import { DropDownIcon, DropLeftIcon } from '../../../../icon/index.js';
import { AdvancedTableContext } from '../../../advanced-table.component.js';

export function DefaultCell<T>({
  row,
  getValue,
  column,
  enableRowSelection,
}: CellContext<T, unknown> & { enableRowSelection?: boolean }) {
  const { extraCellPadding } = useContext(AdvancedTableContext);
  const firstColumnIndex = enableRowSelection ? 1 : 0;

  // Style for expansion padding - only apply to first column and if row is nested
  const expansionStyle =
    column.getIndex() === firstColumnIndex && row.depth > 0
      ? {
          paddingLeft: `${row.depth * (extraCellPadding ? 18 : 12) + (!row.getCanExpand() && row.getIsAllParentsExpanded() ? 30 : 0)}px`,
        }
      : {};

  return (
    <div style={expansionStyle} className="flex flex-row gap-1">
      {(row.getCanExpand() || row.getIsGrouped()) && column.getIndex() === firstColumnIndex ? (
        <button onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? <DropDownIcon size="medium" /> : <DropLeftIcon size="medium" />}
        </button>
      ) : null}
      {getValue<boolean>()}
    </div>
  );
}
