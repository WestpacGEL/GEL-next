import { ListProps } from 'react-stately';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { MultiSelectProps } from '../../multi-select.types.js';

import { styles as triggerStyles } from './multi-select-list-box-trigger.styles.js';

type Variants = VariantProps<typeof triggerStyles>;

export type MultiSelectSize = ResponsiveVariants<Variants['size']>;

export type MultiSelectListBoxTriggerProps<T> = {
  placeholder: string;
  selectedKeys?: ListProps<T>['selectedKeys'];
  showSingleSectionTitle?: MultiSelectProps<T>['showSingleSectionTitle'];
};
