import clsx from 'clsx';
import { ReactNode } from 'react';

export function SectionHeading({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={clsx(
        `
          mb-2 typography-body-6 font-bold text-text-heading
          sm:mb-3
        `,
        className,
      )}
    >
      {children}
    </h2>
  );
}
