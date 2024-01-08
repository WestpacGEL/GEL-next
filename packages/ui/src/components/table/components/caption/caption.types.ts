import { HTMLAttributes, ReactNode } from 'react';

export type CaptionProps = {
  /**
   * Table caption content
   */
  children?: ReactNode;
} & HTMLAttributes<HTMLTableCaptionElement>;
