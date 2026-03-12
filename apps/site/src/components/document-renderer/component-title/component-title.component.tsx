import { clsx } from 'clsx';

import { type ComponentTitle as ComponentTitleProps } from './component-title.types';

export function ComponentTitle({ children, className }: ComponentTitleProps) {
  return <p className={clsx(`mb-[0.875rem] typography-body-10 text-text-muted italic`, className)}>{children}</p>;
}
