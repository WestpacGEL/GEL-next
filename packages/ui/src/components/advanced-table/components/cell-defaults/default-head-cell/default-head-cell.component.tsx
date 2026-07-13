import { useSortable } from '@dnd-kit/sortable';
import { useContext } from 'react';

import { AdvancedTableContext } from '../../../advanced-table.context.js';

import { styles as defaultHeadCellStyles } from './default-head-cell.styles.js';
import { DefaultHeadCellProps } from './default-head-cell.types.js';

export function DefaultHeadCell<T>({ header, title }: DefaultHeadCellProps<T>) {
  const { attributes, listeners } = useSortable({ id: header.column.id });
  const { enableColumnReordering } = useContext(AdvancedTableContext);
  const styles = defaultHeadCellStyles();

  if (enableColumnReordering) {
    return (
      <button {...attributes} {...listeners} className={styles.button()}>
        <span className={styles.title()}>{title}</span>
      </button>
    );
  }

  return <span className={styles.title()}>{title}</span>;
}
