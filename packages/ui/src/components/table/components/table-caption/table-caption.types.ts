import { HTMLAttributes, ReactNode } from 'react';

export type TableCaptionProps = {
  /**
   * Table caption content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLTableCaptionElement>;
