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

type ContentProps = {
  id: string;
  setPrimaryTitle: (title: string) => unknown;
  setSecondaryTitle: (title: string) => unknown;
  setTertiaryTitle: (title: string) => unknown;
};
