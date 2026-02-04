import { Dispatch, SetStateAction } from 'react';
import { AriaListBoxOptions } from 'react-aria';

export type MultiSelectDropdownProps<T> = {
  setFilterText: Dispatch<SetStateAction<string>>;
} & AriaListBoxOptions<T>;
