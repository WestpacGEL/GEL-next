import { ReactNode } from 'react';

export type HeadingProps = {
  children: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  textAlign?: 'center' | 'end' | 'left';
};
