import { CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './flexi-cell.styles.js';

type BaseFlexiCellProps = {
  /**
   * Renders an element on the right
   */
  after?: ReactNode;
  /**
   * Renders an element on the top right corner
   */
  badge?: ReactNode;
  /**
   * zIndex for badge
   */
  badgeZIndex?: CSSProperties['zIndex'];
  /**
   * Renders an element on the left
   */
  before?: ReactNode;
  /**
   * Injects the FlexiCell.Body inside of the children
   */
  body?: boolean;
  /**
   * the middle content of FlexiCell
   */
  children?: ReactNode;
  /**
   * href in case it is an "a" tag
   */
  href?: string;
  /**
   * The native tag that flexicell will be rendered
   */
  tag?: keyof JSX.IntrinsicElements;
  /**
   * Adds an arrow on top right
   */
  withArrow?: boolean;
  /**
   * Adds a border radius and a border
   */
  withBorder?: boolean;
  /**
   * With hover style
   */
  withHoverEffect?: boolean;
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

type FlexiCellAsAllOtherTagsProps<Tag> = {
  href?: never;
  tag?: Tag;
};

export type FlexiCellProps<
  Tag extends keyof Omit<JSX.IntrinsicElements, 'a'> = keyof Omit<JSX.IntrinsicElements, 'a'>,
> = (FlexiCellAsLinkProps | FlexiCellAsAllOtherTagsProps<Tag>) &
  BaseFlexiCellProps &
  VariantProps<typeof styles> &
  HTMLAttributes<Element>;
