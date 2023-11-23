import { clsx } from 'clsx';

export function Body({ className, children }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('typography-body-10 [&_p]:mb-2', className)}>{children}</div>;
}
