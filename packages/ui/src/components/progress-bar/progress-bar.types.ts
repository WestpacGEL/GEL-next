import { AriaProgressBarProps } from 'react-aria';

export type ProgressBarProps = {
  /**
   * Classname for overriding base style
   */
  className?: string;
  /**
   * look of bar
   */
  look?: 'default' | 'skinny';
  /**
   * Whether or not label shows on default bar
   */
  noLabel?: boolean;
  /**
   * The progress bar value as a percentage. Decimal numbers are rounded.
   */
  value?: number;
} & Pick<AriaProgressBarProps, 'aria-label' | 'aria-describedby' | 'aria-details' | 'aria-labelledby' | 'id'>;
