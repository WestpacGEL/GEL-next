import { ReactNode } from 'react';
import { type AriaRadioProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './option.styles.js';

export type OptionProps = {
  /**
   * `string` for overriding base style
   */
  className?: string;
  /**
   * Renders hint under option, most likely a `string` but could be something else
   */
  hint?: ReactNode;
} & Omit<VariantProps<typeof styles>, 'size' | 'orientation'> &
  AriaRadioProps;
