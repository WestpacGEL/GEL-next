import { useRef } from 'react';
import { useDialog, useMenuItem, useSubmenuTrigger } from 'react-aria';
import { Node, RootMenuTriggerState, TreeState, useSubmenuTriggerState } from 'react-stately';

import { ArrowRightIcon } from '../../../../../icon/index.js';
import { MenuPopover } from '../menu-popover/menu-popover.component.js';

export function DialogSubmenuTriggerItem<T extends object>({
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
  const submenuRef = useRef<HTMLDivElement>(null);

  const submenuTriggerState = useSubmenuTriggerState({ triggerKey: item.key }, rootMenuState);

  const { submenuTriggerProps, submenuProps, popoverProps } = useSubmenuTrigger<T>(
    {
      type: 'dialog',
      parentMenuRef,
      submenuRef,
    },
    submenuTriggerState,
    triggerRef,
  );

  const { menuItemProps } = useMenuItem({ key: item.key, ...submenuTriggerProps }, state, triggerRef);

  const { dialogProps } = useDialog({ ...submenuProps, role: 'dialog' }, submenuRef);

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
        <MenuPopover
          state={submenuTriggerState}
          triggerRef={triggerRef}
          placement="end top"
          {...popoverProps}
          style={{ width: parentMenuRef.current?.offsetParent?.getBoundingClientRect().width }}
        >
          <div {...dialogProps} ref={submenuRef} className="p-2" onKeyDown={e => e.stopPropagation()}>
            {(item.props as { children: React.ReactNode }).children}
          </div>
        </MenuPopover>
      )}
    </>
  );
}
