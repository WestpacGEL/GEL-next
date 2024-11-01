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
  icon?: (props: IconProps) => JSX.Element;
  /**
   * Label placed below progress indicator
   */
  label?: string;
};
