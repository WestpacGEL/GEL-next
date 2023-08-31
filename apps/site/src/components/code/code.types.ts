import { ReactNode } from 'react';

export type CodeProps = {
  children?: ReactNode;
  className?: string;
  language?: string;
  live?: boolean;
  showCode?: boolean;
};
