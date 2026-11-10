import { ReactNode } from 'react';
import { AriaBreadcrumbItemProps } from 'react-aria';

export type BaseBreadcrumbItemProps = {
  /**
   * BreadCrumbItem body content
   */
  children?: ReactNode;
  /**
   * Classname for overriding base style
   */
  className?: string;
  /**
   * isCurrent flag
   * @default false
   */
  isCurrent?: boolean;
  /**
   * isDisabled flag
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Specifies DOM element rendered by a custom component
   * Required when the custom component does not render an '<a>' element
   * @default 'a'
   */
  elementType?: AriaBreadcrumbItemProps['elementType'];
} & Omit<AriaBreadcrumbItemProps, 'children' | 'elementType' | 'href' | 'isCurrent' | 'isDisabled'>;

export type BreadcrumbItemRef<C extends React.ElementType = 'span'> = React.ComponentRef<C>;

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref'];

export type BreadcrumbItemProps<C extends React.ElementType = 'span'> = BaseBreadcrumbItemProps & {
  /**
   * Type to render
   * @default span
   */
  tag?: C;
} & Omit<React.ComponentPropsWithoutRef<C>, keyof BaseBreadcrumbItemProps | 'tag'>;

export type BreadcrumbItemImplementationProps = BaseBreadcrumbItemProps & {
  className?: string;
  href?: unknown;
  tag?: React.ElementType;
} & Record<string, unknown>;

export type BreadcrumbItemComponent = <C extends React.ElementType = 'span'>(
  props: BreadcrumbItemProps<C> & { ref?: PolymorphicRef<C> },
) => React.ReactElement | null;
