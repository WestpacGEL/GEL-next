import { useState } from 'react';

import { ArrowRightIcon, ExpandMoreIcon } from '../../../../icon/index.js';

import { styles as editableCellStyles } from './editable-cell.styles.js';
import { EditableCellProps } from './editable-cell.types.js';

export function EditableCell<T>({ row, getValue, column, enableRowSelection, table }: EditableCellProps<T>) {
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
        <button onClick={row.getToggleExpandedHandler()}>
          {row.getIsExpanded() ? <ExpandMoreIcon size="small" /> : <ArrowRightIcon size="small" />}
        </button>
      ) : null}
      <input value={value as string} onChange={e => setValue(e.target.value)} onBlur={onBlur} />
    </div>
  );
}
