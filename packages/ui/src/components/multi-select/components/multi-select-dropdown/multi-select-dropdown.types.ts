import { Dispatch, SetStateAction } from 'react';
import { AriaListBoxOptions } from 'react-aria';

import { MultiSelectProps } from '../../multi-select.types.js';

export type MultiSelectDropdownProps<T> = {
  listBoxProps?: MultiSelectProps<T>['listBoxProps'];
  setFilterText: Dispatch<SetStateAction<string>>;
} & AriaListBoxOptions<T>;
