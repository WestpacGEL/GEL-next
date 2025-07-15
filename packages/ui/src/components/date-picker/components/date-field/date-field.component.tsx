'use client';

import { createCalendar } from '@internationalized/date';
import { useRef } from 'react';
import { useDateField, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';

import { DateSegment } from './components/date-segment/date-segment.component.js';
import { type DateFieldProps } from './date-field.types.js';

export function DateField({ separator, ...props }: DateFieldProps) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  const ref = useRef(null);
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref}>
      {state.segments.map((segment, i) => (
        <DateSegment separator={separator} key={i} segment={segment} state={state} />
      ))}
      {/* {state.isInvalid && <span aria-hidden="true">🚫</span>} */}
    </div>
  );
}
