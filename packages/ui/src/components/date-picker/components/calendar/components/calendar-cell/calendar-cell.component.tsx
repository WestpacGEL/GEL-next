'use client';
import React, { useRef } from 'react';
import { useCalendarCell, useFocusVisible } from 'react-aria';

import { styles as calendarCellStyles } from './calendar-cell.styles.js';
import { CalendarCellProps } from './calendar-cell.types.js';

/**
 * @private
 */
export function CalendarCell({ state, date }: CalendarCellProps) {
  const ref = useRef(null);
  const { isFocusVisible } = useFocusVisible();
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    isUnavailable,
    formattedDate,
    isFocused,
  } = useCalendarCell({ date }, state, ref);
  const isToday = buttonProps['aria-label']?.indexOf('Today') !== -1;
  const styles = calendarCellStyles({
    isSelected,
    isFocused: isFocused && isFocusVisible,
    isToday,
    isDisabled,
    isUnavailable,
  });

  return (
    <td {...cellProps}>
      <div className={styles.base()}>
        <div {...buttonProps} ref={ref} hidden={isOutsideVisibleRange} className={styles.text()}>
          {formattedDate}
        </div>
      </div>
    </td>
  );
}
