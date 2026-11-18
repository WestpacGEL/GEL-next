import { type ReactNode } from 'react';
import { VariantProps } from 'tailwind-variants';

import { BadgeProps } from '../index.js';

import { styles } from './flexi-cell.styles.js';

import type { ResponsiveVariants } from '../../types/responsive-variants.types.js';

type Variants = VariantProps<typeof styles>;

type BaseFlexiCellProps = {
  /**
   * Renders an element on the right
   */
  after?: ReactNode;
  /**
   * Renders an element on the left
   */
  before?: ReactNode;
  /**
   * Wraps everything into FlexiCellBody
   */
  body?: boolean;
  /**
   * the middle content of FlexiCell
   */
  children?: ReactNode;
  /**
   * Sets tabIndex to -1 to make untabbable when disabled
   */
  disabled?: boolean;
  /**
   * Large adds more padding/spacing to the Flex Cell
   * @default default
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * Renders badge in top right corner based on provided string
   */
  topBadge?: (props: BadgeProps) => JSX.Element;
  /**
   * Adds an arrow on top right
   */
  withArrow?: boolean;
  /**
   * Adds a border radius and a border
   * @default false
   */
  withBorder?: ResponsiveVariants<boolean>;
};

type FlexiCellNormalProps<C extends React.ElementType> = BaseFlexiCellProps & {
  tag?: C;
  dualAction?: false;
} & NoInfer<Omit<React.ComponentPropsWithoutRef<C>, keyof BaseFlexiCellProps | 'tag' | 'dualAction'>> &
  ([C] extends ['div']
      ? {
          // Only the default element can omit tag.
          tag?: 'div';
          href?: never;
        }
      : {tag: C});

type DualActionFlexiCellProps = BaseFlexiCellProps & {
  dualAction: true;
  href: string;
  tag?: never;
} & Omit<React.ComponentPropsWithoutRef<'div'>,
    keyof BaseFlexiCellProps | 'tag' | 'dualAction' | 'href'>

export type FlexiCellProps<
  C extends React.ElementType = 'div'
> = FlexiCellNormalProps<C> | DualActionFlexiCellProps;

type PolymorphicRef<C extends React.ElementType> = 
  C extends keyof JSX.IntrinsicElements
  ? React.Ref<HTMLElement>
  : 'ref' extends keyof React.ComponentPropsWithRef<C>
  ? React.ComponentPropsWithRef<C>['ref']
  : never;

export type FlexiCellImplementationProps =
BaseFlexiCellProps & {
  tag?: React.ElementType;
  className?: string;
  tabIndex?: number;
  dualAction?: boolean;
  href?: unknown;
} & Record<string, unknown>

export type FlexiCellComponent = {
  <C extends React.ElementType = 'div'>(
    props: C extends unknown
      ? FlexiCellNormalProps<C> & {
        ref?: PolymorphicRef<C>;
      } : never,
  ): React.ReactElement | null;
  (
    props: DualActionFlexiCellProps & {
      ref?: PolymorphicRef<'div'>;
    },
  ): React.ReactElement | null;
  displayName?: string;
}
