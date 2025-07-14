import { CalendarStateOptions } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { styles } from './calendar.styles.js';

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

export type DatePickerProps = Omit<CalendarStateOptions, 'createCalendar'>;
