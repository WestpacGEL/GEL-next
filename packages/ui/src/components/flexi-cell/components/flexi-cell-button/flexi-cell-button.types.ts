import { IconProps } from '../../../../components/icon/icon.types.js';
import { type ButtonProps } from '../../../../components/index.js';

export type FlexiCellButtonProps = {
  /**
   * Icon to render
   */
  icon?: (props: IconProps) => JSX.Element;
} & Omit<ButtonProps, 'iconBefore' | 'iconAfter'>;
