import { ReactNode } from 'react';
import { type AriaRadioProps } from 'react-aria';

export type RadioProps = {
  /**
   * `string` for overriding base style
   */
  className?: string;
  /**
   * Renders hint under radio, most likely a `string` but could be something else
   */
  hint?: ReactNode;
} & AriaRadioProps;
