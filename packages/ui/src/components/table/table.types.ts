import { HTMLAttributes } from 'react';

export type TableProps = {
  /**
   * Whether the table should have borders around every cell and the table
   */
  bordered?: boolean;
  /**
   * Whether the table should have even rows with a different background color
   */
  striped?: boolean;
} & HTMLAttributes<HTMLTableElement>;

export type TableContextState = {
  /**
   * bordered
   */
  bordered?: boolean;
  /**
   * striped
   */
  striped?: boolean;
};
