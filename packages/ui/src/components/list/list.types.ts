import { HTMLAttributes, ReactNode } from 'react';

import { IconProps } from '../icon/index.js';

export type ListProps = {
  /**
   * Visually hidden text to use for the tick or cross list.
   *
   * Tick list default value: "The following items are ticked"
   */
  assistiveText?: string;
  /**
   * <ListItem /> ReactNodes
   */
  children?: ReactNode;
  /**
   * The icon for list
   */
  icon?: (props: IconProps) => JSX.Element;
  /**
   * The look of the bullet, icon, tick and cross lists
   */
  look?: 'primary' | 'hero' | 'neutral' | 'success' | 'danger' | 'link';
  /**
   * The level of nesting
   */
  nested?: number;
  /**
   * The size of space between list elements
   */
  spacing?: 'medium' | 'large';
  /**
   * The type of the bullet
   */
  type?: 'bullet' | 'link' | 'tick' | 'cross' | 'unstyled' | 'icon' | 'ordered';
} & HTMLAttributes<Element>;

export type ListContextState = {
  /**
   * The icon for list
   */
  icon?: (props: IconProps) => JSX.Element;
  /**
   * The look of the bullet, icon, tick and cross lists
   */
  look?: 'primary' | 'hero' | 'neutral' | 'success' | 'danger' | 'link';
  /**
   * The level of nesting
   */
  nested?: number;
  /**
   * The size of space between list elements
   */
  spacing?: 'medium' | 'large';
  /**
   * The type of the bullet
   */
  type?: 'bullet' | 'link' | 'tick' | 'cross' | 'unstyled' | 'icon' | 'ordered';
};

export type GetStateValuesProps = {
  /**
   * The icon for list
   */
  icon?: (props: IconProps) => JSX.Element;
  /**
   * The look of the bullet, icon, tick and cross lists
   */
  look?: 'primary' | 'hero' | 'neutral' | 'success' | 'danger' | 'link';
  /**
   * The level of nesting
   */
  nested?: number;
  /**
   * The size of space between list elements
   */
  spacing?: 'medium' | 'large';
  /**
   * List State
   */
  state: ListContextState;
  /**
   * The type of the bullet
   */
  type?: 'bullet' | 'link' | 'tick' | 'cross' | 'unstyled' | 'icon' | 'ordered';
};
