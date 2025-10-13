import clsx from 'clsx';
import { ReactNode } from 'react';

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={clsx('typography-body-6 text-text-heading mb-2 font-bold sm:mb-3', className)}>{children}</h2>;
}
