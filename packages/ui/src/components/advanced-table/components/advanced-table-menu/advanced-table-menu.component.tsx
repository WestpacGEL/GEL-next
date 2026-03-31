import { flexRender, Header } from '@tanstack/react-table';
import { useRef } from 'react';
import { AriaMenuProps, useButton, useMenuTrigger } from 'react-aria';
import { Item, MenuTriggerProps, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { MoreVertIcon } from '../../../icon/index.js';
import { Input } from '../../../input/input.component.js';

import { MenuList } from './components/menu-list/menu-list.component.js';
import { MenuPopover } from './components/menu-popover/menu-popover.component.js';

export function AdvancedTableMenu<T>({
  onInputChange,
  filterVal,
  header,
  ...props
}: MenuTriggerProps & { filterVal?: string; header: Header<T, unknown>; onInputChange: (val: string) => void } & Omit<
    AriaMenuProps<object>,
    'children'
  >) {
  const state = useMenuTriggerState(props);

  const btnRef = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<object>({}, state, btnRef);
  const { buttonProps } = useButton(menuTriggerProps, btnRef);

  return (
    <>
      <Button
        {...buttonProps}
        look="unstyled"
        size="medium"
        iconBefore={() => <MoreVertIcon />}
        className="h-fit"
        ref={btnRef}
      />
      {state.isOpen && (
        <MenuPopover state={state} triggerRef={btnRef} placement="bottom start">
          <MenuList {...props} {...menuProps} rootMenuState={state}>
            <Item key="sort-asc">Group by {flexRender(header.column.columnDef.header, header.getContext())}</Item>
            {/* <Item key="sort-desc">Sort Descending</Item>
            <Item key="group">Group Column</Item> */}
            <Item key="pin" title="Pin Column">
              <Item key="pin-left">Pin Left</Item>
              <Item key="pin-right">Pin Right</Item>
            </Item>
            <Item key="filter" title="Filter" textValue="Filter" data-submenu-type="dialog">
              <Input
                placeholder="filter"
                value={filterVal ?? ''}
                onChange={val => onInputChange(val.currentTarget.value)}
              />
            </Item>
            <Item key="reset">Reset Columns</Item>
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
