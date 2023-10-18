import NextLink, { LinkProps } from 'next/link';

export function Text({ children }: { children?: React.ReactNode }) {
  return <p className="typography-body-9 mb-2 leading-[2]">{children}</p>;
}

export function Link(props: React.PropsWithChildren<LinkProps>) {
  return <NextLink className="text-primary underline" {...props} />;
}

export function Code({ children }: { children?: React.ReactNode }) {
  return <code className="bg-white px-[0.1875rem]">{children}</code>;
}
