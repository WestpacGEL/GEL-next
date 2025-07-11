import { HTMLAttributes } from 'react';
import { DateFieldState, DateSegment } from 'react-stately';

export type DuetDatePickerElement = Element & {
  dateAdapter: object;
  identifier?: string;
  isDateDisabled: (date: Date) => boolean;
  localization: object;
  max?: string;
  min?: string;
  name?: string;
  value?: string;
};

export type DateSegmentProps = { segment: DateSegment; state: DateFieldState } & HTMLAttributes<Element>;
