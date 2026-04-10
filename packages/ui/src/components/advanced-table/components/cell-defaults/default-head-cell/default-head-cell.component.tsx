import { useSortable } from '@dnd-kit/sortable';
import { useContext } from 'react';

import { AdvancedTableContext } from '../../../advanced-table.context.js';

import { styles as defaultHeadCellStyles } from './default-head-cell.styles.js';
import { DefaultHeadCellProps } from './default-head-cell.types.js';

export function DefaultHeadCell<T>({ header, title }: DefaultHeadCellProps<T>) {
  const { attributes, listeners } = useSortable({ id: header.column.id });
  const { enableColumnReordering } = useContext(AdvancedTableContext);
  const styles = defaultHeadCellStyles({ isReorderEnabled: !!enableColumnReordering });

  return (
    <button {...attributes} {...listeners} disabled={!enableColumnReordering} className={styles.button()}>
      <h2 className={styles.title()}>{title}</h2>
    </button>
  );
}
