import { ButtonHTMLAttributes } from 'react';
import { AriaToggleButtonGroupProps, Key } from 'react-aria';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { type ButtonProps } from '../button/index.js';

import { styles } from './components/button-group-button/button-group-button.styles.js';

type Variants = VariantProps<typeof styles>;

type BaseButtonGroupProps = {
  children: React.ReactNode;
  /**
   * Controls look of `Button` components, can't be applied directly to `Button`
   */
  look?: ResponsiveVariants<'hero' | 'primary'>;
  /**
   * Sets whether buttons fill the entire box they are located in
   */
  block?: ResponsiveVariants<Variants['block']>;
  /**
   * size
   */
  size?: ButtonProps['size'];
} & Omit<AriaToggleButtonGroupProps, 'selectionMode' | 'defaultSelectedKeys' | 'selectedKeys' | 'onSelectionChange'> &
  ButtonHTMLAttributes<Element>;

type ButtonGroupPropsPerSelectionMode = {
  single: BaseButtonGroupProps & {
    selectionMode?: 'single';
    selectedKeys?: Key;
    defaultSelectedKeys?: Key;
    /** Handler that is called when the selection changes. */
    onSelectionChange?: (key: Key) => void;
    batata?: string;
  };
  multiple: BaseButtonGroupProps & {
    selectionMode: 'multiple';
    selectedKeys?: Iterable<Key>;
    defaultSelectedKeys?: Iterable<Key>;
    /** Handler that is called when the selection changes. */
    onSelectionChange?: (keys: Set<Key>) => void;
  };
};

type SelectionModes = keyof ButtonGroupPropsPerSelectionMode;

export type ButtonGroupProps<T extends SelectionModes = SelectionModes> = ButtonGroupPropsPerSelectionMode[T];
