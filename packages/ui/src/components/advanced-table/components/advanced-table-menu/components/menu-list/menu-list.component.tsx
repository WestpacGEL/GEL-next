import { forwardRef, useRef } from 'react';
import { AriaMenuProps, useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';

import { MenuItem } from '../menu-item/menu-item.component.js';
import { MenuSection } from '../menu-section/menu-section.component.js';

type MenuListProps<T extends object> = Partial<Pick<AriaMenuProps<T>, 'children'>> & Omit<AriaMenuProps<T>, 'children'>;

export const MenuList = forwardRef(function MenuList<T extends object>(
  props: MenuListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
) {
  const state = useTreeState(props);

  const internalRef = useRef<HTMLUListElement>(null);
  const ref = (forwardedRef ?? internalRef) as React.RefObject<HTMLUListElement>;
  const { menuProps: ariaMenuProps } = useMenu(props, state, ref);

  return (
    <ul {...ariaMenuProps} ref={ref} className="flex flex-col gap-1">
      {[...state.collection].map(item => {
        if (item.type === 'section') return <MenuSection key={item.key} section={item} state={state} />;

        if (item.key === 'filter')
          return (
            <li key={item.key} className="p-2" role="none">
              {item.rendered}
            </li>
          );

        return <MenuItem key={item.key} item={item} state={state} />;
      })}
    </ul>
  );
}) as <T extends object>(props: MenuListProps<T> & { ref?: React.Ref<HTMLUListElement> }) => React.ReactElement;
