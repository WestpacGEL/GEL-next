'use client';

import { ListItem, type ListItemProps } from '@westpac/ui';
import { Link } from 'react-router';

type RoutingListItemProps = Omit<ListItemProps, 'href'> & { href: string };

export function RoutingListItem({
  children,
  to,
  ...props
}: Omit<RoutingListItemProps, 'linkComponent' | 'href'> & { to: string }) {
  return (
    <ListItem linkComponent={RoutingListItemBase} href={to} {...props}>
      {children}
    </ListItem>
  );
}

function RoutingListItemBase({ href, children, ...props }: RoutingListItemProps) {
  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  );
}
