import { type HTMLAttributes } from 'react';
import { AriaFieldProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './selector-link-group.styles.js';

type Variants = VariantProps<typeof styles>;

export type SelectorLinkGroupProps = {
  /**
   * Whether all options are disabled
   */
  isDisabled?: boolean;
  /**
   * Orientation of radio
   */
  orientation?: Variants['orientation'];
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & AriaFieldProps &
  Omit<HTMLAttributes<Element>, 'onChange'>;
