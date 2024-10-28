import { ReactNode } from 'react';

import { IconProps } from '../icon/icon.types.js';

export type ProgressIndicatorProps = IconProps & {
  /**
   * children prop
   * @default false
   */
  children?: ReactNode;
  /**
   * Icon embedded in progress indicator
   */
  embedIcon?: (props: IconProps) => JSX.Element;
  /**
   * Progress indicator color
   * @default false
   */
  inverted?: boolean;
  /**
   * Label placed below progress indicator
   */
  label?: string;
};
