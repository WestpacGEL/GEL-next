import { flexRender, Header } from '@tanstack/react-table';
import { ReactElement, useRef } from 'react';
import { Key, useButton, useMenuTrigger } from 'react-aria';
import { Item, Section, useMenuTriggerState } from 'react-stately';

import { Button } from '../../../button/index.js';
import { MoreVertIcon } from '../../../icon/index.js';
import { Input } from '../../../input/input.component.js';

import { styles as advancedTableMenuStyles } from './advanced-table-menu.styles.js';
import { AdvancedTableMenuProps } from './advanced-table-menu.types.js';
import { MenuList } from './components/menu-list/menu-list.component.js';
import { MenuPopover } from './components/menu-popover/menu-popover.component.js';
import { PinItemContent } from './components/pin-item-content/pin-item-content.component.js';

function handlePinAction<T>(header: Header<T, unknown>, direction: 'left' | 'right') {
  if (header.column.getIsPinned() === direction) {
    header.column.pin(false);
  } else {
    header.column.pin(direction);
  }
}

function buildActionItems<T>(
  header: Header<T, unknown>,
  styles: ReturnType<typeof advancedTableMenuStyles>,
): ReactElement[] {
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
        <span className={styles.groupHeaderReset()}>
          {flexRender(header.column.columnDef.header, header.getContext())}
        </span>
      </Item>,
    );
  }

  return items;
}

export function AdvancedTableMenu<T>({ onInputChange, filterVal, header, ...props }: AdvancedTableMenuProps<T>) {
  const state = useMenuTriggerState(props);

  const btnRef = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<object>({}, state, btnRef);
  const { buttonProps } = useButton(menuTriggerProps, btnRef);
  const styles = advancedTableMenuStyles();

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

  const actionItems = buildActionItems(header, styles);

  return (
    <>
      <Button
        {...buttonProps}
        look="unstyled"
        size="medium"
        iconBefore={() => <MoreVertIcon />}
        className={styles.triggerButton()}
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
