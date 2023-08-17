import { AriaSwitchProps } from 'react-aria';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './switch.styles.js';

export type SwitchProps = {
  /**
   * Whether to display switch as block
   */
  block?: boolean;
  /**
   * Tag to render
   */
  className?: string;
  /**
   * Label for the switch
   */
  label: string;
} & Omit<AriaSwitchProps, 'children'> &
  Pick<VariantProps<typeof styles>, 'size'>;
