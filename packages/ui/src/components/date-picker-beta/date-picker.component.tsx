'use client';

import { DateValue, getDayOfWeek, isWeekend } from '@internationalized/date';
import React, { useMemo, useRef } from 'react';
import { useButton, useDatePicker, useLocale } from 'react-aria';
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
import { type DatePickerBetaProps } from './date-picker.types.js';

const BREAKPOINTS_DECRECENT = ['xl', 'lg', 'md', 'sm', 'xsl', 'initial'] as const;
export function DatePickerBeta({
  size = 'medium',
  className,
  bottomSheetView = { initial: true, xsl: false },
  isDateUnavailable,
  disableDaysOfWeek,
  disableWeekends,
  separator,
  portalContainer,
  ...props
}: DatePickerBetaProps) {
  const { locale } = useLocale();

  const enhancedIsDateUnavailable = useMemo(() => {
    return disableDaysOfWeek || disableWeekends
      ? (date: DateValue) => {
          let conditions = [isDateUnavailable?.(date) || false];
          if (disableDaysOfWeek) {
            conditions = [disableDaysOfWeek.indexOf(getDayOfWeek(date, locale)) !== -1, ...conditions];
          }
          if (disableWeekends) {
            conditions = [isWeekend(date, locale), ...conditions];
          }
          return conditions.some(condition => condition);
        }
      : isDateUnavailable;
  }, [disableDaysOfWeek, disableWeekends, isDateUnavailable, locale]);

  const state = useDatePickerState({ isDateUnavailable: enhancedIsDateUnavailable, ...props });
  const styles = datePickerStyles({ size, isInvalid: state.isInvalid, isDisabled: props.isDisabled });
  const breakpoint = useBreakpoint();
  const ref = useRef(null);

  const { groupProps, labelProps, fieldProps, buttonProps, dialogProps, calendarProps } = useDatePicker(
    { isDateUnavailable: enhancedIsDateUnavailable, ...props },
    state,
    ref,
  );

  const showAsBottomSheet: boolean = useMemo(() => {
    if (typeof bottomSheetView === 'boolean') {
      return bottomSheetView;
    }
    const currentBreakpointIndex = BREAKPOINTS_DECRECENT.findIndex(bp => bp === breakpoint);
    const finalBreakPoint = [breakpoint, ...BREAKPOINTS_DECRECENT.slice(currentBreakpointIndex)].find(
      currentBreakpoint => bottomSheetView[currentBreakpoint] !== undefined,
    ) as Breakpoint | 'initial';

    return bottomSheetView[finalBreakPoint] || false;
  }, [bottomSheetView, breakpoint]);

  const buttonRef = useRef(null);

  const { buttonProps: newButtonProps } = useButton(buttonProps, buttonRef);

  const brandContainer = useMemo(() => {
    return (
      document.querySelector('[data-theme]') ||
      document.querySelector('[class^="theme-"], [class*=" theme-"]') ||
      undefined
    );
  }, []);

  return (
    <>
      <div {...labelProps}>{props.label}</div>
      <div {...props} {...groupProps} ref={ref} className={styles.input({ className })}>
        <DateField separator={separator} {...fieldProps} />
        <Button
          look="faint"
          className={styles.button()}
          iconColor="muted"
          size={size}
          iconAfter={CalendarIcon}
          {...newButtonProps}
          aria-labelledby={undefined}
        />
      </div>
      {state.isOpen && (
        <Popover
          portalContainer={portalContainer || brandContainer}
          showAsBottomSheet={showAsBottomSheet}
          state={state}
          triggerRef={ref}
          placement="bottom left"
        >
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} firstDayOfWeek={props.firstDayOfWeek} />
          </Dialog>
        </Popover>
      )}
    </>
  );
}
