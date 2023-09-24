import { type HTMLAttributes, type ReactNode } from 'react';
import { type VariantProps } from 'tailwind-variants';

import { styles } from './flexi-cell-body.styles.js';

export type BaseFlexiCellBodyProps = {
  /**
   * Children attributes
   */
  children: ReactNode;
  /**
   * href value
   */
  href?: string;
  /**
   * Component tag
   */
  tag?: keyof JSX.IntrinsicElements;
} & HTMLAttributes<HTMLOrSVGElement>;

type FlexiCellBodyAsLinkProps = {
  /**
   * The href for the link
   */
  href: string;
  /**
   * The native tag that the circle will be rendered as
   */
  tag: 'a';
};

type CircleAsAllOtherTagsProps<Tag> = {
  href?: never;
  tag?: Tag;
};

type ElementKeysWithoutA = keyof Omit<JSX.IntrinsicElements, 'a'>;

export type FlexiCellBodyProps<Tag extends ElementKeysWithoutA = ElementKeysWithoutA> = (
  | FlexiCellBodyAsLinkProps
  | CircleAsAllOtherTagsProps<Tag>
) &
  BaseFlexiCellBodyProps &
  VariantProps<typeof styles>;
