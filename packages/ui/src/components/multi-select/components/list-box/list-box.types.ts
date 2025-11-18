import React from 'react';
import { type AriaListBoxOptions } from 'react-aria';

import type { ListState } from 'react-stately';

export type ListBoxProps = {
  filterText?: string;
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<unknown>;
} & AriaListBoxOptions<unknown>;
