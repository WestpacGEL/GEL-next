import { ReactNode } from 'react';

export type TooltipProps = {
  children: ReactNode;
  tooltip: string;
  id?: string;
  className?: string;
};
