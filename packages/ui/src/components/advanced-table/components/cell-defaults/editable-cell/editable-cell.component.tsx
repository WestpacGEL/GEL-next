import { useContext, useState } from 'react';

import { ArrowRightIcon, ExpandMoreIcon } from '../../../../icon/index.js';
import { AdvancedTableContext } from '../../../advanced-table.context.js';
import { getExpandButtonA11yProps } from '../../../utils/index.js';

import { styles as editableCellStyles } from './editable-cell.styles.js';
import { EditableCellProps } from './editable-cell.types.js';

export function EditableCell<T>({ row, getValue, column, enableRowSelection, table }: EditableCellProps<T>) {
  const { renderDetailPanel } = useContext(AdvancedTableContext);
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const firstColumnIndex = enableRowSelection ? 1 : 0;
  const styles = editableCellStyles();

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };

  return (
    <div style={{ paddingLeft: `${row.depth * 2}rem` }} className={styles.container()}>
      {(row.getCanExpand() || row.getIsGrouped()) && column.getIndex() === firstColumnIndex ? (
        <button
          onClick={row.getToggleExpandedHandler()}
          {...getExpandButtonA11yProps(row, getValue(), !!renderDetailPanel)}
        >
          {row.getIsExpanded() ? (
            <ExpandMoreIcon aria-hidden size="small" />
          ) : (
            <ArrowRightIcon aria-hidden size="small" />
          )}
        </button>
      ) : null}
      <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />
    </div>
  );
}
