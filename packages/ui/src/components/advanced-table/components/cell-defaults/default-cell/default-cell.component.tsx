import { useContext } from 'react';

import { DropDownIcon, DropLeftIcon } from '../../../../icon/index.js';
import { AdvancedTableContext } from '../../../advanced-table.context.js';

import { styles as defaultCellStyles } from './default-cell.styles.js';
import { DefaultCellProps } from './default-cell.types.js';

export function DefaultCell<T>({ row, getValue, column, enableRowSelection }: DefaultCellProps<T>) {
  const { extraCellPadding } = useContext(AdvancedTableContext);
  const firstColumnIndex = enableRowSelection ? 1 : 0;
  const styles = defaultCellStyles();

  const expansionStyle =
    column.getIndex() === firstColumnIndex && row.depth > 0
      ? {
          paddingLeft: `${row.depth * (extraCellPadding ? 18 : 12) + (!row.getCanExpand() && row.getIsAllParentsExpanded() ? 30 : 0)}px`,
        }
      : {};

  return (
    <div style={expansionStyle} className={styles.container()}>
      {(row.getCanExpand() || row.getIsGrouped()) && column.getIndex() === firstColumnIndex ? (
        <button onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? <DropDownIcon size="medium" /> : <DropLeftIcon size="medium" />}
        </button>
      ) : null}
      {getValue<boolean>()}
    </div>
  );
}
