'use client';

import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useId, useMemo } from 'react';

import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableProps } from './advanced-table.types.js';
import { AdvancedTableEmptyState } from './components/index.js';
import { columnGenerator, useControlledState } from './utils/index.js';

/**
 * Data table built on TanStack Table (wired internally and fully hidden). Pass
 * `data` and `columns`; state follows the controlled/uncontrolled prop pattern.
 *
 * This is the rebuilt component (core rendering slice). Interactive features —
 * sorting, pagination, selection, pinning, reordering, resizing, expansion,
 * editing — are added in later slices.
 */
export function AdvancedTable<T>({
  columns,
  data,
  defaultData,
  onDataChange,
  caption,
  id,
  background,
  padding,
  bordered,
  fillContainer,
  emptyState,
}: AdvancedTableProps<T>) {
  const generatedId = useId();
  const tableId = id ?? generatedId;

  // Data follows the controlled (`data`) / uncontrolled (`defaultData`) pattern.
  // The setter is used by mutating features (e.g. editing) in a later slice.
  const [tableData] = useControlledState<T[]>(data, defaultData ?? [], onDataChange);

  const tableColumns = useMemo(() => columnGenerator(columns), [columns]);

  const table = useReactTable<T>({
    data: tableData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (_row, index, parent) => (parent ? `${parent.id}.${index}` : `${tableId}-${index}`),
  });

  const styles = advancedTableStyles({ background, padding, bordered, fillContainer });

  const isEmpty = tableData.length === 0;
  // At least 1 so the empty-state cell never emits an invalid `colspan="0"`.
  const leafColumnCount = Math.max(table.getVisibleLeafColumns().length, 1);

  return (
    <div className={styles.container()}>
      <table id={tableId} className={styles.table()}>
        {caption ? <caption className={styles.caption()}>{caption}</caption> : null}
        <thead className={styles.thead()}>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className={styles.headerRow()}>
              {headerGroup.headers.map(header => (
                <th key={header.id} scope="col" colSpan={header.colSpan} className={styles.th()}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className={styles.tbody()}>
          {isEmpty ? (
            <tr>
              <td colSpan={leafColumnCount} className={styles.emptyCell()}>
                <AdvancedTableEmptyState {...emptyState} />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className={styles.row()}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className={styles.td()}>
                    <div className={styles.cellContent()}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </div>
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
