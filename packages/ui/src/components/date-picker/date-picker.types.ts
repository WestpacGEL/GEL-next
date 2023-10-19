import { HTMLAttributes } from 'react';
import { VariantProps } from 'tailwind-variants';

import { styles } from './date-picker.styles.js';

export type DuetDatePickerElement = Element & {
  dateAdapter: any;
  identifier: any;
  isDateDisabled: (date: Date) => boolean;
  localization: any;
  max?: string;
  min?: string;
  name?: string;
  value?: string;
};

type Variants = VariantProps<typeof styles>;

export type DatePickerProps = {
  /*
   * Disable specific dates. Must be in IS0-8601 format: YYYY-MM-DD
   */
  disableDates?: string[];
  /*
   * Disable days of the week. 0 for Sunday, 1 for Monday, etc.
   */
  disableDaysOfWeek?: number[];
  /*
   * Disable weekend days
   */
  disableWeekends?: boolean;
  /**
   * Maximum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  max?: string;
  /**
   * Minimum date allowed to be picked. Must be in IS0-8601 format: YYYY-MM-DD.
   */
  min?: string;
  /*
   * Name
   */
  name?: string;
  /*
   * onBlur
   */
  onBlur?: (...args: any[]) => unknown;
  /*
   * onChange
   */
  onChange?: (...args: any[]) => unknown;
  /*
   * onClose
   */
  onClose?: (...args: any[]) => unknown;
  /*
   * onFocus
   */
  onFocus?: (...args: any[]) => unknown;
  /*
   * onOpen
   */
  onOpen?: (...args: any[]) => unknown;
  /**
   * Size of datepicker input
   */
  size?: Variants['size'];
  /*
   * Date picker input value. Must be in IS0-8601 format: YYYY-MM-DD
   */
  value?: string;
} & HTMLAttributes<Element>;
