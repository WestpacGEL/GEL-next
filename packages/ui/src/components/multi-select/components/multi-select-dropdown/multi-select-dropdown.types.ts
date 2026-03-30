import { Dispatch, SetStateAction } from 'react';
import { AriaListBoxOptions } from 'react-aria';

export type MultiSelectDropdownProps<T> = {
  hideFilter?: boolean;
  setFilterText: Dispatch<SetStateAction<string>>;
} & AriaListBoxOptions<T>;
