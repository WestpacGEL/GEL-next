import { clsx } from 'clsx';

export function CircleLogo({ className, children }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={clsx(
        'flex h-12 w-12 items-center justify-center rounded-full bg-white outline outline-1 outline-[#CFD8DC] hover:outline-4 hover:outline-[#1976D260]',
        className,
      )}
    >
      {children}
    </span>
  );
}
