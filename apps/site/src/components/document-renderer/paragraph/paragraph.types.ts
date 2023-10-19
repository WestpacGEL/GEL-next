import { ReactNode } from 'react';

export type ParagraphProps = {
  children: ReactNode;
  className?: string;
  textAlign?: 'center' | 'end' | undefined;
};
