import { CollectionChildren } from '@react-types/shared';
import { useRef } from 'react';
import { useMenuItem, useSubmenuTrigger } from 'react-aria';
import { Node, RootMenuTriggerState, TreeState, useSubmenuTriggerState } from 'react-stately';

import { ArrowRightIcon } from '../../../../../icon/index.js';
import { MenuList } from '../menu-list/menu-list.component.js';
import { MenuPopover } from '../menu-popover/menu-popover.component.js';

export function SubmenuTriggerItem<T extends object>({
  item,
  state,
  rootMenuState,
  parentMenuRef,
}: {
  item: Node<T>;
  state: TreeState<T>;
  rootMenuState: RootMenuTriggerState;
  parentMenuRef: React.RefObject<HTMLUListElement | null>;
}) {
  const triggerRef = useRef<HTMLLIElement>(null);
  const submenuRef = useRef<HTMLUListElement>(null);

  const submenuTriggerState = useSubmenuTriggerState({ triggerKey: item.key }, rootMenuState);

  const { submenuTriggerProps, submenuProps, popoverProps } = useSubmenuTrigger<T>(
    {
      parentMenuRef,
      submenuRef,
    },
    submenuTriggerState,
    triggerRef,
  );

  const { menuItemProps } = useMenuItem({ key: item.key, ...submenuTriggerProps }, state, triggerRef);

  return (
    <>
      <li
        {...menuItemProps}
        ref={triggerRef}
        className="flex items-center justify-between p-2 hover:bg-background-hero hover:text-text-mono"
      >
        {item.rendered}
        <ArrowRightIcon size="small" color="primary" aria-hidden="true" />
      </li>
      {submenuTriggerState.isOpen && (
        <MenuPopover state={submenuTriggerState} triggerRef={triggerRef} placement="end top" {...popoverProps}>
          <MenuList {...submenuProps} rootMenuState={rootMenuState} ref={submenuRef}>
            {(item.props as { children: CollectionChildren<T> }).children}
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
