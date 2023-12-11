import { clsx } from 'clsx';

import { type ComponentTitle } from './component-title.types';

export function ComponentTitle({ children, className }: ComponentTitle) {
  return <p className={clsx('typography-body-10 mb-[0.875rem] italic text-muted', className)}>{children}</p>;
}
