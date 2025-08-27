import { clsx } from 'clsx';

import { type DividerProps } from './divider.types';

export const Divider = ({ className }: DividerProps) => {
  return <hr className={clsx('border-border-muted my-7 xsl:my-10', className)} />;
};
