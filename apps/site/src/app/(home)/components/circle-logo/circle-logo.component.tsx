import { clsx } from 'clsx';

export function CircleLogo({ className, children }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'flex size-12 items-center justify-center rounded-full bg-white outline outline-1 outline-gel-border transition-all hover:outline-4 hover:outline-gel-icon/40',
        className,
      )}
    >
      {children}
    </span>
  );
}
