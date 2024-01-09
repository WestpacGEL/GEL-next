import { GridContainer as GELContainer, type GridContainerProps } from '@westpac/ui/grid';
import { clsx } from 'clsx';

export function Container({ className, ...props }: GridContainerProps) {
  return <GELContainer className={clsx('max-w-gel-container', className)} {...props} />;
}
