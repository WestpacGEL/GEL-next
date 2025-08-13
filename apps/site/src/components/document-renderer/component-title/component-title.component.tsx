import { clsx } from 'clsx';

import { type ComponentTitle as ComponentTitleProps } from './component-title.types';

export function ComponentTitle({ children, className }: ComponentTitleProps) {
  return <p className={clsx('typography-body-10 mb-3.5 italic text-text-muted', className)}>{children}</p>;
}
