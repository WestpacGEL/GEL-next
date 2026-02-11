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
  /**
   * The initial compactas to render. Each compacta needs a unique id if you want to pre-fill values.
   * Each object contained within the array represents a compacta.
   */
  initialCompactas?: {
    // Compacta id
    id?: string;
    // Titles to pre-fill, won't be done automatically
    title?: { primary?: string; secondary?: string; tertiary?: string };
  }[];
  /**
   * Tag for primary title
   * @default h3
   */
  titleTag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
} & Omit<HTMLAttributes<Element>, 'children'>;

type ContentProps = {
  id: string;
  setPrimaryTitle: (title: string) => unknown;
  setSecondaryTitle: (title: string) => unknown;
  setTertiaryTitle: (title: string) => unknown;
};
