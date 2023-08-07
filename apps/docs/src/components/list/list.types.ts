import { type IconProps } from '@westpac/ui';

import { NavItem } from '../layout/sidebar';

export type ListProps = {
  brand?: string;
  items: NavItem[];
} & IconProps;
