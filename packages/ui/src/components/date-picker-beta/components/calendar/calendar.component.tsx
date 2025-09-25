'use client';

import { CalendarDate, createCalendar } from '@internationalized/date';
import React, { ChangeEvent, useCallback, useMemo, useRef } from 'react';
import { useButton, useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { Circle } from '../../../circle/circle.component.js';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';

import { type CalendarProps } from './calendar.types.js';
import { CalendarGrid } from './components/calendar-grid/calendar-grid.component.js';
import { Select } from './components/select/select.component.js';

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const date = new Date(2020, i, 1); // Year doesn't matter, use 2020 as a common year
  const monthName = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);

  return {
    value: i + 1,
    label: monthName,
  };
});

const YEAR_OFFSET = 10;

/**
 * @private
 */
export function Calendar({ value, ...props }: CalendarProps) {
  const { locale } = useLocale();
  const refPrevButton = useRef(null);
  const refNextButton = useRef(null);
  const state = useCalendarState({
    createCalendar,
    ...props,
    value,
    locale,
  });

  const { calendarProps, prevButtonProps, nextButtonProps } = useCalendar({ value, ...props }, state);
  const { buttonProps: newPrevButtonProps } = useButton(prevButtonProps, refPrevButton);
  const { buttonProps: newNextButtonProps } = useButton(nextButtonProps, refNextButton);

  const years = useMemo(() => {
    const beginning = state.focusedDate.year - YEAR_OFFSET;
    return Array.from({ length: 20 }, (_, i) => {
      return {
        value: beginning + i,
        label: beginning + i,
      };
    });
  }, [state.focusedDate.year]);

  const handleMonthChange = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      state.setFocusedDate(new CalendarDate(state.focusedDate.year, +ev.target.value, state.focusedDate.day));
    },
    [state],
  );

  const handleYearChange = useCallback(
    (ev: ChangeEvent<HTMLSelectElement>) => {
      state.setFocusedDate(new CalendarDate(+ev.target.value, state.focusedDate.month, state.focusedDate.day));
    },
    [state],
  );

  return (
    <div {...calendarProps}>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Select onChange={handleMonthChange} value={state.visibleRange.start.month}>
            {MONTHS.map(month => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </Select>

          <Select onChange={handleYearChange} value={state.visibleRange.start.year}>
            {years.map(year => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </Select>
        </div>
        <div className="flex gap-2">
          <Button look="unstyled" {...newPrevButtonProps}>
            <Circle className="bg-light">
              <ArrowLeftIcon size="small" color="primary" />
            </Circle>
          </Button>
          <Button look="unstyled" {...newNextButtonProps}>
            <Circle className="bg-light">
              <ArrowRightIcon size="small" color="primary" />
            </Circle>
          </Button>
        </div>
      </div>
      <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
    </div>
  );
}
