import { HTMLAttributes } from 'react';
import { DateValue } from 'react-aria';
import { DatePickerStateOptions } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { styles } from './date-picker.styles.js';

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

type Variants = VariantProps<typeof styles>;

export type DatePickerProps<T extends DateValue = DateValue> = DatePickerStateOptions<T>;
