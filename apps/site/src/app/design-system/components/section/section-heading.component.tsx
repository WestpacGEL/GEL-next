import { ReactNode } from 'react';

export function SectionHeading({ children }: { children: ReactNode }) {
  return <h2 className="typography-body-6 mb-2 font-bold sm:mb-3">{children}</h2>;
}
