'use client';

import { createCalendar } from '@internationalized/date';
import React, { ForwardedRef, forwardRef, useRef } from 'react';
import { useDateField, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import { DateSegment } from './components/date-segment/date-segment.component.js';
import { type DateFieldProps } from './date-field.types.js';

/**
 * @private
 */
function BaseDateField(
  { separator, className, ...props }: DateFieldProps,
  // Attached to the first editable segment, the same element react-aria focuses for this field.
  forwardedRef: ForwardedRef<HTMLSpanElement>,
) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);
  const firstEditableIndex = state.segments.findIndex(segment => segment.isEditable);

  return (
    <div {...fieldProps} className={className} ref={ref}>
      {state.segments.map((segment, i) => (
        <DateSegment
          separator={separator}
          key={i}
          segment={segment}
          state={state}
          ref={i === firstEditableIndex ? forwardedRef : null}
        />
      ))}
    </div>
  );
}

export const DateField = forwardRef(BaseDateField);
DateField.displayName = 'DateField';
