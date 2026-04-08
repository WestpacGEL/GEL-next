import { flexRender, Header } from '@tanstack/react-table';
import { useRef } from 'react';
import { AriaMenuProps, Key, useButton, useMenuTrigger } from 'react-aria';
import { Item, MenuTriggerProps, Section, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { MoreVertIcon, PinIcon, UnpinIcon } from '../../../icon/index.js';
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

  const handleAction = (key: Key) => {
    switch (key) {
      case 'pin-left':
        if (header.column.getIsPinned() === 'left') {
          header.column.pin(false);
        } else {
          header.column.pin('left');
        }
        break;
      case 'pin-right':
        if (header.column.getIsPinned() === 'right') {
          header.column.pin(false);
        } else {
          header.column.pin('right');
        }
        break;
      case 'group':
        header.column.toggleGrouping();
        break;
      default:
        break;
    }
  };

  const PinItem = ({ direction }: { direction: 'left' | 'right' }) => (
    <div className="flex gap-2">
      {header.column.getIsPinned() === direction ? (
        <UnpinIcon size="small" look="outlined" />
      ) : (
        <PinIcon size="small" look="outlined" />
      )}
      {header.column.getIsPinned() === direction ? `Unpin ${direction}` : `Pin ${direction}`}
    </div>
  );

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
          <MenuList {...props} {...menuProps} onAction={handleAction}>
            {header.column.getCanGlobalFilter() || header.column.getCanFilter() ? (
              <Section key="filter-section" title="Filter by:">
                <Item key="filter">
                  <Input value={filterVal ?? ''} onChange={val => onInputChange(val.currentTarget.value)} />
                </Item>
              </Section>
            ) : null}
            {header.column.getCanPin() || header.column.getCanGroup() ? (
              <Section key="actions-section" title="Actions">
                {header.column.getCanPin() ? (
                  <>
                    <Item key="pin-left">
                      <PinItem direction="left" />
                    </Item>
                    <Item key="pin-right">
                      <PinItem direction="right" />
                    </Item>
                  </>
                ) : null}
                {header.column.getCanGroup() ? (
                  <Item key="group">
                    {header.column.getIsGrouped() ? `Ungroup` : `Group`} by{' '}
                    {/* need to overwrite the styles than get passed from the header when using flexRender */}
                    <span className="**:inline **:[all:unset]">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </span>
                  </Item>
                ) : null}
              </Section>
            ) : null}
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
