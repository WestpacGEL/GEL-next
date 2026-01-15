import { AriaDateFieldProps, DateValue } from 'react-aria';

export type DateFieldProps<T extends DateValue = DateValue> = AriaDateFieldProps<T> & {
  separator?: string;
  className?: string;
};
