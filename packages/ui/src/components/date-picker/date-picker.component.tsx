'use client';

import { DateValue, getDayOfWeek, isWeekend } from '@internationalized/date';
import { Breakpoint } from '@westpac/style-config/constants';
import React, { useMemo, useRef } from 'react';
import { useButton, useDatePicker, useLocale } from 'react-aria';
import { useDatePickerState } from 'react-stately';

import { useBreakpoint } from '../../hook/breakpoints.hook.js';
import { resolveResponsiveVariant } from '../../utils/breakpoint.util.js';
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
  size = 'medium',
  className,
  bottomSheetView = { initial: true, xsl: false },
  block,
  isDateUnavailable,
  disableDaysOfWeek,
  disableWeekends,
  separator,
  portalContainer,
  placement = 'bottom left',
  ...props
}: DatePickerProps) {
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
  const breakpoint = useBreakpoint();
  const resolvedSize = resolveResponsiveVariant(size, breakpoint);
  const resolvedBlock = resolveResponsiveVariant(block, breakpoint);
  const styles = datePickerStyles({
    block: resolvedBlock,
    size: resolvedSize,
    isInvalid: state.isInvalid,
    isReadOnly: props.isReadOnly,
    isDisabled: props.isDisabled,
  });
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
      {props.label && <div {...labelProps}>{props.label}</div>}
      <div
        {...props}
        {...groupProps}
        ref={ref}
        onBlur={e => {
          if (state.value) {
            return props.onBlur?.(e, state.value);
          }
          return props.onBlur?.(e);
        }}
        className={styles.input({ className })}
      >
        <DateField className={styles.dateField()} separator={separator} {...fieldProps} />
        <Button
          look="faint"
          className={styles.button()}
          iconColor="muted"
          size={resolvedSize}
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
          placement={placement}
        >
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} firstDayOfWeek={props.firstDayOfWeek} />
          </Dialog>
        </Popover>
      )}
    </>
  );
}
