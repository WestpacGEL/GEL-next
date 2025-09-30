import { HTMLAttributes, ReactNode } from 'react';
import { DisclosureProps } from 'react-stately';

export type CompactaItemProps<T = HTMLElement> = {
  /**
   * The position of this item within a list or sequence.
   */
  index?: number;
  /**
   * Delay (in milliseconds) before the item’s animation starts.
   */
  delay?: number;
  /**
   * The content to be rendered inside the item.
   */
  children: ReactNode;
  /**
   * The HTML heading tag used for the primary title.
   * @default h3
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Callback triggered when the item is removed.
   */
  onRemove?: () => unknown;
  /**
   * Title content for the item, supporting multiple levels of hierarchy.
   */
  title?: {
    /**
     * The primary (main) title text.
     */
    primary?: string;

    /**
     * The secondary (subtitle) text.
     */
    secondary?: string;

    /**
     * The tertiary (supplementary) text.
     */
    tertiary?: string;
  };
  /**
   * Whether the item should be expanded when first rendered.
   */
  expandOnMount?: boolean;
} & DisclosureProps &
  Omit<HTMLAttributes<Element>, 'children' | 'title'>;
