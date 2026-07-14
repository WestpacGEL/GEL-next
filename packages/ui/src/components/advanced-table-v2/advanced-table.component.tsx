'use client';

import { useControlledState } from '@react-stately/utils';
import { useReactTable } from '@tanstack/react-table';
import { useId, useMemo } from 'react';

import { AdvancedTableProvider, AdvancedTableContextValue } from './advanced-table.context.js';
import { styles as advancedTableStyles } from './advanced-table.styles.js';
import { AdvancedTableProps, AdvancedTableSortingState } from './advanced-table.types.js';
import { AdvancedTableBody, AdvancedTableCaption, AdvancedTableHead } from './components/index.js';
import { buildTableOptions, columnGenerator } from './utils/index.js';

const EMPTY_DATA: never[] = [];
const EMPTY_SORTING: AdvancedTableSortingState = [];

/**
 * Data table built on TanStack Table (wired internally and fully hidden). Pass
 * `data` and `columns`; state follows the controlled/uncontrolled prop pattern.
 *
 * This is the rebuilt component. Interactive features — pagination, selection,
 * pinning, reordering, resizing, expansion, editing — are added in later slices.
 */
export function AdvancedTable<T>({
  columns,
  data,
  defaultData,
  caption,
  hideCaption,
  id,
  enableSorting,
  sorting: sortingProp,
  defaultSorting: defaultSortingProp,
  onSortingChange: onSortingChangeProp,
  manualSorting,
  background,
  padding,
  bordered,
  fillContainer,
  emptyState,
}: AdvancedTableProps<T>) {
  const generatedId = useId();
  const tableId = id ?? generatedId;
  const resolvedData = data ?? defaultData ?? EMPTY_DATA;

  const [sortingState, setSortingState] = useControlledState<AdvancedTableSortingState>(
    sortingProp,
    defaultSortingProp ?? EMPTY_SORTING,
    onSortingChangeProp,
  );

  const tableColumns = useMemo(() => columnGenerator(columns, { enableSorting }), [columns, enableSorting]);

  // TanStack hands `onSortingChange` an updater; react-stately's setter accepts a
  // `SetStateAction`, so the updater passes straight through with no unwrapping.
  const table = useReactTable<T>(
    buildTableOptions<T>({
      data: resolvedData,
      columns: tableColumns,
      tableId,
      enableSorting,
      sortingState,
      onSortingChange: setSortingState,
      manualSorting,
    }),
  );

  const sortAnnouncement = useMemo(() => {
    if (!enableSorting) return null;
    // The empty state doubles as the "cleared" announcement — it is silent on
    // initial mount (live regions don't announce initial content) but is read out
    // when the user removes a sort, so clearing is announced like any other change.
    if (sortingState.length === 0) return 'Sorting cleared.';
    const s = sortingState[0];
    const label = s.desc ? 'sorted descending' : 'sorted ascending';
    // `columnDef.header` is set to the column's title (a string) by columnGenerator.
    const header = table.getColumn(s.id)?.columnDef.header;
    const name = typeof header === 'string' ? header : s.id;
    return `${name} ${label}`;
  }, [sortingState, table, enableSorting]);

  const styles = advancedTableStyles({ bordered, fillContainer });

  const contextValue = useMemo<AdvancedTableContextValue<T>>(
    () => ({ table, tableId, emptyState, background, padding, bordered }),
    [table, tableId, emptyState, background, padding, bordered],
  );

  return (
    <AdvancedTableProvider value={contextValue as AdvancedTableContextValue<unknown>}>
      <div className={styles.container()}>
        <table id={tableId} className={styles.table()}>
          {caption ? (
            <AdvancedTableCaption title={caption} hideCaption={hideCaption} hasSorting={enableSorting} />
          ) : null}
          <AdvancedTableHead />
          <AdvancedTableBody />
        </table>
        {enableSorting && (
          <div aria-atomic="true" aria-live="polite" className={styles.srOnly()}>
            {sortAnnouncement}
          </div>
        )}
      </div>
    </AdvancedTableProvider>
  );
}
