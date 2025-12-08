import React from 'react';
import { type AriaListBoxOptions } from 'react-aria';

import type { ListState } from 'react-stately';

/**
 * Generic ListBox props where `T` is the item value type used by react-stately.
 * Default is `unknown` so callers must specify a concrete type where needed.
 */
export type MultiSelectListBoxProps<T = unknown> = {
  filterText?: string;
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<T>;
} & AriaListBoxOptions<T>;
