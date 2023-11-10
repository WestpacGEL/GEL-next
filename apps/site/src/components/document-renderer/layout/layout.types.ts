import { ReactElement } from 'react';

export type LayoutProps = {
  children: ReactElement[];
  layout: [number, ...number[]];
};
