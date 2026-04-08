import { flexRender, Header } from '@tanstack/react-table';
import { ReactElement, useRef } from 'react';
import { AriaMenuProps, Key, useButton, useMenuTrigger } from 'react-aria';
import { Item, MenuTriggerProps, Section, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { MoreVertIcon, PinIcon, UnpinIcon } from '../../../icon/index.js';
import { Input } from '../../../input/input.component.js';

import { MenuList } from './components/menu-list/menu-list.component.js';
import { MenuPopover } from './components/menu-popover/menu-popover.component.js';

function PinItemContent({ isPinned, direction }: { isPinned: boolean; direction: 'left' | 'right' }) {
  const Icon = isPinned ? UnpinIcon : PinIcon;
  const label = isPinned ? `Unpin ${direction}` : `Pin ${direction}`;
  return (
    <div className="flex gap-2">
      <Icon size="small" look="outlined" />
      {label}
    </div>
  );
}

function handlePinAction<T>(header: Header<T, unknown>, direction: 'left' | 'right') {
  if (header.column.getIsPinned() === direction) {
    header.column.pin(false);
  } else {
    header.column.pin(direction);
  }
}

function buildActionItems<T>(header: Header<T, unknown>): ReactElement[] {
  const items: ReactElement[] = [];

  if (header.column.getCanPin()) {
    items.push(
      <Item key="pin-left">
        <PinItemContent isPinned={header.column.getIsPinned() === 'left'} direction="left" />
      </Item>,
      <Item key="pin-right">
        <PinItemContent isPinned={header.column.getIsPinned() === 'right'} direction="right" />
      </Item>,
    );
  }

  if (header.column.getCanGroup()) {
    items.push(
      <Item key="group">
        {header.column.getIsGrouped() ? `Ungroup` : `Group`} by{' '}
        {/* need to overwrite the styles than get passed from the header when using flexRender */}
        <span className="**:inline **:[all:unset]">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </span>
      </Item>,
    );
  }

  return items;
}

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

  const canFilter = header.column.getCanGlobalFilter() || header.column.getCanFilter();
  const hasActions = header.column.getCanPin() || header.column.getCanGroup();

  const handleAction = (key: Key) => {
    switch (key) {
      case 'pin-left':
        handlePinAction(header, 'left');
        break;
      case 'pin-right':
        handlePinAction(header, 'right');
        break;
      case 'group':
        header.column.toggleGrouping();
        break;
      default:
        break;
    }
  };

  const actionItems = buildActionItems(header);

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
            {canFilter ? (
              <Section key="filter-section" title="Filter by:">
                <Item key="filter">
                  <Input value={filterVal ?? ''} onChange={val => onInputChange(val.currentTarget.value)} />
                </Item>
              </Section>
            ) : null}
            {hasActions && canFilter ? (
              <Section key="actions-section" title="Actions">
                {actionItems}
              </Section>
            ) : (
              <>{actionItems}</>
            )}
          </MenuList>
        </MenuPopover>
      )}
    </>
  );
}
