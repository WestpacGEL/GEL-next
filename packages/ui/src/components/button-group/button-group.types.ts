import { ButtonHTMLAttributes } from 'react';
import { AriaToggleButtonGroupProps, Key } from 'react-aria';
import { VariantProps } from 'tailwind-variants';

import { ResponsiveVariants } from 'src/types/responsive-variants.types.js';

import { type ButtonProps } from '../button/index.js';

import { styles } from './components/button-group-button/button-group-button.styles.js';

type Variants = VariantProps<typeof styles>;

type BaseButtonGroupProps = {
  /**
   * The `ButtonGroupButton` components displayed within the group
   */
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
    /**
     * Determines whether one or multiple buttons can be selected
     */
    selectionMode?: 'single';
    /**
     * The currently selected button key(s). Providing this prop controls the group's selection
     */
    selectedKeys?: Key;
    /**
     * The initially selected button key(s) when the group is uncontrolled
     */
    defaultSelectedKeys?: Key;
    /** Handler that is called when the selection changes. */
    onSelectionChange?: (key: Key) => void;
    batata?: string;
  };
  multiple: BaseButtonGroupProps & {
    /**
     * Determines whether one or multiple buttons can be selected
     */
    selectionMode: 'multiple';
    /**
     * The currently selected button key(s). Providing this prop controls the group's selection
     */
    selectedKeys?: Iterable<Key>;
    /**
     * The initially selected button key(s) when the group is uncontrolled
     */
    defaultSelectedKeys?: Iterable<Key>;
    /** Handler that is called when the selection changes. */
    onSelectionChange?: (keys: Set<Key>) => void;
  };
};

type SelectionModes = keyof ButtonGroupPropsPerSelectionMode;

export type ButtonGroupProps<T extends SelectionModes = SelectionModes> = ButtonGroupPropsPerSelectionMode[T];
