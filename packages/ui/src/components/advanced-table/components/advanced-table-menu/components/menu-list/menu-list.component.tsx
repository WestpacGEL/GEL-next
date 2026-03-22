import { forwardRef, useRef } from 'react';
import { AriaMenuProps, useMenu } from 'react-aria';
import { RootMenuTriggerState, useTreeState } from 'react-stately';

import { DialogSubmenuTriggerItem } from '../dialog-submenu-trigger-item/dialog-submenu-trigger-item.component.js';
import { MenuItem } from '../menu-item/menu-item.component.js';
import { SubmenuTriggerItem } from '../submenu-trigger-item/submenu-trigger-item.component.js';

type MenuListProps<T extends object> = Partial<Pick<AriaMenuProps<T>, 'children'>> &
  Omit<AriaMenuProps<T>, 'children'> & {
    rootMenuState?: RootMenuTriggerState;
  };

export const MenuList = forwardRef(function MenuList<T extends object>(
  props: MenuListProps<T>,
  forwardedRef: React.ForwardedRef<HTMLUListElement>,
) {
  const { rootMenuState, ...menuProps } = props;
  const state = useTreeState(menuProps);

  const internalRef = useRef<HTMLUListElement>(null);
  const ref = (forwardedRef ?? internalRef) as React.RefObject<HTMLUListElement>;
  const { menuProps: ariaMenuProps } = useMenu(menuProps, state, ref);

  return (
    <ul {...ariaMenuProps} ref={ref} className="flex flex-col gap-1">
      {[...state.collection].map(item => {
        if (!rootMenuState) return <MenuItem key={item.key} item={item} state={state} />;

        const submenuType = (item.props as Record<string, unknown>)?.['data-submenu-type'];
        if (submenuType === 'dialog')
          return (
            <DialogSubmenuTriggerItem
              key={item.key}
              item={item}
              state={state}
              rootMenuState={rootMenuState}
              parentMenuRef={ref}
            />
          );
        if (item.hasChildNodes)
          return (
            <SubmenuTriggerItem
              key={item.key}
              item={item}
              state={state}
              rootMenuState={rootMenuState}
              parentMenuRef={ref}
            />
          );

        return <MenuItem key={item.key} item={item} state={state} />;
      })}
    </ul>
  );
}) as <T extends object>(props: MenuListProps<T> & { ref?: React.Ref<HTMLUListElement> }) => React.ReactElement;
