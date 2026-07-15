import { useRef } from 'react';
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
  isSelected: boolean;
  isIndeterminate?: boolean;
  onChange: (isSelected: boolean) => void;
  'aria-label': string;
};

/** Standalone checkbox (not group-bound) built directly on `useToggleState` +
 * `useCheckbox`, so it can express `isIndeterminate` — used by both the
 * per-row and select-all checkboxes in the reserved select column. */
function BaseCheckbox({ isSelected, isIndeterminate, onChange, 'aria-label': ariaLabel }: BaseCheckboxProps) {
  const state = useToggleState({ isSelected, onChange });
  const ref = useRef(null);
  const { inputProps } = useCheckbox({ isIndeterminate, 'aria-label': ariaLabel }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = checkboxStyles({ isFocusVisible });

  return (
    <label className={styles.base()}>
      <VisuallyHidden tag="span">
        <input {...mergeProps(inputProps, focusProps)} ref={ref} />
      </VisuallyHidden>
      <span className={styles.checkbox()}>
        {isSelected && !isIndeterminate && (
          <TickIcon aria-hidden size="small" color="hero" className={styles.checkIcon()} />
        )}
        {isIndeterminate && <RemoveIcon aria-hidden size="small" color="hero" className={styles.checkIcon()} />}
      </span>
    </label>
  );
}

/** Per-row checkbox rendered in the reserved select column. */
export function AdvancedTableRowCheckbox<T>({ row, table }: AdvancedTableRowCheckboxProps<T>) {
  // Pre-pagination (but post-sort) row model, so the label is a stable overall
  // position — "Select row 1" doesn't repeat identically on every page, unlike
  // `table.getRowModel()`, which is page-scoped whenever pagination is enabled.
  const displayIndex = table.getPrePaginationRowModel().rows.indexOf(row);

  return (
    <BaseCheckbox
      isSelected={row.getIsSelected()}
      onChange={value => row.toggleSelected(value)}
      // TODO: when we have table column headers for rows, this should label to that row "Select row X"
      aria-label={`Select row ${displayIndex + 1}`}
    />
  );
}

/** Header select-all checkbox rendered in the reserved select column. */
export function AdvancedTableSelectAllCheckbox<T>({ table }: AdvancedTableSelectAllCheckboxProps<T>) {
  const isAllSelected = table.getIsAllPageRowsSelected();
  const isSomeSelected = table.getIsSomePageRowsSelected();

  return (
    <BaseCheckbox
      isSelected={isAllSelected}
      isIndeterminate={isSomeSelected && !isAllSelected}
      onChange={value => table.toggleAllPageRowsSelected(value)}
      aria-label="Select all rows in current page"
    />
  );
}
