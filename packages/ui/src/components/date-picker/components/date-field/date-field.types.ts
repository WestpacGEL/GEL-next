import { AriaDateFieldProps, DateValue } from 'react-aria';

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

export type DateFieldProps<T extends DateValue = DateValue> = AriaDateFieldProps<T>;
