import { HTMLAttributes } from 'react';
import { AriaListBoxOptions } from 'react-aria';
import { ListState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './list-box.styles.js';

export type ListBoxProps<T = any> = AriaListBoxOptions<T> & {
  listBoxRef?: React.RefObject<HTMLUListElement>;
  state: ListState<T>;
} & VariantProps<typeof styles> &
  HTMLAttributes<Element>;
