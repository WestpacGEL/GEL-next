'use client';

import React, { useRef } from 'react';
import { useButton, useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';

import { Button } from '../button/index.js';
import { CalendarIcon } from '../icon/index.js';

import { Calendar } from './components/calendar/calendar.component.js';
import { DateField } from './components/date-field/date-field.component.js';
import { Dialog } from './components/dialog/dialog.component.js';
import { Popover } from './components/popover/popover.component.js';
import { type DatePickerProps } from './date-picker.types.js';

export function DatePicker({ ...props }: DatePickerProps) {
  const state = useDatePickerState(props);
  const ref = useRef(null);
  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } = useDatePicker(
    props,
    state,
    ref,
  );

  const buttonRef = useRef(null);
  const { buttonProps: newButtonProps } = useButton(buttonProps, buttonRef);

  return (
    <div className="inline-flex flex-col">
      <div {...labelProps}>{props.label}</div>
      <div
        {...groupProps}
        ref={ref}
        className="form-control flex items-center gap-1 px-2 disabled:form-control-disabled"
      >
        <DateField {...fieldProps} />
        <Button
          look="unstyled"
          className="-mr-2 flex items-center justify-center rounded-l-none border-l border-l-borderDark bg-light px-2 py-3"
          {...newButtonProps}
        >
          <CalendarIcon size="small" />
        </Button>
      </div>
      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom left">
          <Dialog {...dialogProps}>
            <Calendar locale="en_AU" {...calendarProps} firstDayOfWeek={props.firstDayOfWeek} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
}
