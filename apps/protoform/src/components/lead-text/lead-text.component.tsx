import clsx from 'clsx';
import { HTMLAttributes, ReactNode } from 'react';

type LeadTextProps = {
  /**
   * Children attributes
   */
  children: ReactNode;
} & HTMLAttributes<HTMLOrSVGElement>;

export function LeadText({ children, className, ...props }: LeadTextProps) {
  return (
    <p className={clsx('typography-body-9 text-text-heading pt-4 max-md:pt-3', className)} {...props}>
      {children}
    </p>
  );
}
