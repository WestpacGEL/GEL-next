import clsx from 'clsx';
import { type HTMLAttributes, type ReactNode } from 'react';

type LeadTextProps = {
  /**
   * Children attributes
   */
  children: ReactNode;
} & HTMLAttributes<HTMLOrSVGElement>;

export function LeadText({ children, className, ...props }: LeadTextProps) {
  return (
    <p className={clsx('pt-4 typography-body-9 text-text-heading max-md:pt-3', className)} {...props}>
      {children}
    </p>
  );
}
