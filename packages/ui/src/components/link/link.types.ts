import { ReactNode } from 'react';
import { AriaLinkOptions } from 'react-aria';

import { IconProps } from '../icon/index.js';

export type BaseLinkProps = {
  /**
   * Link text or component
   */
  children?: ReactNode;
  /**
   * Classname for overriding base style
   */
  className?: string;
  /**
   * Places an icon within the button, after the button’s text
   */
  iconAfter?: (props: IconProps) => JSX.Element;
  /**
   * Places an icon within the button, before the button’s text
   */
  iconBefore?: (props: IconProps) => JSX.Element;
  /**
   * set size of icon
   * @default small
   */
  iconSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  /**
   * Link type
   * @default standalone
   */
  type?: 'inline' | 'standalone';
  /**
   * Visually style the (inline) link with an underline
   * @default true
   */
  underline?: boolean;
} & Omit<AriaLinkOptions, 'elementType' | 'href' | 'isDisabled'>;

export type LinkRef<C extends React.ElementType = 'a'> = React.ComponentRef<C>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type LinkProps<C extends React.ElementType = 'a'> = BaseLinkProps & {
  /**
   * Type to render
   * @default a
   */
  tag?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof BaseLinkProps | 'tag'>;

export type LinkImplementationProps = BaseLinkProps & {
  className?: string;
  href?: unknown;
  tag?: React.ElementType;
} & Record<string, unknown>;

export type LinkComponent = <C extends React.ElementType = 'a'>(
  props: LinkProps<C> & { ref?: PolymorphicRef<C> },
) => React.ReactElement | null;
