import { HTMLAttributes } from 'react';

export type CompactaProps = {
  /**
   * on add callback
   */
  onAdd?: () => unknown;
  /**
   * Add text
   */
  addText?: string;
} & HTMLAttributes<Element>;
