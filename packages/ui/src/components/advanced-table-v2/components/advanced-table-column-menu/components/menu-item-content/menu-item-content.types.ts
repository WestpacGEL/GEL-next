import { ComponentType } from 'react';

import { IconProps } from '../../../../../icon/index.js';

export type MenuItemContentProps = {
  icon: ComponentType<IconProps>;
  label: string;
};
