import { HTMLAttributes } from 'react';

export type PanelProps = {
  /**
   * The heading of the panel
   */
  heading: string;
  /**
   * Tag for heading defaults to h1
   * @default h1
   */
  headingTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * The styling of the panel
   * @default hero
   */
  look?: 'faint' | 'hero';
} & HTMLAttributes<Element>;
