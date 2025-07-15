import { HTMLAttributes } from 'react';
import { DateValue } from 'react-aria';
import { DatePickerStateOptions } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { Breakpoint } from '../../tailwind/constants/index.js';

import { styles } from './date-picker.styles.js';

type Variants = VariantProps<typeof styles>;

export type DatePickerProps<T extends DateValue = DateValue> = DatePickerStateOptions<T> &
  Variants &
  Omit<HTMLAttributes<HTMLDivElement>, 'invalid'> & {
    bottomSheetView?: boolean | Partial<Record<Breakpoint | 'initial', boolean>>;
    disableDaysOfWeek?: number[];
    disableWeekends?: boolean;
    separator?: string;
  };
