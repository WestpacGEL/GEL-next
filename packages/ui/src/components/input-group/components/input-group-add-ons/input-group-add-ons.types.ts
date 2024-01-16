import { ReactNode } from 'react';

import { IconProps } from '../../../icon/index.js';

export type AddOnProps = {
  /**
   * Children
   */
  children: ReactNode;
  /**
   * Position of add on i.e. before or after input
   */
  position: 'before' | 'after';
  /**
   * Sizes of add ons
   */
  size: 'small' | 'medium' | 'large' | 'xlarge';
};

export type InputGroupAddOnProps = {
  /**
   * Children
   */
  children?: ReactNode;
  /**
   * Icon to display
   */
  icon?: (props: Omit<IconProps, 'icon'>) => JSX.Element;
  /**
   * Icon component props
   */
  iconProps?: Omit<IconProps, 'icon'>;
  /**
   * ID for aria props
   */
  id?: string;
  /**
   * Render compononent within input borders
   */
  inset?: boolean;
  /**
   * Position of add on i.e. before or after input
   */
  position: 'before' | 'after';
  /**
   * Sizes of add ons
   */
  size: AddOnProps['size'];
};

export enum AddOnType {
  Default = 'default',
  Inset = 'inset',
}
