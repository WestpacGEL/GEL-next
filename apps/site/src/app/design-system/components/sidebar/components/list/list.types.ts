import { type IconProps } from '@westpac/ui';

import { NavItem } from '../../sidebar.component';

export type ListProps = {
  brand?: string;
  items: NavItem[];
} & IconProps;
