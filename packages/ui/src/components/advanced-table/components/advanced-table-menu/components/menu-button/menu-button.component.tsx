import { useRef } from 'react';
import { AriaMenuProps, useButton, useMenuTrigger } from 'react-aria';
import { Item, MenuTriggerProps, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../../../button/index.js';
import { MoreVertIcon } from '../../../../../icon/index.js';
import { Input } from '../../../../../input/input.component.js';
import { MenuList } from '../menu-list/menu-list.component.js';
import { MenuPopover } from '../menu-popover/menu-popover.component.js';

export function MenuButton<T extends object>({
  onInputChange,
  filterVal,
  ...props
}: MenuTriggerProps & { filterVal?: string; onInputChange: (val: string) => void } & Omit<
    AriaMenuProps<T>,
    'children'
  >) {
  const state = useMenuTriggerState(props);

  const btnRef = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, btnRef);
  const { buttonProps } = useButton(menuTriggerProps, btnRef);

  return (
    <>
      <Button {...buttonProps} look="unstyled" size="medium" iconBefore={MoreVertIcon} className="h-fit" ref={btnRef} />
      {state.isOpen && (
        <MenuPopover state={state} triggerRef={btnRef} placement="bottom start">
          <div>
            <Input
              placeholder="filter"
              value={filterVal ?? ''}
              onChange={val => onInputChange(val.currentTarget.value)}
            />
          </div>
          <MenuList {...props} {...menuProps}>
            <Item key="note">NOTE: Below items don't do anything, just example</Item>
            <Item key="sort-asc">Sort Ascending</Item>
            <Item key="sort-desc">Sort Descending</Item>
            <Item key="group">Group Column</Item>
            <Item key="pin-left">Pin Left</Item>
            <Item key="pin-right">Pin Right</Item>
            <Item key="reset">Reset Columns</Item>
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
