import { forwardRef, useRef } from 'react';
import { useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';

import { MenuItem } from '../menu-item/menu-item.component.js';
import { MenuSection } from '../menu-section/menu-section.component.js';

import { styles as menuListStyles } from './menu-list.styles.js';
import { MenuListProps } from './menu-list.types.js';

export const MenuList = forwardRef(function MenuList<T extends object>(
  props: MenuListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
) {
  const state = useTreeState(props);

  const internalRef = useRef<HTMLDivElement>(null);
  const ref = (forwardedRef ?? internalRef) as React.RefObject<HTMLDivElement>;
  const { menuProps: ariaMenuProps } = useMenu(props, state, ref);

  const styles = menuListStyles();

  return (
    <div {...ariaMenuProps} ref={ref} className={styles.list()}>
      {[...state.collection].map(item =>
        item.type === 'section' ? (
          <MenuSection key={item.key} section={item} state={state} />
        ) : (
          <MenuItem key={item.key} item={item} state={state} />
        ),
      )}
    </div>
  );
}) as <T extends object>(props: MenuListProps<T> & { ref?: React.Ref<HTMLDivElement> }) => React.ReactElement;
