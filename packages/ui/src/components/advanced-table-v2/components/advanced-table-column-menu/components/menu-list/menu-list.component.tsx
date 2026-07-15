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
      {[...state.collection].map(item => {
        if (item.type === 'section') return <MenuSection key={item.key} section={item} state={state} />;

        if (item.key === 'filter')
          return (
            <li key={item.key} className={styles.filterItem()} role="none">
              {item.rendered}
            </li>
          );

        return <MenuItem key={item.key} item={item} state={state} />;
      })}
    </ul>
  );
}) as <T extends object>(props: MenuListProps<T> & { ref?: React.Ref<HTMLUListElement> }) => React.ReactElement;
