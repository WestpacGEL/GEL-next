import { ComponentType } from 'react';

import { IconProps } from '../../../../../icon/index.js';

export type MenuItemContentProps = {
  /** The icon shown before the label. */
  icon: ComponentType<IconProps>;
  /** The menu item's label text. */
  label: string;
};
