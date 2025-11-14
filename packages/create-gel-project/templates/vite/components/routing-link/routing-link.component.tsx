'use client';

import { Link as GELLink, type LinkProps as GELLinkProps } from '@westpac/ui';
import { Link } from 'react-router';

type RoutingLinkProps = Omit<GELLinkProps, 'href'> & { href: string };

export function RoutingLink({
  children,
  to,
  ...props
}: Omit<RoutingLinkProps, 'linkComponent' | 'href'> & { to: string }) {
  return (
    <GELLink linkComponent={RoutingLinkBase} href={to} {...props}>
      {children}
    </GELLink>
  );
}

function RoutingLinkBase({ href, children, ...props }: RoutingLinkProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
