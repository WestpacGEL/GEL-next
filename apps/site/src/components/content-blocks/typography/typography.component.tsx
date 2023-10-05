import { clsx } from 'clsx';
import NextLink, { LinkProps } from 'next/link';

export function Heading({ id, className, children }: { children?: React.ReactNode; className?: string; id?: string }) {
  return (
    <h2
      id={id}
      {...(id && { tabIndex: -1 })}
      className={clsx(
        'typography-body-7 mb-2 scroll-mt-[10.875rem] font-bold sm:typography-body-6 sm:mb-3 sm:scroll-mt-[13.5rem]',
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SubHeading({ children }: { children?: React.ReactNode }) {
  return <h3 className="typography-body-8 my-2 font-bold">{children}</h3>;
}

export function Text({ children }: { children?: React.ReactNode }) {
  return <p className="typography-body-9 mb-2 leading-[2]">{children}</p>;
}

export function Link(props: React.PropsWithChildren<LinkProps>) {
  return <NextLink className="text-primary underline" {...props} />;
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className="bg-white px-[0.1875rem]">{children}</code>;
}
