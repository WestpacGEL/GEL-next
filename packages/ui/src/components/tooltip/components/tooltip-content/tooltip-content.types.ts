import { ReactNode } from 'react';

export type TooltipContentProps = {
  children?: ReactNode;
  id: string;
  position?: 'top' | 'bottom';
};
