import { type HTMLAttributes } from 'react';
import { type AriaRadioGroupProps } from 'react-aria';
import { type RadioGroupState } from 'react-stately';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './selector-radio-group.styles.js';

export type SelectorRadioGroupProps = {
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & VariantProps<typeof styles> &
  AriaRadioGroupProps &
  Omit<HTMLAttributes<Element>, 'onChange'>;

export type SelectorRadioGroupContextState = {
  /**
   * Controls orientation of `Radio` components, can't be applied directly on `Radio`
   */
  orientation: 'vertical' | 'horizontal';
} & RadioGroupState;
