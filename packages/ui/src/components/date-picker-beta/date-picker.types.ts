import { HTMLAttributes } from 'react';
import { DateValue } from 'react-aria';
import { DatePickerStateOptions } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { Breakpoint } from '../../tailwind/constants/index.js';

import { styles } from './date-picker.styles.js';

type Variants = VariantProps<typeof styles>;

export type DatePickerBetaProps<T extends DateValue = DateValue> = DatePickerStateOptions<T> &
  Variants &
  Omit<HTMLAttributes<HTMLDivElement>, 'invalid'> & {
    /**
     * Determines whether to display the component as a bottom sheet view.
     * Can also accept an object to conditionally enable the bottom sheet based on breakpoints.
     */
    bottomSheetView?: boolean | Partial<Record<Breakpoint | 'initial', boolean>>;

    /**
     * An array of numbers representing the days of the week to disable.
     * For example, to disable Monday, Wednesday, and Saturday: [0, 2, 5].
     */
    disableDaysOfWeek?: number[];

    /**
     * If true, disables selection of weekend days (Saturday and Sunday).
     */
    disableWeekends?: boolean;

    /**
     * Separator character used in the date field. Defaults to "/".
     */
    separator?: string;
    /**
     * portal container for date picker
     */
    portalContainer?: Element;
  };
