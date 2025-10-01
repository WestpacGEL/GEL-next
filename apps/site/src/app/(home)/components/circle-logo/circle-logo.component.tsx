import { clsx } from 'clsx';
import { ReactNode } from 'react';

export function CircleLogo({ className, children }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'bg-background-white-pale outline-gel-border hover:outline-gel-icon/40 flex size-12 items-center justify-center rounded-full outline outline-1 transition-all hover:outline-4',
        className,
      )}
    >
      {children}
    </span>
  );
}
