import { type HTMLAttributes, type ReactNode } from 'react';
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
   * Wraps body with an 'a' tag for dual action styled component
   * - Requires href to be provided
   * - Tag prop should not be used when using this prop
   * @default false
   */
  dualAction?: boolean;
  /**
   * href in case it is an "a" tag or dualAction
   */
  href?: string;
  /**
   * Large adds more padding/spacing to the Flex Cell
   * @default default
   */
  size?: ResponsiveVariants<Variants['size']>;
  /**
   * The native tag that flexicell will be rendered
   * @default div
   */
  tag?: keyof JSX.IntrinsicElements;
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
} & HTMLAttributes<HTMLOrSVGElement>;

type FlexiCellAsLinkProps = {
  /**
   * The href for the link
   */
  href: string;
  /**
   * The native tag that the circle will be rendered as
   */
  tag: 'a';
};

type DualActionFlexiCellProps = {
  /**
   * The native tag that the circle will be rendered as
   */
  dualAction: true;
  /**
   * The href for the link
   */
  href: string;
};

type FlexiCellAsAllOtherTagsProps<Tag> = {
  href?: never;
  tag?: Tag;
};

export type FlexiCellProps<
  Tag extends keyof Omit<JSX.IntrinsicElements, 'a'> = keyof Omit<JSX.IntrinsicElements, 'a'>,
> = (FlexiCellAsLinkProps | DualActionFlexiCellProps | FlexiCellAsAllOtherTagsProps<Tag>) &
  BaseFlexiCellProps &
  HTMLAttributes<Element>;
