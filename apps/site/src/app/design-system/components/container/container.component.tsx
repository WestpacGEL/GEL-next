import { type ContainerProps, Container as GELContainer } from '@westpac/ui/grid';
import { clsx } from 'clsx';

export function Container({ className, ...props }: ContainerProps) {
  return <GELContainer className={clsx('max-w-gel-container', className)} {...props} />;
}
