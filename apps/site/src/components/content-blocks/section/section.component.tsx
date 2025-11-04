import { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

const styles = tv({
  base: `
    border-t border-t-border-muted-soft py-7
    sm:py-10
  `,
});

export function Section({ className, children }: { children?: ReactNode; className?: string }) {
  return <section className={styles({ className })}>{children}</section>;
}
