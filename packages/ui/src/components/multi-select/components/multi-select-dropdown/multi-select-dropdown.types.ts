import { Dispatch, RefObject, SetStateAction } from 'react';
import { AriaListBoxOptions } from 'react-aria';

import { MultiSelectProps } from '../../multi-select.types.js';

export type MultiSelectDropdownProps<T> = {
  inputRef: RefObject<HTMLInputElement>;
  listBoxProps?: MultiSelectProps<T>['listBoxProps'];
  setFilterText: Dispatch<SetStateAction<string>>;
} & AriaListBoxOptions<T>;
