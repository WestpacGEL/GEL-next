import { HTMLAttributes } from 'react';
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

export type DatePickerProps = {
  /**
   * Make Datepicker block
   */
  block?: Variants['block'];
  /**
   * Date format
   * @default dd-MM-yyyy
   */
  dateFormat?: 'dd-MM-yyyy' | 'dd/MM/yyyy';
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
   * Whether the user input is invalid
   * @default false
   */
  invalid?: boolean;
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
  // NOTE: duet library uses custom events build with another library causing these to be hard to type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onBlur?: (...args: any[]) => void;
  /*
   * onChange
   */
  // NOTE: duet library uses custom events build with another library causing these to be hard to type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (...args: any[]) => void;
  /*
   * onClose
   */
  // NOTE: duet library uses custom events build with another library causing these to be hard to type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClose?: (...args: any[]) => void;
  /*
   * onFocus
   */
  // NOTE: duet library uses custom events build with another library causing these to be hard to type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onFocus?: (...args: any[]) => void;
  /*
   * onOpen
   */
  // NOTE: duet library uses custom events build with another library causing these to be hard to type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onOpen?: (...args: any[]) => void;
  /*
   * placeholder
   */
  placeholder?: string;
  /**
   * Size of datepicker input
   */
  size?: Variants['size'];
  /*
   * Date picker input value. Must be in IS0-8601 format: YYYY-MM-DD
   */
  value?: string;
} & HTMLAttributes<Element>;
