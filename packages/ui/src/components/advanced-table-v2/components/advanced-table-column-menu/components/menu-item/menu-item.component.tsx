import { useRef } from 'react';
import { mergeProps, useFocusRing, useMenuItem } from 'react-aria';

import { styles as menuItemStyles } from './menu-item.styles.js';
import { MenuItemProps } from './menu-item.types.js';

export function MenuItem<T>({ item, state }: MenuItemProps<T>) {
  const ref = useRef(null);
  const { menuItemProps } = useMenuItem({ key: item.key }, state, ref);
  const { isFocusVisible, focusProps } = useFocusRing();
  const styles = menuItemStyles({ isFocusVisible });
  return (
    <li {...mergeProps(menuItemProps, focusProps)} ref={ref} className={styles.item()}>
      {item.rendered}
    </li>
  );
}
