import React from 'react';
import { type AriaListBoxOptions } from 'react-aria';

export type MultiSelectListBoxProps<T> = {
  listBoxRef: React.RefObject<HTMLUListElement>;
} & Omit<AriaListBoxOptions<T>, 'selectionMode'>;
