import { ReactNode } from 'react';

export type CodeProps = {
  children?: ReactNode;
  className?: string;
  enableLiveCode?: boolean;
  language?: string;
  live?: boolean;
  showCode?: boolean;
  showResponsiveDemo?: boolean;
};
