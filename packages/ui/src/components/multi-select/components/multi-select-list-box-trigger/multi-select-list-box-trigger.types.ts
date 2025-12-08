import { RefObject } from 'react';
import { ListProps, ListState, OverlayTriggerState } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { MultiSelectProps } from '../../multi-select.types.js';

import { styles as triggerStyles } from './multi-select-list-box-trigger.styles.js';

type Variants = VariantProps<typeof triggerStyles>;

export type MultiSelectListBoxTriggerProps<T> = {
  size: ResponsiveVariants<Variants['size']>;
  placeholder: string;
  listState: ListState<T>;
  overlayState: OverlayTriggerState;
  buttonRef: RefObject<HTMLButtonElement>;
  selectedKeys?: ListProps<T>['selectedKeys'];
  selectionMode?: ListProps<T>['selectionMode'];
  showSingleSectionTitle?: MultiSelectProps['showSingleSectionTitle'];
};
