import { HTMLAttributes, ReactNode } from 'react';

export type CompactaProps = {
  /**
   * Text for add button
   */
  addText?: string;
  /**
   * Component to repeat
   */
  children: (...props: ContentProps[]) => ReactNode;
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & Omit<HTMLAttributes<Element>, 'children'>;

type ContentProps = {
  id: string;
  setPrimaryTitle: (title: string) => unknown;
  setSecondaryTitle: (title: string) => unknown;
  setTertiaryTitle: (title: string) => unknown;
};
