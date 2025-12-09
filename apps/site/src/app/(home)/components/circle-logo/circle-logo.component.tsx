import { clsx } from 'clsx';
import { ReactNode } from 'react';

export function CircleLogo({ className, children }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        `
          flex size-12 items-center justify-center rounded-full
          bg-background-white outline outline-gel-border transition-all
          hover:outline-4 hover:outline-gel-icon/40
        `,
        className,
      )}
    >
      {children}
    </span>
  );
}
