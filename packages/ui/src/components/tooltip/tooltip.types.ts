import { ReactNode } from 'react';
import { TooltipContentProps } from './components/tooltip-content/tooltip-content.types.js';

export type TooltipProps = {
  children: ReactNode;
  disabled?: boolean;
  tooltip: string;
  id?: string;
  className?: string;
  position?: TooltipContentProps['position'];
};
