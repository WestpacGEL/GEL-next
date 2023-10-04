import { HTMLAttributes } from 'react';

export type RepeaterProps = {
  /**
   * Text for add button
   */
  addText?: string;
  /**
   * Component to repeat
   */
  children: React.ReactNode;
  /**
   * Index heading tag to use for index on separator version
   */
  indexTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * Enable separator version
   */
  separator?: boolean;
} & HTMLAttributes<Element>;
