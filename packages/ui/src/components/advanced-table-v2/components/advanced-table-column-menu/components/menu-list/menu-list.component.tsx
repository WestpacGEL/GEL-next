import { forwardRef, useRef } from 'react';
import { useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';

import { MenuItem } from '../menu-item/menu-item.component.js';
import { MenuSection } from '../menu-section/menu-section.component.js';

import { styles as menuListStyles } from './menu-list.styles.js';
import { MenuListProps } from './menu-list.types.js';

export const MenuList = forwardRef(function MenuList<T extends object>(
  props: MenuListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
) {
  const state = useTreeState(props);

  const internalRef = useRef<HTMLUListElement>(null);
  const ref = (forwardedRef ?? internalRef) as React.RefObject<HTMLUListElement>;
  const { menuProps: ariaMenuProps } = useMenu(props, state, ref);

  const styles = menuListStyles();

  return (
    <ul {...ariaMenuProps} ref={ref} className={styles.list()}>
      {/* Every top-level item in this menu is wrapped in a Section (see
          advanced-table-column-menu.component.tsx) — the raw-item filter
          special-case lives in MenuSection, which is where it's reachable. */}
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <MenuSection key={item.key} section={item} state={state} />
        ) : (
          <MenuItem key={item.key} item={item} state={state} />
        ),
      )}
    </ul>
  );
}) as <T extends object>(props: MenuListProps<T> & { ref?: React.Ref<HTMLUListElement> }) => React.ReactElement;
