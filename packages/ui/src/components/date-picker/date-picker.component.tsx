'use client';

import React, { useMemo, useRef } from 'react';
import { useButton, useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { Breakpoint } from '../../tailwind/constants/index.js';
import { Button } from '../button/index.js';
import { CalendarIcon } from '../icon/index.js';

import { Calendar } from './components/calendar/calendar.component.js';
import { DateField } from './components/date-field/date-field.component.js';
import { Dialog } from './components/dialog/dialog.component.js';
import { Popover } from './components/popover/popover.component.js';
import { styles as datePickerStyles } from './date-picker.styles.js';
import { type DatePickerProps } from './date-picker.types.js';

const BREAKPOINTS_DECRECENT = ['xl', 'lg', 'md', 'sm', 'xsl', 'initial'] as const;
export function DatePicker({
  size = 'md',
  className,
  bottomSheetView = { initial: true, xsl: false },
  ...props
}: DatePickerProps) {
  const state = useDatePickerState(props);
  const breakpoint = useBreakpoint();
  const ref = useRef(null);
  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } = useDatePicker(
    props,
    state,
    ref,
  );
  const styles = datePickerStyles({ size, isInvalid: state.isInvalid, isDisabled: props.isDisabled });

  const buttonRef = useRef(null);
  const { buttonProps: newButtonProps } = useButton(buttonProps, buttonRef);

  const showAsBottomSheet: boolean = useMemo(() => {
    if (typeof bottomSheetView === 'boolean') {
      return showAsBottomSheet;
    }
    const currentBreakpointIndex = BREAKPOINTS_DECRECENT.findIndex(bp => bp === breakpoint);
    const finalBreakPoint = [breakpoint, ...BREAKPOINTS_DECRECENT.slice(currentBreakpointIndex)].find(
      currentBreakpoint => bottomSheetView[currentBreakpoint as Breakpoint | 'initial'] !== undefined,
    ) as Breakpoint | 'initial';

    return bottomSheetView[finalBreakPoint] || false;
  }, [bottomSheetView, breakpoint]);

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <div {...props} {...groupProps} ref={ref} className={styles.input({ className })}>
        <DateField {...fieldProps} />
        <Button look="unstyled" className={styles.button()} {...newButtonProps}>
          <CalendarIcon size="small" />
        </Button>
      </div>
      {state.isOpen && (
        <Popover showAsBottomSheet={showAsBottomSheet} state={state} triggerRef={ref} placement="bottom left">
          <Dialog {...dialogProps}>
            <Calendar locale="en_AU" {...calendarProps} firstDayOfWeek={props.firstDayOfWeek} />
          </Dialog>
        </Popover>
      )}
    </>
  );
}
