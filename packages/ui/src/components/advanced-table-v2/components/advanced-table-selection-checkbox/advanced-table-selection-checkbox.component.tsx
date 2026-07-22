import { Row, RowSelectionState } from '@tanstack/react-table';
import { useMemo, useRef } from 'react';
import { mergeProps, useCheckbox, useFocusRing } from 'react-aria';
import { useToggleState } from 'react-stately';

import { RemoveIcon, TickIcon } from '../../../icon/index.js';
import { VisuallyHidden } from '../../../visually-hidden/index.js';

import { styles as checkboxStyles } from './advanced-table-selection-checkbox.styles.js';
import {
  AdvancedTableRowCheckboxProps,
  AdvancedTableSelectAllCheckboxProps,
} from './advanced-table-selection-checkbox.types.js';

type BaseCheckboxProps = {
  'aria-label': string;
  isIndeterminate?: boolean;
  isSelected: boolean;
  onChange: (isSelected: boolean) => void;
};

/** TODO: determine if we should extract the Checkbox component from the existing GEL component */
function BaseCheckbox({ 'aria-label': ariaLabel, isIndeterminate, isSelected, onChange }: BaseCheckboxProps) {
  const state = useToggleState({ isSelected, onChange });
  const ref = useRef(null);
  const { inputProps } = useCheckbox({ 'aria-label': ariaLabel, isIndeterminate }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = checkboxStyles({ isFocusVisible });

  return (
    <label className={styles.base()}>
      <VisuallyHidden tag="span">
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <span className={styles.checkbox()}>
        {isSelected && !isIndeterminate && (
          <TickIcon aria-hidden className={styles.checkIcon()} color="hero" size="small" />
        )}
        {isIndeterminate && <RemoveIcon aria-hidden className={styles.checkIcon()} color="hero" size="small" />}
      </span>
    </label>
  );
}

/**
 * Sets `row` and every one of its descendants to `value` in `selection`, in place.
 * Bypasses `row.toggleSelected`, which bails out (no-ops) whenever the row's own raw
 * selection id already happens to match the requested value.
 */
function applySelectionRecursively<T>(row: Row<T>, value: boolean, selection: RowSelectionState) {
  if (row.getCanSelect()) {
    if (value) selection[row.id] = true;
    else Reflect.deleteProperty(selection, row.id);
  }
  row.subRows.forEach(subRow => applySelectionRecursively(subRow, value, selection));
}

/** Per-row checkbox rendered in the reserved select column. */
export function AdvancedTableRowCheckbox<T>({ row, table }: AdvancedTableRowCheckboxProps<T>) {
  // Use the total flat count (not the page-relative row model) so numbering stays stable
  // across pages and across expand/collapse. Falls back to row.index if the row's been
  // filtered out of the row model entirely.
  const visibleIndex = table.getPrePaginationRowModel().flatRows.indexOf(row);
  const displayIndex = visibleIndex === -1 ? row.index : visibleIndex;
  const hasCollapsedChildren = row.subRows.length > 0 && !row.getIsExpanded();

  const isIndeterminate = row.getIsSomeSelected();

  return (
    <BaseCheckbox
      isIndeterminate={isIndeterminate}
      // Fix for nested selection rows:
      // A parent whose children are all individually selected shows as checked too — but never alongside indeterminate
      // A stale own-id selection bit must not leak through, or clicking a row that's showing as
      // indeterminate would toggle to deselecting everything instead of selecting the rest.
      isSelected={!isIndeterminate && (row.getIsSelected() || row.getIsAllSubRowsSelected())}
      onChange={value =>
        table.setRowSelection(old => {
          const next = { ...old };
          applySelectionRecursively(row, value, next);
          return next;
        })
      }
      // TODO: when we have table column headers for rows, this should label to that row "Select row X"
      aria-label={
        hasCollapsedChildren ? `Select row ${displayIndex + 1} and collapsed rows` : `Select row ${displayIndex + 1}`
      }
    />
  );
}

/** Header "select-all in current page" checkbox rendered in the reserved select column. */
export function AdvancedTableSelectAllCheckbox<T>({ table }: AdvancedTableSelectAllCheckboxProps<T>) {
  const { columnFilters, expanded, pagination, rowSelection } = table.getState();

  const { isIndeterminate, isSelected, visibleRowIds } = useMemo(() => {
    const visibleRows = table.getRowModel().flatRows.filter(row => row.getCanSelect());
    // Match the per-row checkbox's definition of "selected" (below) so a parent whose children are
    // all individually selected doesn't make this read as indeterminate/unchecked while every row
    // on the page shows as checked.
    const isPageAllSelected =
      visibleRows.length > 0 && visibleRows.every(row => row.getIsSelected() || row.getIsAllSubRowsSelected());
    // Whether rows are selected outside this page/filter — used to show indeterminate state.
    const hasSelectionElsewhere = table.getIsSomeRowsSelected() || table.getIsAllRowsSelected();

    return {
      isIndeterminate: !isPageAllSelected && hasSelectionElsewhere,
      isSelected: isPageAllSelected,
      visibleRowIds: visibleRows.map(row => row.id),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- table's own reference is stable.
  }, [table, columnFilters, expanded, pagination, rowSelection]);

  return (
    <BaseCheckbox
      aria-label="Select all rows in current page"
      isIndeterminate={isIndeterminate}
      isSelected={isSelected}
      onChange={value =>
        table.setRowSelection(old => {
          const next = { ...old };
          visibleRowIds.forEach(id => {
            next[id] = value;
          });
          return next;
        })
      }
    />
  );
}
