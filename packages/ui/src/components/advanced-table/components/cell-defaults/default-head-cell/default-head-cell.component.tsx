import { useSortable } from '@dnd-kit/sortable';
import { Header } from '@tanstack/react-table';
import { useContext } from 'react';

import { AdvancedTableContext } from '../../../advanced-table.component.js';

export function DefaultHeadCell<T>({ header, title }: { header: Header<T, unknown>; title: string }) {
  const { attributes, listeners } = useSortable({ id: header.column.id });
  const { enableColumnReordering } = useContext(AdvancedTableContext);

  return (
    <button {...attributes} {...listeners} disabled={!enableColumnReordering}>
      <h2 className="whitespace-nowrap font-medium">{title}</h2>
    </button>
  );
}
