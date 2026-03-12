import { clsx } from 'clsx';
import { ReactNode } from 'react';

export function Body({ className, children }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        `
          typography-body-10
          [&_p]:mb-2
        `,
        className,
      )}
    >
      {children}
    </div>
  );
}
