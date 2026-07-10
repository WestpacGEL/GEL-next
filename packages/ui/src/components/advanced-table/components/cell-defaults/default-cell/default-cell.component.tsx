import { useContext } from 'react';

import { DropDownIcon, DropLeftIcon } from '../../../../icon/index.js';
import { AdvancedTableContext } from '../../../advanced-table.context.js';
import { getExpandButtonA11yProps } from '../../../utils/index.js';

import { styles as defaultCellStyles } from './default-cell.styles.js';
import { DefaultCellProps } from './default-cell.types.js';

export function DefaultCell<T>({ row, getValue, column, enableRowSelection }: DefaultCellProps<T>) {
  const { extraCellPadding, enableRowPinning, renderDetailPanel } = useContext(AdvancedTableContext);
  const firstColumnIndex = (enableRowSelection ? 1 : 0) + (enableRowPinning ? 1 : 0);
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
        <button
          onClick={row.getToggleExpandedHandler()}
          {...getExpandButtonA11yProps(row, getValue(), !!renderDetailPanel)}
        >
          {row.getIsExpanded() ? (
            <DropDownIcon aria-hidden size="medium" />
          ) : (
            <DropLeftIcon aria-hidden size="medium" />
          )}
        </button>
      ) : null}
      {getValue<boolean>()}
    </div>
  );
}
