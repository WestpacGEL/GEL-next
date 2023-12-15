import { HTMLAttributes } from 'react';

export type FilterButtonProps = {
  /**
   * id for the button used for the key and knowing which button is selected
   */
  id: string;
  /**
   * The text that displays on the button and used in aria-label
   */
  text: string;
};

export type ButtonsProps = {
  /**
   * An array of FilterButtonProps that generate buttons for the filter
   * - id: used to identify selected button and for key `string`
   * - text: text on the button `string`
   */
  filterButtons: FilterButtonProps[];
  /**
   * Function that is called when a button on the filter is clicked
   */
  onClick: (id: string) => unknown;
  /**
   * Needed for custom `aria-description`, number of results filter returns
   */
  resultsFound: number;
  /**
   * id of which button should be selected
   */
  selectedButton: string;
  /**
   * Tag to render
   */
  tag?: keyof JSX.IntrinsicElements;
} & Omit<HTMLAttributes<Element>, 'onClick'>;
