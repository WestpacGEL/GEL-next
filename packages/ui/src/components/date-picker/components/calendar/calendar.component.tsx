'use client';

import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import { useButton, useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { Circle } from '../../../circle/circle.component.js';
import { ArrowLeftIcon, ArrowRightIcon } from '../../../icon/index.js';

import { type DatePickerProps } from './calendar.types.js';
import { CalendarGrid } from './components/calendar-grid/calendar-grid.component.js';

export function Calendar({ value, ...props }: DatePickerProps) {
  const { locale } = useLocale();
  const refPrevButton = useRef(null);
  const refNextButton = useRef(null);
  const state = useCalendarState({
    createCalendar,
    ...props,
    locale,
  });

  const { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar({ value, ...props }, state);
  const { buttonProps: newPrevButtonProps } = useButton(prevButtonProps, refPrevButton);
  const { buttonProps: newNextButtonProps } = useButton(nextButtonProps, refNextButton);

  console.log('value', value);
  return (
    <div {...calendarProps} className="calendar">
      <div className="flex items-center justify-between">
        <h2>{title}</h2>
        <div className="flex gap-2">
          <Button look="unstyled" {...newPrevButtonProps}>
            <Circle>
              <ArrowLeftIcon size="xsmall" color="primary" />
            </Circle>
          </Button>
          <Button look="unstyled" {...newNextButtonProps}>
            <Circle>
              <ArrowRightIcon size="xsmall" color="primary" />
            </Circle>
          </Button>
        </div>
      </div>
      <CalendarGrid state={state} firstDayOfWeek={props.firstDayOfWeek} />
    </div>
  );
}
