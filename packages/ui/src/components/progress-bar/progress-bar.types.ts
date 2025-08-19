import { ReactNode } from 'react';
import { AriaProgressBarProps } from 'react-aria';

export type ProgressBarProps = {
  /**
   * Classname for overriding base style
   */
  className?: string;
  /**
   * look of bar
   * @default default
   */
  look?: 'default' | 'skinny';
  /**
   * Whether or not label shows on default bar
   * @default false
   */
  noLabel?: boolean;
  /**
   * The progress bar value as a percentage. Decimal numbers are rounded.
   * @default 0
   */
  value?: number;
  /**
   * The progress bar text inside
   */
  children?: ReactNode;
} & Pick<AriaProgressBarProps, 'aria-label' | 'aria-describedby' | 'aria-details' | 'aria-labelledby' | 'id'>;
