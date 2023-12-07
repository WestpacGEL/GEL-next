import { clsx } from 'clsx';

import { type DividerProps } from './divider.types';

export const Divider = ({ className }: DividerProps) => {
  return <hr className={clsx('my-10 border-border', className)} />;
};
